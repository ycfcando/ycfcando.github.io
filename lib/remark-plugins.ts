import { visit } from "unist-util-visit";
import type { HeadingInterfase } from "@/types/remark-plugins";
import type * as mdast from "mdast";
import type { Plugin } from "unified";
import type { Heading } from "mdast";
import GithubSlugger from "github-slugger";
import { valueToEstree } from "estree-util-value-to-estree";

export const remarkAchors: Plugin = () => {
  return (ast) => {
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

    (ast as mdast.Root).children.unshift({
      type: "mdxjsEsm",
      value: "",
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ExportNamedDeclaration",
              specifiers: [],
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: "headings" },
                    init: valueToEstree(headings, { preserveReferences: true }),
                  },
                ],
              },
            },
          ],
        },
      },
    });
  };
};
