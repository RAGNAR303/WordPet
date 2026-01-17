import { type ReactNode, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";
interface PraviteProps {
  children: ReactNode;
}

export function Private({ children }: PraviteProps): any {
  const { loadingAuth, signed } = useContext(AuthContext);

  if (loadingAuth) {
    return (
      <div
        className="rounded-full border-4 w-10 h-10 border-gray-300 
       border-t-orange-500 animate-spin"
      ></div>
    );
  }

  if (!signed) {
    return <Navigate to={"/entrar"} />;
  }

  return children;
}
