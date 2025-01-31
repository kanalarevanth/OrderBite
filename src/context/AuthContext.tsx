import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { localKeys } from "../utils/local-storage";
import { User } from "../types/type";

interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>({});
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const currentUserData = localStorage.getItem(localKeys.user);
    if (currentUserData) {
      setUser(JSON.parse(currentUserData));
    }
    const tokenData = localStorage.getItem(localKeys.token);
    if (tokenData) {
      setToken(tokenData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
