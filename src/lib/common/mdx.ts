import { serialize } from "next-mdx-remote/serialize";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { visit } from "unist-util-visit";
import type {
  IHeadingInterfase,
  IMDXSource,
  FrontmatterType,
} from "@/types/mdx";
import type { Heading } from "mdast";
import GithubSlugger from "github-slugger";

/* markdown to react: 运行时/函数式/服务端&客户端 */
export async function serializeWithData(file: string): Promise<IMDXSource> {
  const headings: IHeadingInterfase[] = [];

  // 编译 MDX
  const mdxSource = await serialize<FrontmatterType, FrontmatterType>(file, {
    mdxOptions: {
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkGfm,
        () => {
          return (ast) => {
            const slugger = new GithubSlugger();

            // 访问所有标题节点
            visit(
              ast,
              "heading",
              (
                node: Omit<Heading, "data"> & {
                  data: { hProperties: { id: string } };
                }
              ) => {
                // 提取标题文本（不处理复杂子节点）
                const text =
                  node.children.find((child) => child.type === "text")?.value ??
                  "";

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
          };
        },
      ],
      rehypePlugins: [rehypeHighlight],
      format: "mdx",
    },
    parseFrontmatter: true,
  });

  return { ...mdxSource, headings };
}
