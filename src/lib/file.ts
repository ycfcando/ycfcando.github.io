import { join, parse } from "node:path";
import { readdir } from "node:fs/promises";
import { DocumentRoutesData } from "@/types/mdx";
import { cache } from "react";

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
