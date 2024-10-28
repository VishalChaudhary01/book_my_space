"use client";
import { RoomImage } from "./RoomImage";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { getStatusName } from "@/lib/utils";
import { cancelBooking } from "@/app/actions/room.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getStatusColor } from "./BookingCard";

export function BookedRoomCard({ bookedRoom }: { bookedRoom: IBookedRoom }) {
     const router = useRouter();
     const [openDialog, setOpenDialog] = useState(false);

     async function handleCancel (bookingId: string) {
          const response = await cancelBooking(bookingId);
          if (response.success) {
               toast.success("Booking Cancelled");
               router.refresh();
          } else {
               console.error(response);
               toast.error(response.error || "Something went wrong, Please try again!");
          }
     }
     
     return (
          <div className="grid grid-cols-3 lg:grid-cols-4 md:grid-cols-4 w-full border border-purple-2 rounded-md p-2">
               <div className="col-span-1 flex flex-col gap-2">
                    <Link href={`/rooms/${bookedRoom.roomId}`} >
                         <RoomImage src={bookedRoom.image} w={150} h={150}/>
                    </Link>
                    <div className="lg:hidden md:hidden flex items-center gap-2">
                         <span className={`px-2 py-1 rounded-md text-gray-700 text-sm font-medium ${getStatusColor(bookedRoom.status)}`}>
                              {getStatusName(bookedRoom.status)}
                         </span>
                         <Button onClick={() => {
                              setOpenDialog(true);
                         }}
                         variant={"secondary"}
                         disabled={bookedRoom.status === "CANCEL" || bookedRoom.status === "SUCCESS"}
                         >
                              Cancel
                         </Button>
                    </div>
               </div>
               <div className="col-span-2 flex flex-col text-sm md:text-base lg:text-base text-gray-700 px-4">
                    <span className="font-semibold">{bookedRoom.name}</span>
                    <span><span className="font-semibold">Total Payable Amount: </span>Rs.{bookedRoom.price}</span>
                    {bookedRoom.status !== "CANCEL" && (
                         <>
                         <span><span className="font-semibold">Checkin Time: </span>{`${bookedRoom.checkInTime.toLocaleTimeString()} - ${bookedRoom.checkInTime.toLocaleDateString()}`}</span>
                         <span><span className="font-semibold">Chekout Time: </span>{`${bookedRoom.checkOutTime.toLocaleTimeString()} - ${bookedRoom.checkOutTime.toLocaleDateString()}`}</span>
                         </>
                    )}
               </div>
               <div className="hidden lg:flex md:flex items-center justify-between gap-4 px-4">
                    <div className={`px-2 py-1 rounded-md text-gray-700 text-sm font-medium ${getStatusColor(bookedRoom.status)}`}>
                         <span>Status: </span>
                         <span>{getStatusName(bookedRoom.status)}</span>
                    </div>
                    <Button onClick={() => {
                         setOpenDialog(true);
                    }}
                    variant={"secondary"}
                    disabled={bookedRoom.status === "CANCEL" || bookedRoom.status === "SUCCESS"}
                    >
                         Cancel
                    </Button>
               </div>
               {openDialog && (
                    <ConfirmationDialog handleClick={handleCancel} open={openDialog} setOpen={setOpenDialog} id={bookedRoom.id} buttonName="Yes, Cancel Booking" title="Are you sure want to cancel thie booking" />
               )}
          </div>
     )
}