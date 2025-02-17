import Link from "next/link";
import { RoomImage } from "@/components/RoomImage";
import { fetchAllRooms } from "@/app/actions/room.action";
import { Button } from "@/components/ui/button";
import { PaginationBar } from "./PaginationBar";

export async function Rooms({ searchParams }: RoomsProps) {
  const { rooms, totalRooms } = await fetchAllRooms({
    page: searchParams?.page,
    search: searchParams?.search,
  });

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {rooms?.length ? (
        rooms.map((room) => (
          <Link
            href={`/rooms/${room.id}`}
            key={room.id}
            className="flex flex-col md:flex-row gap-2 md:gap-8 bg-purple-3/10 dark:bg-dark-3 border dark:border-dark-2 border-purple-3/5 rounded-lg p-4 md:w-full max-w-6xl"
          >
            <div className="w-full h-[180px] md:w-[250px] md:h-[150px] overflow-hidden shrink-0">
              <RoomImage src={room.image} />
            </div>
            <div className="flex flex-col gap-4 justify-between p">
              <div className="flex flex-col">
                <span className="h4">{room.name}</span>
                <span>
                  <span className="font-medium text-base">Price: </span>
                  {`Rs.${room.pricePerHour}/hour, Rs.${room.pricePerDay}/day, Rs.${room.pricePerMonth}/month`}
                </span>
                <span>
                  <span className="font-medium text-base">Size: </span>
                  {room.lengthInFeet}×{room.widthInFeet} square feet
                </span>
                <span>
                  <span className="font-medium text-base">Address: </span>
                  {room.address} {room.city}
                </span>
              </div>
              <Button className="md:w-80">View Details</Button>
            </div>
          </Link>
        ))
      ) : (
        <div className="flex-center flex-col">
          <h1 className="h2">No rooms found!</h1>
          <p className="p">
            Sorry, no room meet your requirements at the moment. Please check
            back later or adjust your search criteria.
          </p>
        </div>
      )}
      {totalRooms ? (
        <PaginationBar totalRooms={totalRooms} searchParams={searchParams} />
      ) : null}
    </div>
  );
}
