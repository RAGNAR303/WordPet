import { useContext } from "react";
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export function TopBar() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <header
      className=" flex  items-center justify-between bg-orange-500 `bg-orange-500 text-white rounded-3xl px-6 py-2 font-bold 
        border-2 border-double"
    >
      <nav className="flex gap-2.5">
        <Link to={"/painel"} className="hover:text-green-600 duration-300">
          Painel
        </Link>
        <Link
          to={"/painel/novo-produto"}
          className="hover:text-green-600 duration-300"
        >
          Novo Produdo
        </Link>
      </nav>
      <button
        onClick={() => handleLogout()}
        className="text-2xl hover:bg-white/80 rounded-full p-1 duration-300"
      >
        <TbLogout className="hover:text-red-600 duration-300" />
      </button>
    </header>
  );
}
