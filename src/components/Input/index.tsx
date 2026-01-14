import type { InputHTMLAttributes, ReactNode } from "react";
import type { RegisterOptions, UseFormRegister } from "react-hook-form";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  name: string;
  error?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
}

export function Input({
  name,
  error,
  icon,
  register,
  rules,
  ...props
}: InputProps) {
  return (
    <>
      {" "}
      <div
        className=" bg-linear-to-b from-green-700 to-green-900 rounded-3xl p-2 flex
          items-center gap-2 border border-double border-green-700 w-full"
      >
        <p className="text-white text-xl font-bol">{icon}</p>
        <input
          id={name}
          {...register(name, rules)}
          {...props}
          className="outline-none text-xl text-white p-1 w-full appearance-none autofill:bg-green-700 rounded "
        />
      </div>
      <p className="text-red-700 text-xs">{error}</p>
    </>
  );
}
