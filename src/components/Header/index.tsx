import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { BiLogIn } from "react-icons/bi";
import { Logo } from "../Logo";
import { AuthContext } from "../../Context/AuthContext";
import { FaUser } from "react-icons/fa";
export function Header() {
  const { cartAmount } = useContext(CartContext);
  const { signed, loadingAuth: loadingUser } = useContext(AuthContext);
  return (
    <header className="w-full bg-linear-to-b from-green-700 to-green-900 rounded-b-2xl shadow-2xl fixed top-0">
      <nav className="mx-auto max-w-[80%] w-full flex justify-between items-center py-2 z-50">
        <Logo />
        <div className="flex items-center gap-5">
          <Link to={"/carrinho"}>
            <div className="relative  ">
              <MdOutlineShoppingCart className="text-3xl text-white" />

              {cartAmount > 0 && (
                <span
                  className="absolute flex items-center justify-center bg-orange-500 font-extrabold px-1 rounded-full 
          -top-2 -right-2 text-xs"
                >
                  {cartAmount}
                </span>
              )}
            </div>
          </Link>
          <Link to={signed && !loadingUser ? "/painel" : "/entrar"}>
            {signed && !loadingUser ? (
              <FaUser className="text-2xl text-white" />
            ) : (
              <BiLogIn className="text-3xl text-white" />
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
