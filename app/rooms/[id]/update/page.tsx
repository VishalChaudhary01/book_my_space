import { fetchRoomById } from "@/app/actions/room.action";
import { RoomForm } from "@/components/RoomForm";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UpdateRoom({ params }: { params: { id: string } }) {
     const session = await getServerSession(authOptions);
     const data = await fetchRoomById(params.id);
     if (!session?.user) redirect("/signin");
     
     return (
          <div>
               {data?.room ? (
                    <RoomForm roomId={params.id} room={data.room} />
               ) : (
                    <div className="flex-center text-xl font-bold text-gray-600">
                         Room Not found
                    </div>
               )}
          </div>
     )
}

