import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const getMenus = async function () {
  const menusPath = join(process.cwd(), "src", "app", "menus.json");
  const menusJson = await readFile(menusPath, "utf-8");
  const menus = JSON.parse(menusJson);

  return menus;
};
