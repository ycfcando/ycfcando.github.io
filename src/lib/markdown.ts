import fs from "fs";
import path from "node:path";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";

export function getMarkdownFile(filename: string) {
  const filePath = path.join(process.cwd(), "md", `${filename}.mdx`);
  const file = fs.readFileSync(filePath, "utf8");

  return file;
}

/* 函数形式：markdown转react */
export async function parseMarkdownX(filename: string) {
  const file = getMarkdownFile(filename);

  const { default: MDXContent } = await evaluate(file, runtime);

  return { MDX: MDXContent };
}
