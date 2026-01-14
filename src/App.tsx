import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { Cart } from "./pages/Cart";
import { Detail } from "./pages/Detail";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";

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
      {
        path: "/painel",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/entrar",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Register />,
  },
]);

export { router };
