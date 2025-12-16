import { createContext, useState, type ReactNode } from "react";
import type { ProductProps } from "../pages/Home";
import { formatPrice } from "../utils/formatPrice";
import toast from "react-hot-toast";

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: ProductProps) => void;
  removeItemCart: (product: CartProps) => void;
  total: string;
}

export interface CartProps {
  cover: string;
  description: string;
  id: string;
  price: number;
  title: string;
  amount: number;
  total: number;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([]);
  const [total, setTotal] = useState("");

  function addItemCart(newItem: ProductProps) {
    const indexItem = cart.findIndex((item) => item.id === newItem.id);

    if (indexItem !== -1) {
      // somando +1 no item no cart
      let cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount + 1;
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price;
      setCart(cartList);
      totalResultCart(cartList);
      toast.success("Quantidade alterada +1!", {
        style: {
          borderRadius: "5px",
          background: "#070707",
          color: "#fff",
        },
      });
      return;
    }

    // aqui vai adicionar novo item na lista

    const data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };

    setCart((products) => [...products, data]);
    totalResultCart([...cart, data]);
    toast.success("Item adicionado no carrinho!", {
      style: {
        borderRadius: "5px",
        background: "#070707",
        color: "#fff",
      },
    });
  }

  function removeItemCart(product: CartProps) {
    // verifica a posição do item no array
    const indexItem = cart.findIndex((item) => item.id === product.id);

    if (cart[indexItem]?.amount > 1) {
      let cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount - 1;
      cartList[indexItem].total =
        cartList[indexItem].total - cartList[indexItem].price;
      setCart(cartList);
      totalResultCart(cartList);
      toast("Quantidade alterada!", {
        icon: "⚠️",
        style: {
          borderRadius: "5px",
          background: "#070707",
          color: "#fff",
        },
      });
      return;
    }

    const removeItem = cart.filter((item) => item.id !== product.id);
    setCart(removeItem);
    totalResultCart(removeItem);
    toast("Item removido!", {
      icon: "❌",
      style: {
        borderRadius: "5px",
        background: "#070707",
        color: "#fff",
      },
    });
  }

  function totalResultCart(items: CartProps[]) {
    let myCart = items;
    let result = myCart.reduce((acc, prd) => {
      return acc + prd.total;
    }, 0);
    const resultFormat = formatPrice(result);
    setTotal(resultFormat);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addItemCart,
        removeItemCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
