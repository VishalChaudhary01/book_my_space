"use client";
import Image from "next/image";
import { RoomImage } from "./RoomImage";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function RentedRoomCard({ room, handleDelete }: { room: IRoom, handleDelete: (id: string) => void }) {
     const router = useRouter();
     const [openDialog, setOpenDialog] = useState(false);
     const [deleteId, setDeleteId] = useState("");
     
     return (
          <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 grid-flow-row w-full border border-purple-2 rounded-md p-2">
               <div className="flex flex-col gap-2">
                    <Link href={`/rooms/${room.id}`} >
                         <RoomImage src={room.image} w={150} h={150}/>
                    </Link>
                    <div className="lg:hidden md:hidden flex items-center gap-4 px-4">
                         <Button onClick={() => router.push(`/rooms/${room.id}/update`)} variant="ghost" size="icon"><Image src="/icons/update.svg" width={28} height={28} alt="update" /></Button>
                         <Button onClick={() => {
                              setDeleteId(room.id);
                              setOpenDialog(true)
                         }} variant="ghost" size="icon"><Image src="/icons/remove.svg" width={28} height={28} alt="remove" /></Button>
                    </div>
               </div>
               <div className="lg:col-span-2 md:col-span-2 flex flex-col text-base text-gray-700 px-4">
                    <span className="font-semibold">{room.name}</span>
                    <span><span className="font-semibold">Price: </span>{room.price} $/hour</span>
                    <span><span className="font-semibold">Size: </span>{room.lengthInFeet} &times; {room.widthInFeet} square feet</span>
                    <span className=""><span className="font-semibold">Address: </span><span>{`${room.address}, ${room.city}, ${room.state}, ${room.pin}`}</span></span>
               </div>
               <div className="hidden lg:flex md:flex items-center gap-4 px-4">
                    <Button onClick={() => router.push(`/rooms/${room.id}/update`)} variant="ghost" size="icon"><Image src="/icons/update.svg" width={28} height={28} alt="update" /></Button>
                    <Button onClick={() => {
                         setDeleteId(room.id);
                         setOpenDialog(true);
                    }} variant="ghost" size="icon"><Image src="/icons/remove.svg" width={28} height={28} alt="remove" /></Button>
               </div>
               {(openDialog && deleteId) && (
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent className="sm:max-w-[425px] flex-center flex-col">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-600">Are you sure want to delete this room</DialogTitle>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={() => {
                         handleDelete(deleteId);
                         setOpenDialog(false);
                        }} type="submit" className="bg-purple-1 hover:bg-purple-3">Delete</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
               )}
          </div>
     )
}