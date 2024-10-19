"use client";
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { UpdateBookingForm } from "./UpdateStatusDialog";

export function BookingCard({ booking }: { booking: IBookedRoom}) {
     const [openDialog, setOpenDialog] = useState(false);

     return (
          <div className="flex flex-col lg:flex-row w-full lg:items-center justify-between border border-purple-2 rounded-md shadow-sm text-base text-gray-700 px-4 py-2">
               <span className="font-semibold">{booking.user.name}</span>
               <div className="flex flex-col">
               <span><span className="font-semibold">Checkin Time: </span>{`${booking.checkInTime.toLocaleTimeString()} - ${booking.checkInTime.toLocaleDateString()}`}</span>
               <span><span className="font-semibold">Chekout Time: </span>{`${booking.checkOutTime.toLocaleTimeString()} - ${booking.checkOutTime.toLocaleDateString()}`}</span>
               </div>
               <div className="flex flex-col">
                    <span><span className="font-semibold">Price per hour: </span>{booking.price} $/hour</span>
                    <span><span className="font-semibold">Total payable amount: </span>{((booking.checkOutTime.getTime() - booking.checkInTime.getTime()) / (1000 * 60 * 60)) * (booking.price)}$</span>
               </div>
               <Button onClick={() => {
                    setOpenDialog(true)
               }} 
               disabled={ booking.status==="Cancel" || booking.status === "Success" }
               variant="secondary"
               className={`mt-2 lg:mt-0 ${getStatusColor(booking.status)}`}>
                    Status: {booking.status}
               </Button>
               {(openDialog && booking.id) && (
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                         <DialogContent className="sm:max-w-[425px] flex-center flex-col">
                              <UpdateBookingForm id={booking.id} setOpen={setOpenDialog} status={booking.status as ("Success" | "Confirm" | "Pending")} />
                         </DialogContent>
                    </Dialog>
               )}
          </div>
     )
}


// Get Color based on Status
export function getStatusColor(status: string) {
     switch (status) {
       case "Confirm":
         return "bg-yellow-200";
       case "Success":
         return "bg-green-200";
       case "Cancel":
         return "bg-gray-200"
       default:
         return "bg-purple-2";
     }
}