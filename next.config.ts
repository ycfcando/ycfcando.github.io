import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { remarkAchors } from "lib/remark-plugins";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import type { Configuration } from "webpack";

const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  webpack: (config: Configuration) => {
    // 添加对 .txt 文件的处理
    config.module?.rules?.push({
      test: /\.txt$/,
      use: "raw-loader",
    });

    return config;
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkGfm,
      remarkAchors,
    ],
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX(nextConfig);
