"use server";

import { Sidebar } from "@/modules/sidebar";
import type { ParentSiderInterface } from "@/modules/sidebar";
import { getFolderNames, getFolderFilenames } from "@/lib/file";
import { join } from "node:path";

export default async function MDXLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugDecodes = slug.map((slugText) => decodeURIComponent(slugText));
  const dirnames = await getFolderNames(
    join(process.cwd(), "src", "mdx", slug?.[0])
  );

  const siders = await dirnames.reduce(
    (pre, next) =>
      pre.then(async (value) => {
        const filenames = await getFolderFilenames(
          join(process.cwd(), "src", "mdx", slug[0], next)
        );

        value.push({
          text: next,
          children: filenames.map((filename) => ({
            text: filename,
            path: `/${slug[0]}/${next}/${filename}`,
          })),
        });

        return value;
      }),
    Promise.resolve<ParentSiderInterface[]>([])
  );

  return (
    <>
      <Sidebar siders={siders} slug={slugDecodes} />
      {children}
    </>
  );
}
