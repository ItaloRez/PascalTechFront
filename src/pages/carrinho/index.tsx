import { useRouter } from "next/router";
import { BsChevronRight } from "react-icons/bs";
import { useCarrinhoContext } from "../../contexts/carrinho";

import styles from "./styles.module.scss";

const Finalizar = () => {
  const router = useRouter();

  const { carrinho } = useCarrinhoContext();

  const total = carrinho.reduce((acc: number, item: any) => {
    return acc + item.preco * item.quantidade;
  }, 0);

  return (
    <>
      <div className={styles.background}>
        <div className={styles.container}>
          {/* <div className={styles.breadcrumbs}>
            <span>Destaques</span>
            <BsChevronRight />
            <span>Microsoft Office 365</span>
            <BsChevronRight />
            <span>Finalizar Compra</span>
          </div> */}

          <div className={styles.buy}>
            <h2>Dados da Compra</h2>

            <div className={styles.buyInfos}>
              {/* <div className={styles.buyInfo}>
                <div>
                  <h3>Produto</h3>
                  <span>1xUnidade</span>
                </div>
                <div>
                  <h3>Preço</h3>
                  <span>R$ 27,42 / mês</span>
                </div>
              </div> */}

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

            <button>Finalizar Compra</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Finalizar;
