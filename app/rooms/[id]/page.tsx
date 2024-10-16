import { fetchRoomById } from "@/app/actions/room.action";
import { RoomImage } from "@/components/RoomImage";

export default async function RoomDetails({ params }: { params: { id: string } }) {
     const { room } = await fetchRoomById(params.id);
     return (
          <>
               {room && (
                    <div className="flex flex-col gap-4 items-center lg:grid md:grid lg:grid-cols-5 md:grid-cols-5 p-4">
                         <div className="col-span-2">
                              <RoomImage src={room.image} w={400} h={400} />
                         </div>
                         <div className="flex flex-col gap-4 lg:col-span-3 md:col-span-3 text-base font-medium lg:font-semibold md:font-semibold text-gray-700 px-4">
                              <div className="flex gap-4">
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
                              <div>
                                   <span className="text-xl font-bold text-gray-600">Description: </span>
                                   {room.description}
                              </div>
                         </div>
                    </div>
               )}
          </>
     )
}