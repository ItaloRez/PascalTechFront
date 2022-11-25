import { createContext, useContext, useState } from "react";

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarProduto = (produto) => {
    carrinho.find((item) => item.id === produto.id)
      ? setCarrinho(
          carrinho.map((item) =>
            item.id === produto.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          )
        )
      : setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
  };

  const diminirQuantidade = (produto) => {
    setCarrinho(
      carrinho.map((item) =>
        item.id === produto.id && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    );
  };

  const removerProduto = (produto) => {
    setCarrinho(carrinho.filter((item) => item.id !== produto.id));
  };

  const total = carrinho.reduce((acc, item) => {
    return acc + item.preco * item.quantidade;
  }, 0);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarProduto,
        removerProduto,
        diminirQuantidade,
        total,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinhoContext = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error(
      "useCarrinhoContext deve ser usado dentro de um CarrinhoProvider"
    );
  }
  return context;
};
