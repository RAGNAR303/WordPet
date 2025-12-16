import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`bg-orange-500 text-white rounded-3xl px-6 py-2 font-bold hover:bg-orange-700 duration-300 
       hover:scale-[1.02] transition-all border-2 border-double ${
         className ?? ""
       }`}
      {...props}
    >
      {children}
    </button>
  );
}
