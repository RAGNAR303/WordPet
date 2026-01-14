import { createContext, useState, type ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}
type AuthContextData = {
  signed: boolean;
};

interface UserProviderProps{
    
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ signed }}>{children}</AuthContext.Provider>
  );
}
