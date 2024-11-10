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
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-4 w-full border border-purple-2 bg-purple-2/15 rounded-md p-2">
               <Link href={`/rooms/${room.id}`} className="flex gap-8 group">
                    <div className="hidden md:block w-[200px] h-[130px] shrink-0 overflow-hidden">
                         <RoomImage src={room.image} /> 
                    </div>
                    <div className="flex flex-col text-sm lg:text-base cursor-pointer text-gray-700">
                         <h2 className="text-lg lg:text-xl mb-2 font-semibold group-hover:underline">{room.name}</h2>
                         <span><span className="font-semibold">Price: </span>{`Rs.${room.pricePerHour}/hour, Rs.${room.pricePerDay}/day, Rs.${room.pricePerMonth}/month`}</span>
                         <span><span className="font-semibold">Size: </span>{room.lengthInFeet}&times;{room.widthInFeet} square feet</span>
                    </div>
               </Link>                   
               <div className="flex justify-between md:flex-col md:justify-center lg:flex-row items-center gap-4 w-full md:w-1/3 text-base text-gray-700">
                    <Button onClick={() => router.push(`/rooms/rented/${room.id}`)} variant="outline">Totel Booking: {room.totalBooking}</Button>
                    <div className="flex gap-2">
                         <Button onClick={() => router.push(`/rooms/${room.id}/update`)} variant="ghost" size="icon"><Image src="/icons/update.svg" width={24} height={24} alt="update" /></Button>
                         <Button onClick={() => {
                              setOpenDialog(true);
                         }} variant="ghost" size="icon"><Image src="/icons/remove.svg" width={24} height={24} alt="remove" /></Button>
                    </div>
               </div>
               {openDialog && (
                    <ConfirmationDialog id={room.id} handleClick={handleDelete} open={openDialog} setOpen={setOpenDialog} title="Are you sure want to delete this room" buttonName="Yes" />
               )}
          </div>
     )
}