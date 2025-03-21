"use server";

// import Markdown from "@/modules/markdown";
import Markdown from "@/modules/markdown-x";

export default async function Page() {
  return (
    <div className="w-full flex justify-between">
      <Markdown name="01.类型检测" />
    </div>
  );
}
