import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return (
    <div className="flex justify-center items-center w-full md:container md:mx-auto">
      <div className="flex flex-col justify-center items-center gap-4 w-[340px] md:w-full md:max-w-2xl">
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
