"use client";
import { Button } from "./ui/button";
import { useState } from "react";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { updateStatus } from "@/app/actions/room.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getStatusName } from "@/lib/utils";

export function BookingCard({ booking }: { booking: IBookedRoom}) {
     const router = useRouter();
     const [openDialog, setOpenDialog] = useState(false);
     async function handleUpdate(id: string) {
          const response = await updateStatus({ bookingId: id, status: "SUCCESS"});
          if (response.success) {
               toast.success("Status updated");
               router.refresh();
          } else {
               console.error(response.error);
               toast.error(response.error || "Something went wrong, Please try again!");
          }
     }

     return (
          <div className="flex flex-col lg:flex-row w-full lg:items-center justify-between border border-purple-2 bg-purple-2/15 rounded-md shadow-sm text-base text-gray-700 px-4 py-2">
               <span className="font-semibold">{booking.user.name}</span>
               <div className="flex flex-col">
               <span><span className="font-semibold">Checkin Time: </span>{`${booking.checkInTime.toLocaleTimeString()} - ${booking.checkInTime.toLocaleDateString()}`}</span>
               <span><span className="font-semibold">Chekout Time: </span>{`${booking.checkOutTime.toLocaleTimeString()} - ${booking.checkOutTime.toLocaleDateString()}`}</span>
               </div>
               <div className="flex flex-col">
                    <span><span className="font-semibold">Total Payable Amount </span>Rs.{booking.price}</span>
               </div>
               <Button onClick={() => {
                    setOpenDialog(true)
               }} 
               disabled={ booking.status==="CANCEL" || booking.status === "SUCCESS" }
               variant="secondary"
               className={`mt-2 lg:mt-0 ${getStatusColor(booking.status)}`}>
                    {`Status: ${getStatusName(booking.status)}`}
               </Button>
               {(openDialog && booking.id) && (
                    <ConfirmationDialog handleClick={() => handleUpdate(booking.id)} open={openDialog} setOpen={setOpenDialog} id={booking.id} buttonName="Yes, Booking Successful" title="Mark as successfull booking!" desc="Are you sure want to mark as successfull to this booking" />
               )}
          </div>
     )
}

// Get Color based on Status
export function getStatusColor(status: string) {
     switch (status) {
       case "CENCEL":
         return "bg-red-200";
       case "SUCCESS":
         return "bg-green-200"
       default:
         return "bg-purple-2";
     }
}