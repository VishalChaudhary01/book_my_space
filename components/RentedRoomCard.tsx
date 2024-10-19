"use client";
import Image from "next/image";
import { RoomImage } from "./RoomImage";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { deleteRoom } from "@/app/actions/room.action";
import { toast } from "sonner";

export function RentedRoomCard({ room }: { room: IRoom }) {
     const router = useRouter();
     const [openDialog, setOpenDialog] = useState(false);

     async function handleDelete(roomId: string) {
          const response = await deleteRoom(roomId);
          if (response.success) {
               toast.success("Room deleted successfully");
               router.refresh();
          } else {
               console.error(response);
               toast.error(response.error || "Soemthing went wrong");
          }
     }
     
     return (
          <div className="flex gap-4 border w-full lg:w-2/3 h-40 border-purple-2 shadow-md rounded-md p-2">
               <RoomImage src={room.image} w={200} h={200} />                    
               <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:w-3/4 text-base text-gray-700 px-4">
                    <Link href={`/rooms/${room.id}`} className="flex flex-col cursor-pointer">
                         <span className="font-semibold">{room.name}</span>
                         <span><span className="font-semibold">Price: </span>{room.price} $/hour</span>
                         <span><span className="font-semibold">Size: </span>{room.lengthInFeet}&times;{room.widthInFeet} square feet</span>
                    </Link>
                    <div className="flex items-center py-4">
                         <Button onClick={() => router.push(`/rooms/rented/${room.id}`)} variant="ghost">Totel Booking: {room.totalBooking}</Button>
                         <Button onClick={() => router.push(`/rooms/${room.id}/update`)} variant="ghost" size="icon"><Image src="/icons/update.svg" width={24} height={24} alt="update" /></Button>
                         <Button onClick={() => {
                              setOpenDialog(true);
                         }} variant="ghost" size="icon"><Image src="/icons/remove.svg" width={24} height={24} alt="remove" /></Button>
                    </div>
               </div>
               {openDialog && (
                    <ConfirmationDialog id={room.id} handleClick={handleDelete} open={openDialog} setOpen={setOpenDialog} header="Are you sure want to delete this room" buttonName="Yes" />
               )}
          </div>
     )
}