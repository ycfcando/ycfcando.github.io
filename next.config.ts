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

export default nextConfig;
