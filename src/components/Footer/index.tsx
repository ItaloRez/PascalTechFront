import styles from "./styles.module.scss";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { getInformacoes } from "../../services/informacoes";

export const Footer = () => {
  const [informacoes, setInformacoes] = useState(null);

  useEffect(() => {
    getInformacoesData();
  }, []);

  const getInformacoesData = async () => {
    try {
      const response = await getInformacoes();
      if (response) setInformacoes(response[0]);
    } catch (error) {
      console.log(error);
    }
  };

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
              <strong>Endereço:</strong> Endereço:{" "}
              {informacoes?.endereco.logradouro}, {informacoes?.endereco.numero}{" "}
              - {informacoes?.endereco.bairro} - {informacoes?.endereco.cidade}{" "}
              - {informacoes?.endereco.estado}
            </p>
          </div>

          <div className={styles.socials}>
            <h3>Redes Sociais</h3>
            <ul>
              <li>
                <a
                  href={informacoes?.redesSociais.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillFacebook />
                </a>
              </li>
              <li>
                <a
                  href={informacoes?.redesSociais.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillInstagram />
                </a>
              </li>
              <li>
                <a
                  href={informacoes?.redesSociais.twitter}
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
