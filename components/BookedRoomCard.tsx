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
          <div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-4 w-[340px] md:w-full md:max-w-6xl border border-purple-2 dark:border-dark-2 bg-purple-3/10 dark:bg-dark-3 rounded-md p-4">
               <Link href={`/rooms/${bookedRoom.roomId}`} className="flex gap-8 group">
                    <div className="hidden md:block w-[200px] h-[130px] overflow-hidden shrink-0">
                         <RoomImage src={bookedRoom.image} />
                    </div>
                    <div className="flex flex-col p">
                         <h4 className="h4">{bookedRoom.name}</h4>
                         <span><span className="text-base font-medium">Total Payable Amount: </span>Rs.{bookedRoom.price}</span>
                         {bookedRoom.status !== "CANCEL" && (
                              <>
                              <span><span className="text-base font-medium">Checkin Time: </span>{`${bookedRoom.checkInTime.toLocaleTimeString()} - ${bookedRoom.checkInTime.toLocaleDateString()}`}</span>
                              <span><span className="text-base font-medium">Chekout Time: </span>{`${bookedRoom.checkOutTime.toLocaleTimeString()} - ${bookedRoom.checkOutTime.toLocaleDateString()}`}</span>
                              </>
                         )}
                    </div>
               </Link>
               <div className="flex justify-between md:justify-end items-center gap-2">
                    <div className={`p-2 rounded-md text-black text-sm font-medium ${getStatusColor(bookedRoom.status)}`}>
                         {`Status: ${getStatusName(bookedRoom.status)}`}
                    </div>
                    <Button onClick={() => setOpenDialog(true)}
                    disabled={bookedRoom.status === "CANCEL" || bookedRoom.status === "SUCCESS"}
                    className="w-1/3"
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