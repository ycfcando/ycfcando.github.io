import { readFileSync } from "node:fs";
import { join, extname, parse } from "node:path";
import { readdir } from "node:fs/promises";
import { DocumentRoutesData } from "@/types/mdx";
import { cache } from "react";

const runPath = process.cwd();

/* 获取 markdown 文件 */
export async function getMarkdownFile(paths: string[]) {
  const suffixPaths = paths.map((path, index) =>
    index === paths.length - 1 ? `${path}.mdx` : path
  );
  const filePath = join(runPath, "mdx", ...suffixPaths);
  const file = readFileSync(filePath, "utf8");

  return file;
}

/* // 获取文件夹下指定文件类型名称 */
export async function getFolderFilenames(path: string, extensions = [".mdx"]) {
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

export const getDocumentRoutesData = cache(async function () {
  const rootPath = join(process.cwd(), "mdx");
  const files = await readdir(rootPath, { withFileTypes: true });
  const queue = [...files];
  const result: DocumentRoutesData[] = [];

  while (queue.length) {
    const enter = queue.shift();

    if (!enter) continue;
    const path = join(enter.parentPath, enter.name);
    const relativePath = path
      .replace(rootPath, "")
      .replace(/\\/g, "/")
      .replace(".mdx", "");
    const route = path
      .replace(rootPath, "")
      .replace(/\\/g, "/")
      .replace(/(\d+)\./g, "")
      .replace(".mdx", "");
    const name = enter.name?.split(".")[1];
    const level = route.split("/").length - 1;
    const slug = route.split("/").slice(1);

    if (enter?.isDirectory()) {
      const isMDX = false;

      const subFiles = await readdir(path, { withFileTypes: true });

      queue.push(...subFiles);
      result.push({ name, route, path, isMDX, level, slug, relativePath });
    } else if (enter) {
      const ext = parse(path).ext;
      const isMDX = true;

      if (ext === ".mdx") {
        result.push({ path, route, name, isMDX, level, slug, relativePath });
      }
    }
  }
  
  return result;
});

export async function getAllMDXSlugs() {
  const enterPath = join(process.cwd(), "mdx");

  // 获取一级目录
  const files = await readdir(enterPath, { withFileTypes: true });

  // 获取文件下所有mdx的构建路径
  const result = await files.reduce(
    (pre, file) =>
      pre.then(async (value) => {
        if (file.isDirectory()) {
          const level1Path = `/${file.name}`;
          const parentSiders = await getFolderNames(
            `${enterPath}${level1Path}`
          );
          const results = await parentSiders.reduce(
            async (pre, parentSider) =>
              pre.then(async (v) => {
                const parentSiderPath = `/${parentSider}`;
                const mdxFilenames = await getFolderFilenames(
                  `${enterPath}${level1Path}${parentSiderPath}`
                );
                const mdxSlugs = mdxFilenames.map((mdxName) => {
                  return { slug: [file.name, parentSider, mdxName] };
                });
                v.push(...mdxSlugs);
                return v;
              }),
            Promise.resolve<{ slug: string[] }[]>([])
          );
          value.push(...results);
        }
        return value;
      }),
    Promise.resolve<{ slug: string[] }[]>([])
  );

  return result;
}
