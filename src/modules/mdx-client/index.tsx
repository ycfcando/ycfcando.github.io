"use client";

import { MDXRemote } from "next-mdx-remote";
import { PropsWithChildren, Suspense, type RefObject } from "react";
import type { FrontmatterType } from "@/types/mdx";
import { Text } from "@/components/ui/text";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ContainerScrollProgressCircle } from "@/modules/scroll-progress-circle";

function Code({ children }: PropsWithChildren) {
  return <code className="not-prose code-custom">{children}</code>;
}

export default function MDXClient({
  source,
}: {
  source: MDXRemoteSerializeResult | null;
}) {
  return (
    <article
      id="mdx"
      className="prose dark:prose-invert prose-neutral w-full max-w-none typography pb-60 mt-5"
    >
      {source && (
        <MDXRemote
          {...source}
          components={{
            code: Code,
          }}
        />
      )}
    </article>
  );
}

export function MDXHeader({
  frontmatter,
  containerRef,
}: {
  frontmatter?: FrontmatterType;
  containerRef: RefObject<HTMLElement | null>;
}) {
  return (
    <div className="flex w-full border-b pb-1">
      <Suspense fallback={<span>mdx渲染中</span>}>
        <div className="grow-1">
          <h2 className="mt-0 mb-0 pb-2 text-3xl font-semibold tracking-tight transition-colors">
            {frontmatter?.title}
          </h2>
          <div className="flex gap-3">
            <Text>{frontmatter?.date}</Text>
            <Text>{frontmatter?.authors}</Text>
          </div>
        </div>
        <div>
          <ContainerScrollProgressCircle
            containerRef={containerRef}
            color="stroke-(--foreground)"
          />
        </div>
      </Suspense>
    </div>
  );
}
