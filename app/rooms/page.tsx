import { Suspense } from "react";
import { Rooms } from "@/components/Rooms";
import { Loader } from "@/components/Loader";
import { SearchBar } from "@/components/SearchBar";

export default function RoomsPage({ searchParams }: RoomsPageProps) {
  return (
    <div className="flex flex-col items-center gap-6 md:container md:mx-auto px-4 my-6">
      <SearchBar searchParams={searchParams} />
      <Suspense fallback={<Loader />}>
        <Rooms searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
