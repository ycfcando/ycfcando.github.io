"use server";

import MDXServer from "@/modules/mdx-server-build";

export default async function Page() {
  return (
    <div className="w-full flex justify-between">
      <MDXServer name={"demo"} />
    </div>
  );
}
