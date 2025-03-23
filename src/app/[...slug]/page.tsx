// "use server";

// import { join } from "node:path";
import MDXServerBuild from "@/modules/mdx-server-build";
// import { getFolderFiles } from "@/lib/file";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const filePath = decodeURIComponent(slug.join("/"));

  return (
    <div className="grid col-span-5 grid-cols-6 relative">
      <MDXServerBuild path={filePath} />
    </div>
  );
}

// export async function generateStaticParams() {
//   const filenames = await getFolderFiles(
//     join(process.cwd(), "src", "mdx", "javascript")
//   );

//   return filenames.map((filename) => ({
//     slug: [filename],
//   }));
// }

// export const dynamicParams = false;
