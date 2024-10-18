
"use client";
import { RoomImage } from "./RoomImage";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import { ConfirmationDialog } from "./ConfirmationDialog";

export function BookedRoomCard({ room, handleCancel }: { room: IBookedRoom, handleCancel: (id: string) => void }) {
     const [openDialog, setOpenDialog] = useState(false);
     const [cancelId, setCancelId] = useState("");
     
     return (
          <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 grid-flow-row w-full border border-purple-2 rounded-md p-2">
               <div className="flex flex-col gap-2">
                    <Link href={`/rooms/${room.id}`} >
                         <RoomImage src={room.image} w={150} h={150}/>
                    </Link>
                    <div className="lg:hidden md:hidden flex items-center gap-4 px-4">
                         <Button onClick={() => {
                              setCancelId(room.id);
                              setOpenDialog(true);
                         }} className="bg-purple-1 hover:bg-purple-3">
                              Cancel
                         </Button>
                    </div>
               </div>
               <div className="lg:col-span-2 md:col-span-2 flex flex-col text-base text-gray-700 px-4">
                    <span className="font-semibold">{room.name}</span>
                    <span><span className="font-semibold">Price: </span>{room.price} $/hour</span>
                    <span><span className="font-semibold">Checkin Time: </span>{`${room.checkInTime.toLocaleTimeString()} - ${room.checkInTime.toLocaleDateString()}`}</span>
                    <span><span className="font-semibold">Chekout Time: </span>{`${room.checkOutTime.toLocaleTimeString()} - ${room.checkOutTime.toLocaleDateString()}`}</span>
               </div>
               <div className="hidden lg:flex md:flex items-center gap-4 px-4">
                    <Button onClick={() => {
                         setCancelId(room.id);
                         setOpenDialog(true);
                    }} className="bg-purple-1 hover:bg-purple-3">
                         Cancel
                    </Button>
               </div>
               {(openDialog && cancelId) && (
                    <ConfirmationDialog handleClick={handleCancel} open={openDialog} setOpen={setOpenDialog} roomId={cancelId} buttonName="Cancel Booking" header="Are you sure want to cancel thie booking" />
               )}
          </div>
     )
}