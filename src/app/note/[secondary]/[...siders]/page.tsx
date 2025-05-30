import { getNote } from "@/lib/server/api";
import MDX from "./mdx";

export default async function Page({
  params,
}: {
  params: Promise<{ secondary: string; siders: Array<string> }>;
}) {
  const { secondary, siders } = await params;

  const mdxSourcePromise = getNote(`/${secondary}/${siders.join("/")}`);

  return <MDX promise={mdxSourcePromise} />;
}
