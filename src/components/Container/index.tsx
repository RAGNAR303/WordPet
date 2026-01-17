import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-6xl w-full mx-auto mt-20 p-2">{children}</div>;
}
