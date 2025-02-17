"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Edit, Trash } from "lucide-react";
import { deleteRoom } from "@/app/actions/room.action";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { RoomImage } from "./RoomImage";
import { Button } from "./ui/button";

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
    <div className="flex flex-col gap-4 md:flex-row items-center md:justify-between lg:gap-6 w-[340px] md:w-full md:max-w-6xl border border-purple-2 dark:border-dark-2 bg-purple-3/10 dark:bg-dark-3 rounded-lg p-4">
      <Link href={`/rooms/${room.id}`} className="flex gap-8 group">
        <div className="hidden md:block w-[200px] h-[130px] shrink-0 overflow-hidden">
          <RoomImage src={room.image} />
        </div>
        <div className="flex flex-col cursor-pointer p">
          <h4 className="h4 mb-2 group-hover:underline">{room.name}</h4>
          <span>
            <span className="font-medium text-base">Price: </span>
            {`Rs.${room.pricePerHour}/hour, Rs.${room.pricePerDay}/day, Rs.${room.pricePerMonth}/month`}
          </span>
          <span>
            <span className="font-medium text-base">Size: </span>
            {room.lengthInFeet}&times;{room.widthInFeet} square feet
          </span>
        </div>
      </Link>
      <div className="flex justify-between gap-4 md:flex-col md:justify-center lg:flex-row items-center w-full md:w-1/3">
        <Button
          onClick={() => router.push(`/rooms/rented/${room.id}`)}
          variant="secondary"
        >
          Totel Booking: {room.totalBooking}
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={() => router.push(`/rooms/${room.id}/update`)}
            variant="ghost"
            size="icon"
          >
            <Edit width={24} height={24} />
          </Button>
          <Button
            onClick={() => {
              setOpenDialog(true);
            }}
            variant="ghost"
            size="icon"
          >
            <Trash width={24} height={24} />
          </Button>
        </div>
      </div>
      {openDialog && (
        <ConfirmationDialog
          id={room.id}
          handleClick={handleDelete}
          open={openDialog}
          setOpen={setOpenDialog}
          title="Are you sure want to delete this room"
          buttonName="Yes"
        />
      )}
    </div>
  );
}
