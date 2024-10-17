"use client";
import { deleteRoom, fetchRoomByOwner } from "@/app/actions/room.action";
import { RentedRoomCard } from "@/components/RentedRoomCard";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RentedRooms() {
     const session = useSession();
     const router = useRouter();
     const [roomList, setRoomList] = useState<IRoom[]>([]);
     const [loading, setLoading] = useState(true);
     
     useEffect(() => {
          if (!session?.data?.user) {
               router.push("/signin");
               return;
          }
          const getAllRooms = async () => {
               const response = await fetchRoomByOwner();
               if (response.success) {
                    setRoomList(response.rooms);
               } else {
                    console.error(response);
                    return toast.error(response.error || "Failed to fetch rooms");
               }
               setLoading(false);
          }
          getAllRooms();
     }, []);

     async function handleDelete(roomId: string) {
          const response = await deleteRoom(roomId);
          if (response.success) {
               toast.success("Room deleted successfully");
               setRoomList(roomList => roomList.filter(room => room.id !== roomId));
               router.refresh();
          } else {
               console.error(response);
               toast.error(response.error || "Soemthing went wrong");
          }
          router.refresh();
     }

     if (loading) return <div className="flex-center">Loading....</div>

     return (
          <div className="flex flex-col gap-4 relative">
               <Button onClick={() => router.push('/rooms/add')} className="absolute right-0 top-4 bg-purple-1 hover:bg-purple-3">Add New Room</Button>
               <div className="flex lg:justify-center md:justify-center my-4 lg:text-2xl text-xl font-bold text-gray-700">
                    Your all Rented Room are here
               </div>
               <div className="flex flex-col items-center gap-4">
                    <div className="flex-center flex-col w-full">
                         {roomList?.length ? (
                              roomList.map((room) => (
                                   <RentedRoomCard key={room.id} room={room} handleDelete={handleDelete} />
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