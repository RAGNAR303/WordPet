import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { Cart } from "./pages/Cart";
import { Detail } from "./pages/Detail";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { NewProduct } from "./pages/Dashboard/New";
import { Private } from "./pages/routes/Private";

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
        element: (
          <Private>
            <Dashboard />
          </Private>
        ),
      },
      {
        path: "/painel/novo-produto",
        element: (
          <Private>
            <NewProduct />
          </Private>
        ),
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
