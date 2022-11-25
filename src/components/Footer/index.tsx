import styles from "./styles.module.scss";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { getInformacoes } from "../../services/informacoes";
import { useShopInfos } from "src/contexts/shopInfosContext";

export const Footer = () => {
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
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  });

  useEffect(() => {
    if (shopInfos) {
      setInformacoes(shopInfos);
    }
  }, [shopInfos]);

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.footerInfo}>
          {/* <div className={styles.category}>
            <h3>Categorias</h3>
            <ul>
              <li>Produtos</li>
              <li>Serviços</li>
              <li>Contato</li>
            </ul>
          </div> */}

          <div className={styles.info}>
            <h3>Contato</h3>
            <p>
              <strong>Telefone:</strong> {informacoes?.telefone}
            </p>

            <p>
              <strong>E-mail: </strong>
              <a href="mailto:" target="_blank" rel="noreferrer">
                {informacoes?.email}
              </a>
            </p>

            <p>
              <strong>Endereço:</strong> {informacoes?.endereco},{" "}
              {informacoes?.numero} - {informacoes?.bairro} -{" "}
              {informacoes?.cidade} - {informacoes?.estado}
            </p>
          </div>

          <div className={styles.socials}>
            <h3>Redes Sociais</h3>
            <ul>
              <li>
                <a
                  href={informacoes?.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillFacebook />
                </a>
              </li>
              <li>
                <a
                  href={informacoes?.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillInstagram />
                </a>
              </li>
              <li>
                <a
                  href={informacoes?.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillLinkedin />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footerRights}>
        <span>Todos os direitos reservados Pascal Tech ®</span>
      </div>
    </footer>
  );
};
