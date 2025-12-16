import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { Cart } from "./pages/Cart";
import { Detail } from "./pages/Detail";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/carrinho",
        element: <Cart />,
      },
      {
        path: "/detalhes/:id",
        element: <Detail />,
      },
    ],
  },
]);

export { router };
