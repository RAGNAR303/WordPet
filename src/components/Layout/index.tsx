import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { WhatsappButton } from "../WhatsApp";

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <WhatsappButton />
    </>
  );
}
