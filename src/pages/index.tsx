import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { ProductList } from "../components/ProductList";

import { getInformacoes } from "../services/informacoes";
import { getProdutos } from "../services/produtos";

import styles from "./home.module.scss";

export default function Home() {
  const [informacoes, setInformacoes] = useState({
    slogan: "Site bom de comprar",
    descricao: "Venha comprar aq!",
    callToAction: "Compre agora",
    email: "email@loja.com",
    telefone: "(35) 1901-0909",
    endereco: {
      cep: "37564-000",
      logradouro: "rua josé da silva",
      numero: "7",
      complemento: "1",
      bairro: "centro",
      cidade: "Borda da Mata",
      estado: "MG",
    },
    redesSociais: {
      facebook: "email@loja.com",
      instagram: "@loja",
      twitter: "@loja",
      youtube: "loja videos",
    },
  });

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    getInformacoesData();
    getProdutosData();
  }, []);

  const getInformacoesData = async () => {
    try {
      const response = await getInformacoes();
      if (response) setInformacoes(response[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getProdutosData = async () => {
    try {
      const response = await getProdutos();
      if (response) setProdutos(response);
    } catch (error) {
      console.log(error);
    }
  };

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
