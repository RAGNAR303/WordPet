import { TiMinus, TiPlus } from "react-icons/ti";
import { Button } from "../../components/Button";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

export function Cart() {
  const { cart, addItemCart, total, removeItemCart } = useContext(CartContext);

  return (
    <div className="max-w-6xl w-full mx-auto ">
      <h1 className="text-4xl font-extrabold text-center mt-5 text-zinc-800">
        Meu Carrinho
      </h1>
      <section className="mt-10 px-3 flex flex-col gap-2">
        {cart.length ? (
          cart.map((prd) => (
            <article
              key={prd.id}
              className=" bg-linear-to-b from-green-700 to-green-900 rounded-3xl p-1 pb-3"
            >
              <div className="bg-white rounded-3xl p-2 flex items-center justify-between">
                <Link
                  to={`/detalhes/${prd.id}`}
                  className="transition-discrete hover:scale-[1.03] duration-200"
                >
                  <img
                    src={prd.images[0]}
                    alt={prd.title}
                    className="max-h-20 object-cover rounded-2xl"
                  />
                </Link>

                <strong>{formatPrice(prd.price)}</strong>
                <div className="flex items-center bg-orange-500 border border-double border-white rounded-3xl p-1">
                  <Button onClick={() => removeItemCart(prd)}>
                    <TiMinus />
                  </Button>
                  <span className="mx-1 font-bold">{prd.amount}</span>
                  <Button onClick={() => addItemCart(prd)}>
                    <TiPlus />
                  </Button>
                </div>
                <strong>SubTotal: {formatPrice(prd.total)}</strong>
              </div>
            </article>
          ))
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center">
            <span className="text-4xl font-bold text-zinc-700 ">
              Carrinho Vazio :(
            </span>
            <Link to={"/"}>
              <Button>Ver produtos</Button>
            </Link>
          </div>
        )}
        {cart.length !== 0 && (
          <strong className="text-zinc-800 text-2xl">Total: {total}</strong>
        )}
      </section>
    </div>
  );
}
