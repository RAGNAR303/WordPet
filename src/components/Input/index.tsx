import type { InputHTMLAttributes, ReactNode } from "react";
import type {
  RegisterOptions,
  UseFormRegister,
  Path,
  FieldValues,
} from "react-hook-form";
interface InputProps<
  T extends FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  name: Path<T>;
  error?: string;
  type?: string;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T>;
}

export function Input<T extends FieldValues>({
  name,
  error,
  icon,
  register,
  rules,
  type,
  ...props
}: InputProps<T>) {
  return (
    <>
      <div
        className=" bg-linear-to-b from-green-700 to-green-900 rounded-3xl p-2 flex
          items-center gap-2 border border-double border-green-700 w-full"
      >
        <p className="text-white text-xl font-bol">{icon}</p>
        <input
          id={name}
          type={type}
          {...register(name, rules)}
          {...props}
          className="outline-none text-xl text-white p-1 w-full appearance-none autofill:bg-green-700 rounded "
        />
      </div>
      <p className="text-red-700 text-xs">{error}</p>
    </>
  );
}
