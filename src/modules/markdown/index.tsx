"use server";

import AnchorList from "@/modules/anchor-list-no-data";
import { parseMarkdownX } from "@/lib/markdown";
import type { JSX, ReactNode } from "react";
import hljs from "highlight.js";

interface IProps {
  name: string;
}

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}

interface CodeProps extends ChildrenProps {
  isPre: boolean;
}

interface ChildrenProps {
  children: ReactNode;
}

function H({ level, children, ...props }: HeadingProps) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  const id = children?.toString() ?? "";

  return (
    <HeadingTag {...props} id={id}>
      {children}
    </HeadingTag>
  );
}

function Code({ children, ...props }: CodeProps) {
  const code = hljs.highlight(children as string, { language: "js" }).value;

  return (
    <code
      {...props}
      className="not-prose code-custom"
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}

function Pre({ children, ...props }: ChildrenProps) {
  return (
    <pre {...props} className="pre">
      {children}
    </pre>
  );
}

const components = {
  h2: ({ children, ...props }: ChildrenProps) => (
    <H level={2} {...props}>
      {children}
    </H>
  ),
  h3: ({ children, ...props }: ChildrenProps) => (
    <H level={3} {...props}>
      {children}
    </H>
  ),
  h4: ({ children, ...props }: ChildrenProps) => (
    <H level={4} {...props}>
      {children}
    </H>
  ),
  code: Code,
  pre: Pre,
};

export default async function Markdown({ name }: IProps) {
  const { MDX } = await parseMarkdownX(name);

  return (
    <>
      <div className="w-full p-4">
        <div className="prose dark:prose-invert prose-neutral m-auto max-w-4xl typography">
          <MDX components={components} />
        </div>
      </div>
      <AnchorList />
    </>
  );
}
