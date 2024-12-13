import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return (
     <div className="flex flex-col gap-2 md:container md:mx-auto px-4 my-6">
          <Skeleton className="h-12 md:w-1/2" />
          <Skeleton className="h-4 md:w-1/2" />
          <div className="flex flex-col md:flex-row gap-6 justify-between">
               <Skeleton className="h-80 w-full  md:w-1/2" />
               <Skeleton className="h-80 w-full  md:w-1/2" />
          </div>
          <Skeleton className="h-4 md:w-1/2" />
          <Skeleton className="h-4 md:w-1/2" />
     </div>
  );
}
