import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  id?: string;
  username?: string;
  email?: string;
}

interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>({});

  const logOut = () => {
    localStorage.removeItem("user");
    setUser({});
  };

  useEffect(() => {
    const currentUserData = localStorage.getItem("user");
    if (currentUserData) {
      setUser(JSON.parse(currentUserData));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ logOut, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType | null => {
  return useContext(AuthContext);
};
