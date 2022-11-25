import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

import { CarrinhoProvider } from "../contexts/carrinho";
import Script from "next/script";

import "../styles/global.scss";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "src/contexts/authContext";
import { ProdutosProvider } from "src/contexts/produtosContext";
import { ShopInfosProvider } from "src/contexts/shopInfosContext";
import ReactGA from "react-ga";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as ga from "../lib/ga";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <AuthProvider>
        <ShopInfosProvider>
          <ProdutosProvider>
            <CarrinhoProvider>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </CarrinhoProvider>
          </ProdutosProvider>
        </ShopInfosProvider>
      </AuthProvider>

      <ToastContainer />
    </>
  );
}

export default MyApp;
