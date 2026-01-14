import { Link } from "react-router-dom";
import { Button } from "../Button";
import { IoPawSharp } from "react-icons/io5";

export function Logo() {
  return (
    <Link to={"/"}>
      <Button className="rounded-xl font-extrabold text-xl md:text-3xl py-0 flex items-center">
        W<IoPawSharp />
        RD<span className="text-green-700">PET</span>
      </Button>
    </Link>
  );
}
