import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { toast } from "sonner";
import { authOptions } from "@/lib/auth/authOptions";
import { fetchRoomByOwner } from "@/app/actions/room.action";
import { Button } from "@/components/ui/button";
import { RentedRoomCard } from "@/components/RentedRoomCard";

export default async function RentedRooms() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signin");

  const { rooms, error } = await fetchRoomByOwner();
  if (error) {
    console.error(error);
    return toast.error(error || "Failed to fetch rooms");
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full md:container md:mx-auto px-4 my-6">
      <div className="relative w-full max-w-6xl">
        <Link href="/rooms/add" className="absolute right-0 top-0">
          <Button> Add New Room </Button>
        </Link>
        <h2 className="h2 w-1/2 md:w-full">Your all Rented Room are here</h2>
      </div>
      <div className="flex flex-col items-center gap-4 w-full">
        {rooms?.length ? (
          rooms.map((room) => <RentedRoomCard key={room.id} room={room} />)
        ) : (
          <div className="h2">
            You don&apos;t have any rented rooms currently!
          </div>
        )}
      </div>
    </div>
  );
}
