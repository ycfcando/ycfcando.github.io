import { visit } from "unist-util-visit";
import type { HeadingInterfase } from "@/types/remark-plugins";
import type * as mdast from "mdast";
import type { Plugin } from "unified";
import type { Heading } from "mdast";
import GithubSlugger from "github-slugger";
import { valueToEstree } from "estree-util-value-to-estree";
import { define } from "unist-util-mdx-define";

export const remarkAchors: Plugin = () => {
  return (ast, file) => {
    const headings: HeadingInterfase[] = [];
    const slugger = new GithubSlugger();

    // 访问所有标题节点
    visit(
      ast,
      "heading",
      (
        node: Omit<Heading, "data"> & { data: { hProperties: { id: string } } }
      ) => {
        // 提取标题文本（不处理复杂子节点）
        const text =
          node.children.find((child) => child.type === "text")?.value ?? "";

        node.data = node.data || {};
        node.data.hProperties = { id: slugger.slug(text) };

        headings.push({
          // 层级（1 表示 h1）
          depth: node.depth,
          text: text.trim(),
          id: node.data.hProperties.id,
        });
      }
    );

    define(ast as mdast.Root, file, {
      headings: valueToEstree(headings, { preserveReferences: true }),
    });
  };
};
