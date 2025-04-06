import {
  MDXForBuild,
  MDXContainer,
  MDXAnchorList,
  MDXHeader,
} from "@/modules/mdx-server-build";
import AnchorList from "@/modules/anchor-list";
import { getDocumentRoutesData } from "@/lib/file";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const routesData = await getDocumentRoutesData();
  const { slug } = await params;
  const slugDecode = slug?.map((slugItem) => decodeURIComponent(slugItem));

  const { isMDX, MDXComponent, headings, frontmatter } = await (async () => {
    const route = routesData.find((item) => {
      const isEvery = item.slug?.every((value) => slugDecode.includes(value));
      return item.slug && slugDecode.length === item.slug.length && isEvery;
    });

    if (route && route.isMDX) {
      const {
        default: MDXComponent,
        frontmatter,
        headings,
      } = await import(`../../../mdx${route.relativePath}.mdx`);

      return {
        isMDX: route.isMDX,
        MDXComponent,
        frontmatter,
        headings,
      };
    }

    return { isMDX: false, MDXComponent: null };
  })();

  return (
    <div className="grid col-span-5 grid-cols-6 relative">
      {isMDX && (
        <MDXForBuild>
          <MDXContainer mdxFn={() => <MDXComponent />}>
            <MDXHeader frontmatter={frontmatter} />
          </MDXContainer>
          <MDXAnchorList>{<AnchorList headings={headings} />}</MDXAnchorList>
        </MDXForBuild>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const routesData = await getDocumentRoutesData();
  const slugs = routesData
    .filter(({ isMDX }) => isMDX)
    .map(({ slug }) => ({
      slug,
    }));

  return slugs;
}
