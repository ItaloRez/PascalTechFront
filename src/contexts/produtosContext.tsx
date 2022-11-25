import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { supabase } from "../services/supabase";
import { User } from "@supabase/supabase-js";

interface Avaliacao {
  comentario: string;
  estrelas: number;
}

interface Produto {
  id: string;
  created_at: string;
  nome: string;
  preco: number;
  quantidade: number;
  categoria: string;
  descricao: string;
  imagens: string[];
  avaliacoes?: Avaliacao[];
}

interface ProdutosContextData {
  produtos: Produto[];
  setProdutos: (produtos: Produto[]) => void;
  createProduto: (produto: Omit<Produto, "id" | "created_at">) => Promise<void>;
  getProduto: (id: string) => Promise<Produto>;
  addAvaliacao: (id: string, avaliacoes: Avaliacao[]) => Promise<void>;
}

interface ProdutosProviderProps {
  children: ReactNode;
}

export const ProdutosContext = createContext({} as ProdutosContextData);

export const ProdutosProvider = ({ children }: ProdutosProviderProps) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const getProdutos = async () => {
    let { data: response, error } = await supabase.from("produtos").select("*");
    if (response) {
      setProdutos(response);
    }
  };

  useEffect(() => {
    getProdutos();
  }, []);

  const createProduto = async (produto: Produto) => {
    let { data, error } = await supabase.from("produtos").insert([produto]);

    if (error) {
      return alert(error.message);
    }

    getProdutos();
  };

  const getProduto = async (id: string) => {
    let { data, error } = await supabase
      .from("produtos")
      .select("*")
      .eq("id", id);

    if (error) {
      return alert(error.message);
    }

    return data[0];
  };

  const addAvaliacao = async (id: string, avaliacoes: Avaliacao[]) => {
    let { data, error } = await supabase
      .from("produtos")
      .update({ avaliacoes })
      .eq("id", id);

    if (error) {
      return alert(error.message);
    }

    getProdutos();
  };

  return (
    <ProdutosContext.Provider
      value={{
        produtos,
        setProdutos,
        createProduto,
        getProduto,
        addAvaliacao,
      }}
    >
      {children}
    </ProdutosContext.Provider>
  );
};

export const useProdutos = () => {
  return useContext(ProdutosContext);
};
