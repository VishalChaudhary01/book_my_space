import { fetchRoomById } from "@/app/actions/room.action";
import { BookingForm } from "@/components/BookingForm";
import { RoomImage } from "@/components/RoomImage";

export default async function RoomDetails({ params }: { params: { id: string } }) {
     const { room } = await fetchRoomById(params.id);
     if (!room) return <div>Room not found</div>
     return (
          <>
               {room && (
                    <div className="flex items-center flex-col lg:flex-row p-4">
                         <div className="">
                              <RoomImage src={room.image} w={400} h={400} />
                         </div>
                         <div className="w-full md:w-2/3 lg:w-2/3 text-base font-medium lg:font-semibold text-gray-700 p-4">
                              <div className="flex justify-between lg:px-8">
                                   <div className="flex flex-col">
                                        <span className="text-xl font-bold text-gray-600">{room.name}</span>
                                        <span>Price: {room.price} $/hour</span>
                                        <span>Size: {room.lengthInFeet} &times; {room.widthInFeet} square feet</span>
                                   </div>
                                   <div className="flex flex-col">
                                        <span className="text-xl font-bold text-gray-600">Addresss: </span>
                                        <span>{room.address}</span>
                                        <span>{room.city}</span>
                                        <span>{room.state}</span>
                                        <span>{room.pin}</span>
                                   </div>
                              </div>
                              <div className="lg:px-8">
                                   <span className="text-xl font-bold text-gray-600">Description: </span>
                                   {room.description}
                              </div>
                         </div>
                    </div>
               )}
               <div>
                    <div className="flex-center mt-4 text-2xl font-bold text-gray-600">
                         Book Now
                    </div>
                    <BookingForm roomId={room.id} image={room.image} name={room.name} price={room.price} />
               </div>
          </>
     )
}