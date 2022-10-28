import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

import { CarrinhoProvider } from "../contexts/carrinho";

import "../styles/global.scss";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CarrinhoProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </CarrinhoProvider>

      <ToastContainer />
    </>
  );
}

export default MyApp;
