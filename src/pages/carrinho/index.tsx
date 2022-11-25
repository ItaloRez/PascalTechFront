import Head from "next/head";
import { useRouter } from "next/router";
import { BsChevronRight } from "react-icons/bs";
import { useCarrinhoContext } from "../../contexts/carrinho";

import styles from "./styles.module.scss";

import * as ga from "../../lib/ga";
import { useAuth } from "src/contexts/authContext";
import { ModalLogin } from "src/components/ModalLogin";
import { useState } from "react";
import { supabase } from "../../services/supabase";
import { toast } from "react-toastify";

const Finalizar = () => {
  const router = useRouter();

  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);

  const { carrinho } = useCarrinhoContext();

  const total = carrinho.reduce((acc: number, item: any) => {
    return acc + item.preco * item.quantidade;
  }, 0);

  const { user } = useAuth();

  const handleFinalizar = async () => {
    if (!user) {
      setIsModalLoginOpen(true);
      return;
    }

    const pedido = {
      usuario: user.id,
      preco: total,
    };

    const compra = await supabase.from("compras").insert(pedido).select("id");

    if (compra.error) {
      toast.error("Erro ao finalizar compra");
      return;
    }

    const itens = carrinho.map((item: any) => {
      return {
        compra: compra.data[0].id,
        produto: item.id,
        quantidade: item.quantidade,
        preco: item.preco,
      };
    });

    const itensCompra = await supabase.from("produtos_da_compra").insert(itens);

    if (itensCompra.error) {
      toast.error("Erro ao finalizar compra");
      return;
    }

    toast.success("Compra finalizada com sucesso");

    ga.event({
      action: "purchase",
      params: {
        currency: "BRL",
        transaction_id: compra.data[0].id,
        value: total,
        items: carrinho.map((item: any) => {
          return {
            item_id: item.id,
            item_name: item.nome,
            price: item.preco,
            quantity: item.quantidade,
          };
        }),
      },
    });

    router.push("/agradecimento");
  };

  return (
    <>
      <Head>
        <title>Finalizar Compra | Pascal Tech</title>
      </Head>
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.buy}>
            <h2>Dados da Compra</h2>

            <div className={styles.buyInfos}>
              {carrinho.map((produto: any) => (
                <div className={styles.buyInfo} key={produto.id}>
                  <div>
                    <h3>{produto.nome}</h3>
                    <span>{produto.quantidade}xUnidade</span>
                  </div>
                  <div>
                    <h3>Preço</h3>
                    <span>R$ {produto.preco * produto.quantidade}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className={styles.total}>
              Total: <span>R$ {total}</span>
            </p>

            <button
              onClick={() => {
                handleFinalizar();
              }}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>

      <ModalLogin
        open={isModalLoginOpen}
        handleClose={() => setIsModalLoginOpen(false)}
      />
    </>
  );
};

export default Finalizar;
