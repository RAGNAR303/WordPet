import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import type { ProductProps } from "../Home";
import { Button } from "../../components/Button";
import { MdAddShoppingCart } from "react-icons/md";
import { formatPrice } from "../../utils/formatPrice";
import { CartContext } from "../../Context/CartContext";
import { Container } from "../../components/Container";

export function Detail() {
  const [product, setProduct] = useState<ProductProps>();
  const { id } = useParams();
  const { addItemCart } = useContext(CartContext);
  const navigate = useNavigate();
  useEffect(() => {
    async function loadDetail() {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    }
    loadDetail();
  }, [id]);

  function addItem(product: ProductProps) {
    addItemCart(product);
    setTimeout(() => {
      navigate("/carrinho");
    }, 1000);
  }

  return (
    <Container>
      <h1 className="text-zinc-700 font-bold text-center my-5 text-3xl">
        Sobre Produto
      </h1>
      <main className="bg-linear-to-b from-green-700 to-green-900 rounded-3xl p-2">
        {product && (
          <section
            className="flex items-center gap-2 flex-col md:flex-row
           bg-white w-full rounded-3xl p-3 text-center md:text-start"
          >
            <img
              src={product?.cover}
              alt={product?.title}
              className="max-h-40 md:max-h-80 rounded-2xl"
            />
            <div className="flex flex-col gap-2">
              <h2 className="md:text-2xl font-bold  text-zinc-800">
                {product?.title}
              </h2>
              <p className="text-xs md:text-xl font-medium text-zinc-700">
                {product?.description}
              </p>
              <strong className="text-4xl">
                {formatPrice(product?.price)}
              </strong>
            </div>
          </section>
        )}
        <div className="flex   justify-between md:w-[30%] p-3 ">
          <Button onClick={() => addItem(product)}>Comprar</Button>
          <Button onClick={() => addItemCart(product)}>
            <MdAddShoppingCart className="text-2xl" />
          </Button>
        </div>
      </main>
    </Container>
  );
}
