import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex-center">
        <Skeleton className="h-8 w-full md:w-2/5 rounded-full my-4" />
      </div>
      {[1, 2, 3, 4].map((room) => (
        <div className="flex gap-8 border-2 border-gray-100 rounded-md p-2" key={room}>
          <Skeleton className="h-40 w-40 rounded-md" />
          <div className="flex flex-col justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]  md:w-[300px]" />
              <Skeleton className="h-4 w-[150px] md:w-[250px]" />
              <Skeleton className="h-4 w-[150px] md:w-[250px]" />
            </div>
            <Skeleton className="h-8 w-[150px] md:w-[250px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
