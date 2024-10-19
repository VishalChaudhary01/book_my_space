import { fetchRoomById } from "@/app/actions/room.action";
import { BookingForm } from "@/components/BookingForm";
import { RoomImage } from "@/components/RoomImage";
import { toast } from "sonner";

export default async function RoomDetails({ params }: { params: { id: string } }) {
     const { room, error } = await fetchRoomById(params.id);
     if (error) {
          console.error(error);
          toast.error(error || "Error while fetching room details");
     }

     return (
          <>
               {room ? (
                    <div className="flex flex-col p-4 w-full">
                         <div className="text-4xl font-medium text-gray-700 mb-6">
                              {room.name}
                         </div>
                         <div className="flex gap-4 text-lg font-medium">
                              <span>${room.price}/hour</span>
                              <span>{room.lengthInFeet}&times;{room.widthInFeet} square feet</span>
                         </div>
                         <div className="flex flex-col lg:flex-row gap-8">
                              <RoomImage src={room.image} w={500} h={400} />
                              <div className="lg:w-1/2 md:w-2/3">
                                   <div className="flex-center text-2xl font-bold bg-purple-2 px-4 py-2 rounded-md text-gray-600">
                                        Book Now
                                   </div>
                                   <BookingForm roomId={room.id} image={room.image} name={room.name} price={room.price} />
                              </div>
                         </div>
                         <div className="text-base font-medium text-gray-700 py-2">
                              <span className="text-xl font-bold text-gray-600">Addresss: </span>
                              {room.address}, {room.city}, {room.state}, {room.pin}
                         </div>
                         <div>
                              <span className="text-xl font-bold text-gray-600">Description: </span>
                              {room.description}
                         </div>
                    </div>
               ) : (
                    <div className="flex-center text-2xl font-semibold text-gray-700">Room not found</div>
               )}
          </>
     )
}