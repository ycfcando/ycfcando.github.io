"use server";

import Markdown from "@/modules/markdown";
import AnchorList from "@/modules/anchor-list";
import { parseMarkdown } from "@/lib/markdown";

export default async function Page() {
  const { html, headings } = await parseMarkdown("01.类型检测");

  return (
    <div className="w-full flex justify-between">
      <Markdown content={html} />
      <AnchorList headings={headings} />
    </div>
  );
}
