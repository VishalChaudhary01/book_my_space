import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return (
    <div className="flex flex-col w-full items-center gap-4 container mx-auto mt-4">
      <div className="flex-center w-full">
        <Skeleton className="h-8 w-[340px] md:w-full md:max-w-xl rounded-full my-4" />
      </div>
      {[1, 2, 3, 4].map((room) => (
        <div
          className="flex justify-between items-center gap-8 w-[340px] md:w-full md:max-w-6xl border-2 border-gray-100 dark:border-dark-2 rounded-md p-2"
          key={room}
        >
          <Skeleton className="h-4 w-[200px] md:w-[300px]" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[150px] md:w-[250px]" />
            <Skeleton className="h-4 w-[150px] md:w-[250px]" />
          </div>
          <Skeleton className="h-4 w-[150px] md:w-[200px]" />
          <Skeleton className="h-4 w-[150px] md:w-[200px]" />
        </div>
      ))}
    </div>
  );
}
