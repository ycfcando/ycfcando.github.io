import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

interface CodeProps {
  children: ReactNode;
}

function Code({ children }: CodeProps) {
  return <code className="not-prose code-custom">{children}</code>;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    code: Code,
    ...components,
  };
}
