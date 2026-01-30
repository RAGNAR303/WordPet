import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { api } from "../../services/api";
import type { ProductPetProps } from "../Home";
import { Button } from "../../components/Button";
import { MdAddShoppingCart } from "react-icons/md";
import { formatPrice } from "../../utils/formatPrice";
import { CartContext } from "../../Context/CartContext";
import { Container } from "../../components/Container";
import { db } from "../../services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
export function Detail() {
  const [product, setProduct] = useState<ProductPetProps>();
  const { id } = useParams();
  const { addItemCart } = useContext(CartContext);

  const navigate = useNavigate();
  // useEffect(() => {
  //   async function loadDetail() {
  //     const { data } = await api.get(`/products/${id}`);
  //     setProduct(data);
  //   }
  //   loadDetail();
  // }, [id]);

  useEffect(() => {
    async function loadDetailProdutcs() {
      if (!id) {
        return navigate("/", { replace: true });
      }

      const docRef = doc(db, "products", id);
      getDoc(docRef)
        .then((doc) => {
          if (!doc.data()) {
            return navigate("/");
          }

          setProduct({
            id: doc.id,
            title: doc.data()?.title,
            price: doc.data()?.price,
            description: doc.data()?.description,
            images: doc.data()?.images,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    loadDetailProdutcs();
  }, [id, navigate]);

  function addItem(product: ProductPetProps) {
    addItemCart(product);
    setTimeout(() => {
      navigate("/carrinho");
    }, 1000);
  }

  console.log(product?.images);
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
            <Swiper
              modules={[Navigation, Pagination, Scrollbar]}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
              className="flex w-full md:w-3xl items-center  justify-center"
            >
              {product.images.map((url, index) => (
                <SwiperSlide key={index}>
                  <img
                    key={index}
                    src={url}
                    alt={product.title}
                    className="max-h-40 md:max-h-80  rounded-2xl   object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex flex-col gap-2">
              <h2 className="md:text-2xl font-bold  text-zinc-800">
                {product.title}
              </h2>
              <p className="text-xs md:text-xl font-medium text-zinc-700">
                {product.description}
              </p>
              <strong className="text-4xl">
                {formatPrice(Number(product.price))}
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
