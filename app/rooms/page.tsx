import { fetchAllRooms } from "../actions/room.action";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RoomImage } from "@/components/RoomImage";

export default async function RoomLists() {
     const { rooms } = await fetchAllRooms();

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
                         <Link href={`/rooms/${room.id}`} key={room.id} className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 grid-flow-row cursor-pointer border border-purple-2 rounded-md p-2">
                              <div>
                                   <RoomImage src={room.image} />
                              </div>
                              <div className="flex flex-col text-base font-medium lg:font-semibold md:font-semibold text-gray-700 px-4">
                                   <span>{room.name}</span>
                                   <span>Price: {room.price} $/hour</span>
                                   <span>Size: {room.lengthInFeet} &times; {room.widthInFeet} square feet</span>
                                   <span className="lg:hidden md:hidden">Address: {room.address} {room.city}</span>
                              </div>
                              <div className="hidden lg:flex md:flex flex-col text-base font-semibold text-gray-700 px-4">
                                   <span>{room.address}</span>
                                   <span>{room.city}</span>
                                   <span>{room.state}</span>
                                   <span>{room.pin}</span>
                              </div>
                              <div className="hidden lg:block col-span-2 text-base font-semibold text-gray-700 px-4">
                                   {room.description}
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