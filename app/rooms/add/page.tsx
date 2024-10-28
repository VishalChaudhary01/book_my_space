import { RoomForm } from "@/components/RoomForm";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AddRoom() {
     const session = await getServerSession(authOptions);
     if (!session?.user) redirect("/signin");
     return (
          <RoomForm />
     )
}