import { IoLogoWhatsapp } from "react-icons/io5";

export function WhatsappButton() {

const tel = 11123456789
const product = "Ração para cachorro 25g "

  return (
    <a
      href={`https://api.whatsapp.com/send?phone=${tel}&text=Olá gostaria de comprar esse produto ${product}`}
      target="_blank"
      className="rounded-full bg-green-500 flex items-center justify-center  fixed bottom-2 right-2 z-30 p-2 drop-shadow-2xl border-4  border-white hover:scale-105 duration-300 has-[i:hover:]:animate-pulse"
    >
      <IoLogoWhatsapp className="text-white text-5xl " />
    </a>
  );
}
