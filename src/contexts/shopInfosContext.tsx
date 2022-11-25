import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { supabase } from "../services/supabase";
import { User } from "@supabase/supabase-js";

interface ShopInfo {
  id: string;
  slogan: string;
  callToAction: string;
  descricao: string;
  email: string;
  telefone: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  facebook: string;
  linkedin: string;
  instagram: string;
}

interface ShopInfosContextData {
  shopInfos: ShopInfo;
  setShopInfos: (produtos: ShopInfo) => void;
  updateShopInfo: (produto: Omit<ShopInfo, "id">) => Promise<void>;
}

interface ShopInfosProviderProps {
  children: ReactNode;
}

export const ShopInfosContext = createContext({} as ShopInfosContextData);

export const ShopInfosProvider = ({ children }: ShopInfosProviderProps) => {
  const [shopInfos, setShopInfos] = useState<ShopInfo | null>(null);

  const getShopInfos = async () => {
    let { data: response, error } = await supabase
      .from("shop_info")
      .select("*");
    if (response) {
      setShopInfos(response[0] as ShopInfo);
    }
  };

  useEffect(() => {
    getShopInfos();
  }, []);

  const updateShopInfo = async (shop_info: ShopInfo) => {
    let { data, error } = await supabase
      .from("shop_info")
      .update(shop_info)
      .eq("id", shopInfos?.id);

    if (error) {
      return alert(error.message);
    }

    getShopInfos();
  };

  return (
    <ShopInfosContext.Provider
      value={{
        shopInfos,
        setShopInfos,
        updateShopInfo,
      }}
    >
      {children}
    </ShopInfosContext.Provider>
  );
};

export const useShopInfos = () => {
  return useContext(ShopInfosContext);
};
