import { fetchRoomById } from "@/app/actions/room.action";
import { BookingForm } from "@/components/BookingForm";
import { RoomImage } from "@/components/RoomImage";

export default async function RoomDetails({ params }: { params: { id: string } }) {
     const { room } = await fetchRoomById(params.id);

     return (
          <>
               {room ? (
                    <div className="flex flex-col p-4 w-full text-gray-600">
                         <div className="text-2xl lg:text-3xl font-bold mb-2">
                              {room.name}
                         </div>
                         <div className="flex flex-col text-base lg:text-lg font-medium">
                              <div> 
                                   {`Price: Rs.${room.pricePerHour}/hour, Rs.${room.pricePerDay}/day, Rs.${room.pricePerMonth}/month`}
                              </div>
                              <div>Size: {room.lengthInFeet}&times;{room.widthInFeet} square feet</div>
                         </div>
                         <div className="flex flex-col md:flex-row gap-4">
                              <div className="w-full md:w-1/2 h-fit overflow-hidden shrink-0">
                                   <RoomImage src={room.image} />
                              </div>
                              <div className="md:w-1/2">
                                   <div className="flex-center text-2xl font-bold bg-purple-2 px-4 py-2 rounded-md text-gray-600">
                                        Book Now
                                   </div>
                                   <BookingForm roomId={room.id} />
                              </div>
                         </div>
                         <div className="text-base font-medium text-gray-600 py-2">
                              <span className="text-xl font-bold">Addresss: </span>
                              {room.address}, {room.city}, {room.state}, {room.pin}
                         </div>
                         <div>
                              <span className="text-xl font-bold">Description: </span>
                              {room.description}
                         </div>
                    </div>
               ) : (
                    <div className="flex-center text-2xl font-semibold text-gray-600">Room not found</div>
               )}
          </>
     )
}