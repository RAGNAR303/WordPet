import { Container } from "../../components/Container";
import { TopBar } from "../../components/TopBar";
import { BsFillTrash3Fill } from "react-icons/bs";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { formatPrice } from "../../utils/formatPrice";

interface ProductPetProps {
  description: string;
  id: string;
  price: string;
  title: string;
  images: string;
}

export function Dashboard() {
  const [petProducts, setPetProducts] = useState<ProductPetProps[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    function loadProducts() {
      if (!user?.uid) {
        return;
      }

      const productRef = collection(db, "products");
      const filterUser = query(productRef, where("uid", "==", user?.uid));

      getDocs(filterUser)
        .then((snapshot) => {
          console.log(snapshot.docs);

          let listProducts = [] as ProductPetProps[];

          snapshot.forEach((doc) => {
            listProducts.push({
              id: doc.id,
              description: doc.data().description,
              price: doc.data().price,
              title: doc.data().title,
              images: doc.data().images,
            });
          });

          setPetProducts(listProducts);
        })
        .catch((error) => {
          console.log("ERROR EM CARREGAR DOCUMENTOS", error);
        });
    }

    loadProducts();
  }, [user?.uid]);

  async function deleteProduct(id: string) {
    console.log(id);

    const produtcRef = doc(db, "products", id);
    await deleteDoc(produtcRef);
    setPetProducts(petProducts.filter((prd) => prd.id !== id));
  }
  return (
    <Container>
      <TopBar />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 mt-2 gap-2 ">
        {petProducts &&
          petProducts.map((prd) => (
            <article
              key={prd.id}
              className="flex flex-col items-center bg-white p-2 rounded-2xl gap-1.5 shadow-2xs border-3 border-orange-500 relative overflow-hidden has-[button:hover]:border-red-500 has-[button:hover]:scale-105 duration-300  "
            >
              <button
                onClick={() => deleteProduct(prd.id)}
                className="absolute  right-0 top-0 bg-orange-500 p-4 rounded-bl-2xl hover:bg-red-500 duration-300 "
              >
                <BsFillTrash3Fill className="text-white text-2xl" />
              </button>
              <img src={prd.images[0]} alt="" className="h-40 object-cover " />

              <h2 className="text-center font-medium ">{prd.title}</h2>
              <strong className="text-zinc-700 font-extrabold text-2xl">
                {formatPrice(Number(prd.price))}
              </strong>
            </article>
          ))}
      </section>
    </Container>
  );
}
