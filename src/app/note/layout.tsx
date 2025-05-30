import { PropsWithChildren } from "react";
import { NextNav } from "@/modules/sidebar/next-nav";

export default function NoteLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full py-2">
      <div className="h-[40px] pb-2 ">
        <NextNav />
      </div>
      <div className="h-[calc(100%-40px)]">{children}</div>
    </div>
  );
}
