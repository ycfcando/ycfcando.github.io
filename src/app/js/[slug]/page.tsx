import MarkdownX from "@/modules/markdown-x";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="w-full flex justify-between">
      <MarkdownX name={slug} />
    </div>
  );
}

export function generateStaticParams() {
  return [{ slug: "01.类型检测" }];
}

export const dynamicParams = false;
