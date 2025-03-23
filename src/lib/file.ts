"use server";

import fs from "node:fs";
import { join, extname, parse } from "node:path";
import { readdir } from "node:fs/promises";

const runPath = process.cwd();

/* markdown 文件 */
export async function getMarkdownFile(filename: string) {
  const filePath = join(runPath, "src", "md", `${filename}.mdx`);
  const file = fs.readFileSync(filePath, "utf8");

  return file;
}

/* // 获取文件夹下指定文件类型名称 */
export async function getFolderFiles(path: string, extensions = [".mdx"]) {
  try {
    // 获取文件夹下文件
    const files = await readdir(path);
    const filenames = files
      .filter((file) => extensions.includes(extname(file).toLowerCase()))
      .map((file) => {
        // 解析路径对象
        const parsed = parse(file);

        // 组合 name 和 dir 得到无后缀的完整路径
        const filenameWithoutExt = join(parsed.dir, parsed.name);

        return filenameWithoutExt;
      });
    return filenames;
  } catch (err) {
    console.error("错误:", err);
    return [];
  }
}

export async function getFolderNames(path: string) {
  try {
    const enters = await readdir(path, { withFileTypes: true });
    // 获取文件夹下文件
    const dirnames = enters
      .filter((enter) => enter.isDirectory())
      .map((enter) => enter.name);

    return dirnames;
  } catch (err) {
    console.error("错误:", err);
    return [];
  }
}
