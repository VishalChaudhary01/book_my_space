import { fetchAllBookingByRoom } from "@/app/actions/room.action";
import { BookingCard } from "@/components/BookingCard";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function Bookings({ params }: { params: { id: string } }) {
     const session = await getServerSession(authOptions);
     if (!session?.user) redirect("/signin");

     const { bookingList, error } = await fetchAllBookingByRoom(params.id);
     if (error) {
          console.error(error);
          return toast.error(error || "Something went wrong");
     }
     
     return (
          <div className="flex flex-col w-full items-center gap-4">
               {bookingList?.length ? (
                    bookingList.map((booking) => (
                         <BookingCard booking={booking} />
                    ))
               ) : (
                    <div>
                         No booking available on this room
                    </div>
               )}
          </div>
     )
}