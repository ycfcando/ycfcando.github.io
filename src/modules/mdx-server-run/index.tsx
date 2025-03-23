"use server";

import AnchorList from "@/modules/anchor-list";
import { parseMDXToReactFn } from "@/lib/markdown";
import type { ReactNode } from "react";
import { HeadingInterfase } from "@/types/remark-plugins";

interface IProps {
  file: string;
}

interface CodeProps {
  isPre: boolean;
  children: ReactNode;
}

function Code({ children, ...props }: CodeProps) {
  return (
    <code {...props} className="not-prose code-custom">
      {children}
    </code>
  );
}

const components = {
  code: Code,
};

export default async function MDXServerRun({ file }: IProps) {
  const { MDXComponent, headings } = await parseMDXToReactFn(file);

  return (
    <>
      <div className="w-full p-4">
        <div className="prose dark:prose-invert prose-neutral m-auto max-w-4xl typography">
          <MDXComponent components={components} />
        </div>
      </div>
      <AnchorList headings={headings as HeadingInterfase[]} />
    </>
  );
}
