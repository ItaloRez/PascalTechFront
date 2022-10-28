import api from "./api";

export const getInformacoes = async () => {
  const response = await api.get("/informacao");
  return response.data;
};

export const getInformacao = (id) => {
  return api.get(`/informacao/${id}`);
};

export const createInformacao = (informacao) => {
  return api.post("/informacao", informacao);
};

export const updateInformacao = (id, informacao) => {
  return api.put(`/informacao/${id}`, informacao);
};
