import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { IoPawSharp } from "react-icons/io5";

export function Header() {
  const { cartAmount } = useContext(CartContext);

  return (
    <header className="w-full bg-linear-to-b from-green-700 to-green-900 rounded-b-2xl shadow-2xl fixed top-0">
      <nav className="mx-auto max-w-[80%] w-full flex justify-between items-center py-1">
        <Link to={"/"}>
          <Button className="rounded-xl font-extrabold text-xl md:text-3xl py-0 flex items-center">
            W<IoPawSharp />
            RD<span className="text-green-700">PET</span>
          </Button>
        </Link>
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
      </nav>
    </header>
  );
}
