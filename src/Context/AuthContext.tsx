import { createContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged, signOut } from "firebase/auth";
import toast from "react-hot-toast";
interface AuthProviderProps {
  children: ReactNode;
}
type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
  handlreInfoUser: ({ uid, name, email }: UserProps) => void;
  user: UserProps | null;
  handleLogout: () => void;
};

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email,
        });
        setLoadingAuth(false);
      } else {
        setUser(null);
        setLoadingAuth(false);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  function handlreInfoUser({ uid, name, email }: UserProps) {
    setUser({
      uid,
      name,
      email,
    });
  }

  async function handleLogout() {
    toast.success("USUARIO DESLOGADO");
    await signOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loadingAuth,
        handlreInfoUser,
        user,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
