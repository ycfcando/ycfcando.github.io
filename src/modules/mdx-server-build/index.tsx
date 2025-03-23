"use server";

import AnchorList from "@/modules/anchor-list-no-data";

interface IProps {
  path: string;
}

export default async function MDXServerBuild({ path }: IProps) {
  const { default: MDXComponent } = await import(`@/mdx/${path}.mdx`);

  return (
    <>
      <div className="col-span-5 p-4">
        <div
          id="mdx"
          className="w-full prose dark:prose-invert prose-neutral m-auto max-w-4xl typography"
        >
          <MDXComponent />
        </div>
      </div>
      <AnchorList />
    </>
  );
}
