import { getAllMDXSlugs } from "@/lib/file";
import {
  MDXForBuild,
  MDXContainer,
  MDXAnchorList,
  MDXHeader,
} from "@/modules/mdx-server-build";
import AnchorList from "@/modules/anchor-list";

const slugs = await getAllMDXSlugs();

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugDecode = slug?.map((slugItem) => decodeURIComponent(slugItem));

  const { isMDX, MDXComponent, headings, frontmatter } = await (async () => {
    const currentSlug = slugs.find((slugItem) => {
      const isEvery = slugItem.slug.every((path) => slugDecode.includes(path));

      return slugDecode.length === slugItem.slug.length && isEvery;
    });
    if (currentSlug) {
      const {
        default: MDXComponent,
        frontmatter,
        headings,
      } = await import(`../../../mdx/${decodeURIComponent(slug.join("/"))}.mdx`);
      return {
        isMDX: true,
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
  return slugs;
}
