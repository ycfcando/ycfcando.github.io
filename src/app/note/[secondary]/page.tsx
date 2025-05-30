export default async function Page({
  params,
}: {
  params: Promise<{ secondary: string }>;
}) {
  const { secondary } = await params;

  return (
    <div className="grid h-full relative col-span-5 row-span-3 grid-cols-18">
      {secondary}
    </div>
  );
}
