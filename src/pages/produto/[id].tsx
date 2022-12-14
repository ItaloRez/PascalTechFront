import Head from "next/head";
import { BsChevronRight } from "react-icons/bs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCarrinhoContext } from "../../contexts/carrinho";
import { toast } from "react-toastify";
import { Autocomplete, Button, Select, TextField } from "@mui/material";
import { useProdutos } from "src/contexts/produtosContext";
import Stack from "@mui/material/Stack";
import * as ga from "../../lib/ga";

const Product = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { adicionarProduto } = useCarrinhoContext();

  const [produto, setProduto] = useState(null);

  const { getProduto, addAvaliacao } = useProdutos();

  const [comentario, setComentario] = useState("");
  const [estrelas, setEstrelas] = useState(5);

  const initProduto = async () => {
    const produto = await getProduto(id);
    setProduto(produto);

    ga.event({
      action: "view_item",
      params: {
        currency: "BRL",
        value: produto.preco,
        items: [
          {
            item_id: produto.id,
            item_name: produto.nome,
            price: produto.preco,
          },
        ],
      },
    });
  };

  useEffect(() => {
    if (id) {
      initProduto();
    }
  }, [id]);

  // const getDataProduto = async () => {
  //   try {
  //     const response = await getProduto(router.query.id);
  //     setProduto(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleAdicionarAvaliacao = () => {
    let avaliacoes = produto.avaliacoes || [];

    avaliacoes.push({
      comentario,
      estrelas,
    });

    addAvaliacao(id, avaliacoes).then(() => {
      setComentario("");
      setEstrelas(5);
      initProduto();
      toast.success("Avaliação adicionada com sucesso!");
    });
  };

  return (
    <>
      <Head>
        <title>Produto | Pascal Tech</title>
      </Head>
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <Link href="/">
              <a>Destaques</a>
            </Link>
            <BsChevronRight />
            <span>Microsoft Office 365</span>
          </div>

          <div className={styles.product}>
            <div className={styles.photosContainer}>
              {produto?.imagens.map((foto: any, index: number) => (
                <img key={index} src={foto.replace("\n", "")} alt={foto} />
              ))}
              {/* <img src="/images/word.png" alt="Produto" />
              <img src="/images/powerpoint.png" alt="Produto" />
              <img src="/images/microsoft.png" alt="Produto" />
              <img src="/images/outlook.png" alt="Produto" />
              <img src="/images/excel.png" alt="Produto" /> */}
            </div>

            <div className={styles.infosContainer}>
              <div className={styles.startBox}>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <span>4 estrelas</span>
              </div>
              <h2>{produto?.nome}</h2>

              <p className={styles.description}>{produto?.descricao}</p>

              <span className={styles.anounce}>Por Apenas: </span>
              <div className={styles.price}>
                <p className={styles.discount}>
                  R$ {(produto?.preco * 1.3).toFixed(0)}
                </p>
                <p>R$ {produto?.preco}</p>
              </div>

              <button
                onClick={() => {
                  if (produto) {
                    console.log(produto);
                    adicionarProduto(produto);
                    toast.success("Produto adicionado ao carrinho!", {
                      position: "top-center",
                    });
                    ga.event({
                      action: "add_to_cart",
                      params: {
                        currency: "BRL",
                        value: produto.preco,
                        items: [
                          {
                            item_id: produto.id,
                            item_name: produto.nome,
                            price: produto.preco,
                            quantity: 1,
                          },
                        ],
                      },
                    });
                  } else {
                    toast.error("Erro ao adicionar produto ao carrinho!");
                  }
                }}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>

          <div className={styles.assessments}>
            <h2>Deixe sua avaliação</h2>
            <div className={styles.comments}>
              <Autocomplete
                id="combo-box-demo"
                options={["1", "2", "3", "4", "5"]}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Estrelas" />
                )}
                value={String(estrelas)}
                onChange={(event, value) => {
                  setEstrelas(Number(value));
                }}
              />
              <TextField
                id="outlined-multiline-static"
                label="Deixe sua avaliação"
                multiline
                rows={4}
                value={comentario}
                onChange={(event) => {
                  setComentario(event.target.value);
                }}
              />
              <Button variant="contained" onClick={handleAdicionarAvaliacao}>
                Enviar
              </Button>
            </div>
            <h2>Avaliações sobre o produto</h2>
            <div className={styles.comments}>
              {produto?.avaliacoes?.map((avaliacao: any) => (
                <div className={styles.comment}>
                  <Stack direction="row" gap={1} alignItems="center">
                    {Array.from({ length: avaliacao.estrelas }, (_, index) => (
                      <AiFillStar key={index} />
                    ))}
                    <span>{avaliacao.estrelas} estrelas</span>
                  </Stack>
                  <p>{avaliacao.comentario}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
