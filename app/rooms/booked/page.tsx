import { authOptions } from "@/lib/auth/authOptions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function BookedRooms() {
     const session = await getServerSession(authOptions);
     if (!session.user) redirect("/signin");
     return (
          <div>
               My Booked Rooms
          </div>
     )
}