import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

import { CarrinhoProvider } from "../contexts/carrinho";
import Script from "next/script";

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

      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
    </>
  );
}

export default MyApp;
