import { fetchAllBookingByRoom } from "@/app/actions/room.action";
import { BookingCard } from "@/components/BookingCard";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Bookings({ params }: { params: { id: string } }) {
     const session = await getServerSession(authOptions);
     if (!session?.user) redirect("/signin");

     const { bookingList } = await fetchAllBookingByRoom(params.id);
     
     return (
          <div className="flex flex-col w-full items-center gap-4">
               {bookingList?.length ? (
                    <>
                         <div className="flex md:justify-center my-4 lg:text-2xl text-xl font-bold text-gray-600">
                              All Bookings on {bookingList[0].name}
                         </div>
                         {bookingList?.map((booking) => (
                              <BookingCard key={booking.id} booking={booking} />
                         ))}
                    </>
               ) : (
                    <h1 className="text-2xl font-semibold text-destructive">
                         No booking available on this room!
                    </h1>
               )}
          </div>
     )
}