import { fetchRoomByOwner } from "@/app/actions/room.action";
import { AddNewRoomButton } from "@/components/AddNewRoomButton";
import { RentedRoomCard } from "@/components/RentedRoomCard";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
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
               <AddNewRoomButton />
               <div className="flex lg:justify-center md:justify-center my-4 lg:text-2xl text-xl font-bold text-gray-700">
                    Your all Rented Room are here
               </div>
               <div className="flex flex-col items-center gap-4">
                    <div className="flex-center flex-col w-full">
                         {rooms?.length ? (
                              rooms.map((room) => (
                                   <RentedRoomCard key={room.id} room={room} />
                              ))
                         ) : (
                              <div className="text-xl font-bold text-red-700">
                                   You don't have any rented rooms currently!
                              </div>
                         )}
                    </div>
               </div>
          </div>
     )
}
