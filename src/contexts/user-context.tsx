import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../models/user";
import Cookies from "universal-cookie";
import axios from "axios";

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext({} as UserContextProps);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const cookies = new Cookies();

  useEffect(() => {
    const userAllowed = cookies.get("user-allowed");
    const token = cookies.get("access_token");

    if (userAllowed && token) {
      setUser(userAllowed);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      cookies.remove("user-allowed");
      cookies.remove("access_token");
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext);
}
