import { PropsWithChildren } from "react";
import { NextNav } from "@/modules/sidebar/next-nav";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-full py-2">
      <NextNav />
      {children}
    </div>
  );
}
