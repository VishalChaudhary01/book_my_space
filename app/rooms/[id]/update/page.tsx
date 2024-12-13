import { fetchRoomById } from "@/app/actions/room.action";
import { RoomForm } from "@/components/RoomForm";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UpdateRoom({ params }: { params: { id: string } }) {
     const session = await getServerSession(authOptions);
     const data = await fetchRoomById(params.id);
     if (session?.user && session?.user.id !== data?.room?.ownerId) redirect("/signin");
     
     return (
          <div>
               {data?.room ? (
                    <RoomForm roomId={params.id} room={data.room} />
               ) : (
                    <div className="h3">
                         Room Not found
                    </div>
               )}
          </div>
     )
}

