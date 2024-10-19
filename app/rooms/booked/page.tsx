import { fetchAllBookedRooms } from "@/app/actions/room.action";
import { BookedRoomCard } from "@/components/BookedRoomCard";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function BookedRooms() {
     const session = await getServerSession(authOptions);
     if (!session?.user) redirect("/signin");

     const { bookedRooms, error } = await fetchAllBookedRooms();
     if (error) {
          console.error(error);
          toast.error(error || "Error while fetching booked rooms");
     }
     
     return (
          <div className="flex flex-col gap-4 relative">
               <div className="flex justify-center my-4 lg:text-2xl text-xl font-bold text-gray-700">
                    Your Booked Rooms are here
               </div>
               <div className="flex flex-col items-center gap-4">
                    <div className="flex-center flex-col w-full">
                         {bookedRooms?.length ? (
                              bookedRooms.map((room) => (
                                   <BookedRoomCard key={room.id} bookedRoom={room} />
                              ))
                         ) : (
                              <div className="text-xl font-bold text-red-700">
                                   You don't have booked any room yet!
                              </div>
                         )}
                    </div>
               </div>
          </div>
     )
}