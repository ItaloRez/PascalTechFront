import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useProdutos } from "src/contexts/produtosContext";
import { useShopInfos } from "src/contexts/shopInfosContext";
import { Card } from "../components/Card";
import { ProductList } from "../components/ProductList";

import { getInformacoes } from "../services/informacoes";
import { getProdutos } from "../services/produtos";

import * as ga from "../lib/ga";

import styles from "./home.module.scss";
import ReactGA from "react-ga";

export default function Home() {
  const { produtos } = useProdutos();
  const { shopInfos } = useShopInfos();

  const [informacoes, setInformacoes] = useState({
    slogan: "Site bom de comprar",
    descricao: "Venha comprar aq!",
    callToAction: "Compre agora",
    email: "email@loja.com",
    telefone: "(35) 1901-0909",
    endereco: "rua josé da silva",
    numero: "7",
    bairro: "centro",
    cidade: "Borda da Mata",
    estado: "MG",
  });

  useEffect(() => {
    if (shopInfos) {
      setInformacoes(shopInfos);
    }
  }, [shopInfos]);

  //const [produtos, setProdutos] = useState(props.produtos || []);

  // useEffect(() => {
  //   getInformacoesData();
  //   getProdutosData();
  // }, []);

  // const getInformacoesData = async () => {
  //   try {
  //     const response = await getInformacoes();
  //     if (response) setInformacoes(response[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getProdutosData = async () => {
  //   try {
  //     const response = await getProdutos();
  //     if (response) setProdutos(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <Head>
        <title>Home | Pascal Tech</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.contentContainer}>
          <section className={styles.hero}>
            <h1 dangerouslySetInnerHTML={{ __html: informacoes.slogan }}>
              {/* Está em busca de um <span>software</span> para sua empresa? */}
            </h1>
            <p dangerouslySetInnerHTML={{ __html: informacoes.descricao }}>
              {/* Veja nossos produtos ou entre em contato para resolvermos os seus
              problemas de forma inteligente! */}
            </p>
            <button
              onClick={() => {
                ga.event({
                  action: "click",
                  params: {
                    event_category: "Home",
                  },
                });
                window.location.href = "#destaques";
              }}
            >
              {/* Encontre Agora */}
              {informacoes.callToAction}
            </button>
          </section>
          <Image
            src="/images/softwareEngineer.png"
            alt="Engenheiro de software"
            width={512}
            height={512}
          />
        </main>
      </div>

      <div id="destaques">
        <ProductList category="Destaques" products={produtos} />
        {/* <ProductList category="Produtos" />
        <ProductList category="Serviços" /> */}
      </div>
    </>
  );
}
