import { PropsWithChildren } from "react";
import { Sidebar } from "@/modules/sidebar";

export default async function NoteLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid h-full grid-cols-12 gap-2">
      <div className="col-span-2 relative overflow-hidden inset-0 bg-(--background)/95 rounded shadow-lg">
        <Sidebar />
      </div>
      <div className="col-span-10 relative overflow-hidden inset-0 bg-(--background)/95 rounded shadow-lg">
        {children}
      </div>
    </div>
  );
}
