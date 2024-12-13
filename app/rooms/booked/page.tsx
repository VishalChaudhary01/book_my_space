import { fetchAllBookedRooms } from "@/app/actions/room.action";
import { BookedRoomCard } from "@/components/BookedRoomCard";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function BookedRooms() {
     const session = await getServerSession(authOptions);
     if (!session?.user) redirect("/signin");

     const { bookedRooms } = await fetchAllBookedRooms();
     
     return (
          <div className="flex flex-col gap-6 relative md:container md:mx-auto px-4">
               <h2 className="flex items-center justify-center mt-6 h2">
                    Your Booked Rooms are here
               </h2>
               <div className="flex flex-col items-center gap-4">
                    <div className="flex-center flex-col w-full">
                         {bookedRooms?.length ? (
                              bookedRooms.map((room) => (
                                   <BookedRoomCard key={room.id} bookedRoom={room} />
                              ))
                         ) : (
                              <div className="text-xl font-bold text-red-700">
                                   You don&apos;t have booked any room yet!
                              </div>
                         )}
                    </div>
               </div>
          </div>
     )
}