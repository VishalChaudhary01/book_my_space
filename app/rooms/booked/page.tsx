"use client";
import { cancelBooking, fetchAllBookedRooms } from "@/app/actions/room.action";
import { BookedRoomCard } from "@/components/BookedRoomCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BookedRooms() {
     const router = useRouter();
     const [bookedRooms, setBookedRooms] = useState<IBookedRoom[]>([]);
     const [loading, setLoading] = useState(true);
     const session = useSession();

     useEffect(() => {
          if (!session?.data?.user) {
               router.push("/signin");
               return;
          }
          const bookedRooms = async () => {
               const response = await fetchAllBookedRooms();
               if (response.success) {
                    setBookedRooms(response.bookedRooms)
               } else {
                    console.error(response);
                    toast.error(response.error || "Something went wrong");
               }
               setLoading(false);
          }
          bookedRooms();
     }, []);

     async function handleCancel (id: string) {
     }

     if (loading) return <div className="flex-center">Loading....</div>
     
     return (
          <div className="flex flex-col gap-4 relative">
               <div className="flex justify-center my-4 lg:text-2xl text-xl font-bold text-gray-700">
                    Your Booked Rooms are here
               </div>
               <div className="flex flex-col items-center gap-4">
                    <div className="flex-center flex-col w-full">
                         {bookedRooms?.length ? (
                              bookedRooms.map((room) => (
                                   <BookedRoomCard key={room.id} room={room} handleCancel={handleCancel} />
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