import { Loader } from "@/components/Loader";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center gap-6 md:container md:mx-auto px-4 my-6">
      <Skeleton className="h-8 w-full max-w-xl rounded-full" />
      <Loader />
    </div>
  );
}
