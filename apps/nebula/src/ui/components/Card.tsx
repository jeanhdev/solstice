import { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren) {
  return (
    <div className="rounded-lg bg-white px-4 py-8 shadow sm:px-10">
      {children}
    </div>
  );
}
