"use server";

import AnchorList from "@/modules/anchor-list-no-data";

interface IProps {
  name: string;
}

export default async function MarkdownX({ name }: IProps) {
  const { default: Component } = await import(`md/${name}.mdx`);

  return (
    <>
      <div
        id="markdown-x"
        className="prose dark:prose-invert prose-neutral m-auto max-w-4xl typography pt-6"
      >
        <Component />
      </div>
      <AnchorList />
    </>
  );
}
