import { fetchRoomById } from "@/app/actions/room.action";
import { BookingForm } from "@/components/BookingForm";
import { RoomImage } from "@/components/RoomImage";

export default async function RoomDetails({ params }: { params: { id: string } }) {
  const { room } = await fetchRoomById(params.id);

  return (
    <div className="container mx-auto">
      {room ? (
        <div className="flex flex-col p-4 w-full ">
          <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold first-letter:uppercase text-black/90 dark:text-dark-1">{room.name}</h2>
          <div className="flex flex-col text-base lg:text-lg font-medium">
            <h4 className="h4">
              {`Price: Rs.${room.pricePerHour}/hour, Rs.${room.pricePerDay}/day, Rs.${room.pricePerMonth}/month`}
            </h4>
            <h4 className="h4">
              Size: {room.lengthInFeet}&times;{room.widthInFeet} square feet
            </h4>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2 h-fit overflow-hidden shrink-0">
              <RoomImage src={room.image} />
            </div>
            <div className="md:w-1/2">
              <div className="h2 bg-purple-2 dark:bg-dark-2 px-4 py-2 rounded-md">
                Book Now
              </div>
              <BookingForm roomId={room.id} />
            </div>
          </div>
          <p className="p py-2">
            <span className="text-lg font-semibold">Addresss: </span>
            {room.address}, {room.city}, {room.state}, {room.pin}
          </p>
          <p className="p">
            <span className="text-xl font-bold">Description: </span>
            {room.description}
          </p>
        </div>
      ) : (
        <div className="h2">
          Room not found
        </div>
      )}
    </div>
  );
}