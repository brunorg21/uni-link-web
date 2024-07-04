import { ReactNode, createContext, useContext, useState } from "react";

interface UserContextProps {
  user: {
    id: number;
    role: string;
  };
}

export const UserContext = createContext({} as UserContextProps);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user] = useState({
    id: 1,
    role: "STUDENT",
  });

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext);
}
