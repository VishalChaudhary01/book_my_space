import { Loader } from "@/components/Loader";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex-center">
        <Skeleton className="h-8 w-full md:w-2/5 rounded-full my-4" />
      </div>
      <Loader />
    </div>
  );
}
