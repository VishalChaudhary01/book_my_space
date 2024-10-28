import Image from "next/image";
import Link from "next/link";
import { fetchAllRooms } from "../actions/room.action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RoomImage } from "@/components/RoomImage";
import { toast } from "sonner";

export default async function RoomLists() {
     const { rooms, error } = await fetchAllRooms();
     if (error) {
          console.error(error);
          toast.error(error || "Error while fetching rooms");
     }

     return (
          <div className="flex flex-col gap-4">
               <div className="flex justify-center items-center">
                    <Input className="focus-visible:outline-none focus-visible:ring-0 rounded-l-full w-2/5" placeholder="Seacrh rooms"/>
                    <Button variant="ghost" className="border border-l-0 rounded-r-full shadow-sm">
                         <Image src="/icons/search.svg" width={24} height={24} alt="search" />
                    </Button>
               </div>
               {rooms?.length ? (
                    rooms.map((room) => (
                         <Link href={`/rooms/${room.id}`} key={room.id} className="flex gap-2 lg:gap-16 cursor-pointer border rounded-md p-2 lg:p-4">
                              <div>
                                   <RoomImage src={room.image} />
                              </div>
                              <div className="flex flex-col w-max justify-between">
                                   <div className="flex flex-col text-gray-700 text-sm lg:text-base md:text-base">
                                        <span className="lg:text-xl text-lg font-semibold">{room.name}</span>
                                        <span><span className="font-semibold">Price: </span>{`Rs.${room.pricePerHour}/hour, Rs.${room.pricePerDay}/day, Rs.${room.pricePerMonth}/month`}</span>
                                        <span><span className="font-medium">Size: </span>{room.lengthInFeet}&times;{room.widthInFeet} square feet</span>
                                        <span><span className="font-medium">Address: </span>{room.address} {room.city}</span>
                                   </div>
                                   <Button>View Details</Button>
                              </div>
                         </Link>
                    ))
               ) : (
                    <div>
                         No rooms found
                    </div>
               )}
          </div>
     )
}