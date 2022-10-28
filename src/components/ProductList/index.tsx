import { Card } from "../Card";
import styles from "./styles.module.scss";

interface ProductListProps {
  category: string;
  products: any[];
}

export const ProductList = ({ category, products }: ProductListProps) => {
  return (
    <>
      <div className={styles.container}>
        <h2>{category}</h2>

        <div className={styles.cards}>
          {products.map((product) => (
            <Card
              key={product._id}
              id={product._id}
              name={product.nome}
              price={product.preco}
              image={product.imagens[0]}
              description={product.descricao}
            />
          ))}
        </div>
      </div>
    </>
  );
};
