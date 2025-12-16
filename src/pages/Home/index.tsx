import { MdAddShoppingCart } from "react-icons/md";
import { Button } from "../../components/Button";
import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import { CartContext } from "../../Context/CartContext";
import dog from "../../assets/dog.png";

export interface ProductProps {
  cover: string;
  description: string;
  id: string;
  price: number;
  title: string;
}

export function Home() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const { addItemCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get("/products");

      setProducts(data);
    }
    loadProducts();
  }, []);

  function HandleAddProduct(product: ProductProps) {
    addItemCart(product);
    setTimeout(() => {
      navigate("/carrinho");
    }, 1000);
  }

  return (
    <>
      <section className="bg-linear  w-full h-full max-h-70 overflow-hidden flex justify-around items-center">
        <img className="md:h-60 mt-25 hidden md:block" src={dog} alt="" />
        <div className="h-60 mt-[50%] md:mt-[20%]">
          <h1 className="text-4xl font-extrabold text-zinc-800">
            Tudo para se Pet
          </h1>
          <p className="text-2xl font-bold text-zinc-700">
            Voçê encontra aqui !
          </p>
        </div>
      </section>
      <div className="max-w-6xl w-full mx-auto ">
        <section className="flex flex-col">
          <h1 className="text-2xl font-extrabold text-center text-zinc-700 text-shadow-2xs text-shadow-zinc-900/50 mt-10">
            Veja nossos produtos
          </h1>
          <main className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5 p-5">
            {products &&
              products.map((prd) => (
                <article
                  key={prd.id}
                  className="bg-linear-to-b from-green-700 to-green-900 rounded-3xl p-2 flex flex-col
          items-center gap-2"
                >
                  <Link
                    to={`/detalhes/${prd.id}`}
                    className="bg-white w-full rounded-3xl flex flex-col items-center p-1 text-center border-2 border-double border-zinc-200 hover:border-orange-500 duration-300"
                  >
                    <img
                      src={prd.cover}
                      alt={prd.title}
                      className="max-h-40 md:max-h-60  object-cover rounded-2xl"
                    />
                    <h2 className="font-bold text-zinc-800">{prd.title}</h2>
                    <strong className="text-2xl text-zinc-700">
                      {formatPrice(prd.price)}
                    </strong>
                  </Link>

                  <div className="flex justify-between w-[80%]">
                    <Button onClick={() => HandleAddProduct(prd)}>
                      Comprar
                    </Button>
                    <Button onClick={() => addItemCart(prd)}>
                      <MdAddShoppingCart className="text-2xl" />
                    </Button>
                  </div>
                </article>
              ))}
          </main>
        </section>
      </div>
    </>
  );
}
