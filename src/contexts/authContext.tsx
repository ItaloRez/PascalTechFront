import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { supabase } from "../services/supabase";
import { User } from "@supabase/supabase-js";

interface UserData extends User {
  perfil?: string;
}

interface AuthContextData {
  user: UserData;
  setUser: (user: UserData) => void;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleSignUp: (
    email: string,
    password: string,
    admin?: boolean
  ) => Promise<void>;
  handleLogout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);

  const verifyIsAdmin = async (id) => {
    let { data: response, error } = await supabase
      .from("user_roles")
      .select("*")
      .eq("user", id)
      .eq("role", "administrator");

    if (response && response.length > 0) {
      return true;
    }

    return false;
  };

  const initUser = async () => {
    let loggedUser = await supabase.auth.getUser();
    let perfil = "user";
    if (!loggedUser.error) {
      let isAdmin = await verifyIsAdmin(loggedUser.data.user.id);
      if (isAdmin) {
        perfil = "administrator";
      }
      setUser({ ...loggedUser.data.user, perfil });
    }
  };

  const handleLogin = async (email: string, password: string) => {
    let response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    let perfil = "user";

    if (response.error) {
      alert(response.error.message);
    } else {
      let isAdmin = await verifyIsAdmin(response.data.user.id);
      if (isAdmin) {
        perfil = "administrator";
      }
      setUser({ ...response.data.user, perfil });
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    admin?: boolean
  ) => {
    let response = await supabase.auth.signUp({
      email,
      password,
    });

    if (admin) {
      let res = await supabase
        .from("user_roles")
        .insert([{ user: response.data.user.id, role: "administrator" }]);

      if (res.error) {
        alert(res.error.message);
      }
    }

    if (response.error) {
      alert(response.error.message);
    } else {
      alert("Usuário cadastrado com sucesso!");
    }
  };

  const handleLogout = async () => {
    let response = await supabase.auth.signOut();
    if (response.error) {
      alert(response.error.message);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    initUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        handleSignUp,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
