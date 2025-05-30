import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid h-full relative col-span-5 row-span-3 grid-cols-18">
      <div className="grid py-5 px-6 col-span-14 overflow-hidden relative">
        <div className="col-span-full">
          <div className="flex w-full border-b pb-1">
            <div className="grow-1">
              <h2 className="mt-0 mb-0 pb-2 text-3xl font-semibold tracking-tight transition-colors">
                <Skeleton className="h-8 w-[150px]" />
              </h2>
              <div className="flex gap-3">
                <Skeleton className="h-4 w-[250px]" />
              </div>
            </div>
            <div>
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>
        </div>
        <div className="col-span-full overflow-y-auto hidden-scroll transition-transform duration-300">
          <div className="flex flex-col space-y-3 mt-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <Skeleton className="h-8 w-[50%]" />
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-6 px-4 col-span-4">
        <ul className="grid grid-cols-1 gap-2">
          {[...Array(10)].map((_, index) => (
            <li key={index} className="col-span-1">
              <Skeleton className="h-4 w-full" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
