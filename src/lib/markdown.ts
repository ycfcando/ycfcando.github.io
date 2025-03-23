import * as runtime from "react/jsx-runtime";
import { compile, run } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { remarkAchors } from "../../lib/remark-plugins";

/* markdown to react: 运行时/函数式/服务端&客户端 */
export async function parseMDXToReactFn(file: string) {
  // 提取 Front Matter 和删除 YAML front matter 后的内容
  const { data: frontMatter, content: noneFrontMatterContent } = matter(file);

  // markdown 转成 React 文本并返回 anchor 信息
  const { value, data } = await compile(noneFrontMatterContent, {
    remarkPlugins: [remarkGfm, remarkAchors],
    rehypePlugins: [rehypeHighlight],
    outputFormat: "function-body",
  });

  // React 文本转成 React 组件
  const { default: MDXComponent } = await run(value, runtime);

  return { frontMatter, MDXComponent, headings: data?.headings };
}
