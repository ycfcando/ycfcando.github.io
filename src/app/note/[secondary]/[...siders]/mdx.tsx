"use client";

import { use, useRef } from "react";
import { MDXHeader } from "@/modules/mdx-client";
import AnchorList from "@/modules/anchor-list";
import type { IMDXSource } from "@/types/mdx";
import dynamic from "next/dynamic";

const MDXClient = dynamic(() => import("@/modules/mdx-client"), {
  ssr: false, // 强制客户端渲染
});

export default function MDX({
  promise,
}: {
  promise: Promise<IMDXSource | null>;
}) {
  const mdxSource = use(promise);
  const containerRef = useRef(null);

  return (
    <div className="grid h-full relative col-span-5 row-span-3 grid-cols-18">
      <div className="grid py-5 px-6 col-span-14 overflow-hidden relative">
        {mdxSource?.frontmatter && (
          <div className="col-span-full">
            <MDXHeader
              frontmatter={mdxSource?.frontmatter}
              containerRef={containerRef}
            />
          </div>
        )}
        <div
          className="col-span-full overflow-y-auto hidden-scroll transition-transform duration-300"
          ref={containerRef}
        >
          <MDXClient source={mdxSource} />
        </div>
      </div>
      <div className="py-6 px-4 col-span-4">
        <AnchorList headings={mdxSource?.headings} />
      </div>
    </div>
  );
}
