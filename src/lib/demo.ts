import { compile } from "@mdx-js/mdx";
import type * as mdast from "mdast";
import { type Plugin } from "unified";
import { define } from "unist-util-mdx-define";

const yourRemarkMdxPlugin: Plugin<[], mdast.Root> = () => (ast, file) => {
  define(ast, file, {
    remarkVariable: { type: "Literal", value: "Hello remark plugin!" },
  });
};

const { value } = await compile("{remarkVariable}", {
  remarkPlugins: [yourRemarkMdxPlugin],
});

console.log(value);
