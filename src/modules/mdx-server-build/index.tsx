"use server";

import { Suspense, PropsWithChildren, ReactNode } from "react";
import { FrontmatterInterface } from "@/types/mdx";
import { Text } from "@/components/ui/text";

interface IProp extends PropsWithChildren {
  mdxFn: () => ReactNode;
  children?: ReactNode;
}

export async function MDXForBuild({ children }: PropsWithChildren) {
  return <div className="grid col-span-full grid-cols-6">{children}</div>;
}

export async function MDXContainer({ mdxFn, children }: IProp) {
  function errorHandler() {
    try {
      return mdxFn();
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="grid col-span-5 grid-cols-10">
      <div className="col-span-8 col-start-2">
        <Suspense fallback={<span>mdx渲染中</span>}>{children}</Suspense>
        <div
          id="mdx"
          className="prose dark:prose-invert prose-neutral w-full max-w-none typography pb-60 mt-5"
        >
          <Suspense fallback={<span>mdx渲染中</span>}>
            {errorHandler()}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export async function MDXAnchorList({ children }: PropsWithChildren) {
  return (
    <div className="sticky h-[calc(100vh-48px)] top-[48px] pt-6 col-span-1">
      <Suspense fallback={<span>mdx渲染中</span>}>{children}</Suspense>
    </div>
  );
}

export async function MDXHeader({
  frontmatter,
}: {
  frontmatter: FrontmatterInterface;
}) {
  return (
    <div className="border-b pb-1">
      <Suspense fallback={<span>mdx渲染中</span>}>
        <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
          {frontmatter?.title}
        </h2>
        <div className="flex gap-3">
          <Text>{frontmatter?.date}</Text>
          <Text>{frontmatter?.authors}</Text>
        </div>
      </Suspense>
    </div>
  );
}
