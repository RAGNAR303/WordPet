import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  button: ReactNode;
}

export function Card({ children, button }: CardProps) {
  return (
    <article
      className="bg-linear-to-b from-green-700 to-green-900 rounded-3xl p-2 flex flex-col
          items-center gap-2"
    >
      <div className="bg-white w-full h-full rounded-3xl flex flex-col items-center p-1">
        {children}
      </div>

      <div className="flex justify-between w-[80%]">{button}</div>
    </article>
  );
}
