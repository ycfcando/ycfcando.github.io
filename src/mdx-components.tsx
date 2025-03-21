import type { MDXComponents } from "mdx/types";
import type { JSX, ReactNode } from "react";
import hljs from "highlight.js";

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className: string;
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

function Code({ children }: CodeProps) {
  return typeof children === "string" ? (
    <code className="not-prose code-custom">{children}</code>
  ) : (
    children
  );
}

function Pre({ children, ...props }: ChildrenProps) {
  const code = hljs.highlight(children?.props?.children as string, {
    language: "js",
  }).value;

  console.log(children);

  return (
    <pre {...props}>
      <code
        {...props}
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </pre>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, ...props }) => (
      <H level={2} {...props}>
        {children}
      </H>
    ),
    h3: ({ children, ...props }) => (
      <H level={3} {...props}>
        {children}
      </H>
    ),
    h4: ({ children, ...props }) => (
      <H level={4} {...props}>
        {children}
      </H>
    ),
    code: Code,
    pre: Pre,
    ...components,
  };
}
