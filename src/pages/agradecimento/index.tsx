import Head from "next/head";
import { useRouter } from "next/router";
import { useCarrinhoContext } from "src/contexts/carrinho";
import styles from "./styles.module.scss";

const Agradecimento = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Agradecimento | Pascal Tech</title>
      </Head>
      <div className={styles.thankyouPage}>
        <div className={styles._header}>
          <h1>Obrigado pro comprar conosco!</h1>
        </div>
        <div className={styles._body}>
          <div className={styles._box}>
            <h2>
              <strong>Por favor cheque seu email</strong> para mais informações
              sobre seu pedido.
            </h2>
          </div>
        </div>
        <div className={styles._footer}>
          <a
            className={styles.btn}
            href=""
            onClick={(e) => {
              e.preventDefault();
              router.push("/");
            }}
          >
            Voltar para a loja
          </a>
        </div>
      </div>
    </>
  );
};

export default Agradecimento;
