"use server";

import { Sidebar } from "@/modules/sidebar";

export default async function MDXLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugDecodes = slug.map((slugText) => decodeURIComponent(slugText));

  return (
    <>
      <Sidebar slug={slugDecodes} />
      {children}
    </>
  );
}
