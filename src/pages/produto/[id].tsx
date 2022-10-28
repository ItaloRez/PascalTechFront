import Head from "next/head";
import { BsChevronRight } from "react-icons/bs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProduto } from "../../services/produtos";
import Link from "next/link";
import { useCarrinhoContext } from "../../contexts/carrinho";
import { toast } from "react-toastify";

const Product = () => {
  const router = useRouter();

  const { adicionarProduto } = useCarrinhoContext();

  const [produto, setProduto] = useState(null);

  useEffect(() => {
    getDataProduto();
  }, []);

  const getDataProduto = async () => {
    try {
      const response = await getProduto(router.query.id);
      setProduto(response.data);
    } catch (error) {
      console.log(error);
    }
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
                    adicionarProduto(produto);
                    toast.success("Produto adicionado ao carrinho!");
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
            <h2>Avaliações sobre o produto</h2>
            <div className={styles.comments}>
              {produto?.avaliacoes.map((avaliacao: any) => (
                <div className={styles.comment}>
                  <div className={styles.startBox}>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiOutlineStar />
                    <span>4 estrelas</span>
                  </div>
                  <p>{avaliacao.comentario}</p>
                </div>
              ))}
              {/* <div className={styles.comment}>
                <div className={styles.headerBox}>
                  <span>Bruno</span>
                  <AiFillStar />
                  <span>(5 Estrelas)</span>
                </div>
                <span>
                  Software execelente, utilizo todos os dias algum deles para o
                  trabalho!
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
