"use server";

import { Suspense, PropsWithChildren, ReactNode } from "react";

interface IProps {
  mdxFn: () => ReactNode;
}

export async function MDXForBuild({ children }: PropsWithChildren) {
  return <div className="grid col-span-full grid-cols-6">{children}</div>;
}

export async function MDXContainer({ mdxFn }: IProps) {
  function errorHandler() {
    try {
      return mdxFn();
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="col-span-5 ">
      <div
        id="mdx"
        className="prose dark:prose-invert prose-neutral m-auto max-w-4xl typography pb-60"
      >
        <Suspense fallback={<span>mdx渲染中</span>}>{errorHandler()}</Suspense>
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
