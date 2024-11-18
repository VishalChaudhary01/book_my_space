import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RoomImage } from "@/components/RoomImage";
import { fetchAllRooms } from "@/app/actions/room.action";
import { PaginationBar } from "./PaginationBar";

export async function Rooms({ searchParams }: { searchParams?: SearchParamsType }) {

    const { rooms, totalRooms } = await fetchAllRooms({ page: searchParams?.page, search: searchParams?.search });

    return (
        <div className="flex flex-col gap-4">
            {rooms?.length ? (
                rooms.map((room) => (
                    <Link href={`/rooms/${room.id}`} key={room.id} className="flex flex-col md:flex-row gap-2 md:gap-6 border bg-purple-2/15 rounded-md p-2">
                        <div className="w-full h-[180px] md:w-[250px] md:h-[150px] overflow-hidden shrink-0">
                            <RoomImage src={room.image} />
                        </div>
                        <div className="flex flex-col gap-4 justify-between">
                            <div className="flex flex-col text-gray-700 text-sm lg:text-base md:text-base">
                                <span className="lg:text-xl text-lg font-semibold">{room.name}</span>
                                <span><span className="font-semibold">Price: </span>{`Rs.${room.pricePerHour}/hour, Rs.${room.pricePerDay}/day, Rs.${room.pricePerMonth}/month`}</span>
                                <span><span className="font-medium">Size: </span>{room.lengthInFeet}×{room.widthInFeet} square feet</span>
                                <span><span className="font-medium">Address: </span>{room.address} {room.city}</span>
                            </div>
                            <Button className="md:w-80">View Details</Button>
                        </div>
                    </Link>
                ))
            ) : (
                <div className="flex-center flex-col">
                    <h1 className="md:text-2xl text-lg font-bold text-gray-700">No rooms found!</h1>
                    <p className="text-muted-foreground">
                        Sorry, no room meet your requirements at the moment.
                        Please check back later or adjust your search criteria.
                    </p>
                </div>
            )}
            {totalRooms ? <PaginationBar totalRooms={totalRooms} searchParams={searchParams} /> : null }
        </div>
    );
}