import api from "./api";

export const getProdutos = async () => {
  const response = await api.get("/produto");
  return response.data;
};

export const getProduto = (id) => {
  return api.get(`/produto/${id}`);
};

export const createProduto = (produto) => {
  return api.post("/produto", produto);
};

export const updateProduto = (id, produto) => {
  return api.put(`/produto/${id}`, produto);
};

export const deleteProduto = (id) => {
  return api.delete(`/produto/${id}`);
};
