import { fetchRoomByOwner } from "@/app/actions/room.action";
import { RentedRoomCard } from "@/components/RentedRoomCard";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function RentedRooms() {
     const session = await getServerSession(authOptions);
     if (!session?.user) redirect("/signin");

     const { rooms, error } = await fetchRoomByOwner();
     if (error) {
          console.error(error);
          return toast.error(error || "Failed to fetch rooms");
     }

     return (
          <div className="flex flex-col gap-4 relative">
               <Link href="/rooms/add" className="absolute right-0 top-4">
                    <Button> Add New Room </Button>
               </Link>
               <div className="flex md:justify-center my-4 md:text-2xl text-lg font-bold text-gray-700">
                    Your all Rented Room are here
               </div>
               <div className="flex flex-col items-center gap-4">
                    {rooms?.length ? (
                         rooms.map((room) => (
                              <RentedRoomCard key={room.id} room={room} />
                         ))
                    ) : (
                         <div className="text-xl font-bold text-red-700">
                              You don&apos;t have any rented rooms currently!
                         </div>
                    )}
               </div>
          </div>
     )
}
