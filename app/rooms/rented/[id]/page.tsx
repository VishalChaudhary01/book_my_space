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
    <div className="flex flex-col w-full items-center gap-4 md:container md:mx-auto mt-4">
      {bookingList?.length ? (
        <div className="w-[340px] md:w-full md:max-w-6xl space-y-6">
          <div className="h2">
            All Bookings on <span className="dark:text-purple-3/90 text-purple-4/90">{bookingList[0].name}</span>
          </div>
          {bookingList?.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <h1 className="h2">No booking available on this room!</h1>
      )}
    </div>
  );
}