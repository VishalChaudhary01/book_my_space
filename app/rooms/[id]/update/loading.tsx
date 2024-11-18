import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingPage() {
     return (
     <div className="flex-center flex-col gap-4">
          <Skeleton className="h-80 w-full  md:w-1/2" />
          <Skeleton className="h-4 w-full md:w-1/2" />
          <Skeleton className="h-4 w-full md:w-1/2" />
          <Skeleton className="h-4 w-full md:w-1/2" />
     </div>
  )
}
