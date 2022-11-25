import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import * as ga from "src/lib/ga";

export const Card = ({ id, name, price, image, description }) => {
  const router = useRouter();
  return (
    <div
      className={styles.container}
      onClick={() => {
        router.push(`/produto/${id}`);
        ga.event({
          action: "click",
          params: {
            event_category: "product",
            event_label: name,
            value: price,
          },
        });
      }}
    >
      <Image src={image} height={180} width={264} alt="Foto do produto" />

      <div className={styles.content}>
        <h3>{name}</h3>

        <p>{description}</p>

        <div className={styles.price}>
          <p className={styles.discount}>
            {(+price - 30).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p>
            {(+price).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
