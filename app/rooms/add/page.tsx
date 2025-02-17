import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { RoomForm } from "@/components/RoomForm";

export default async function AddRoom() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signin");
  return <RoomForm />;
}
