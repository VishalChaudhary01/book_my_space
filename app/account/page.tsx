import { AccountButtons } from "@/components/AccountButtons";
import { authOptions } from "@/lib/auth/authOptions"
import prisma from "@/lib/database";
import { getServerSession } from "next-auth"
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Account() {
     const session = await getServerSession(authOptions);
     if (!session?.user) redirect("/signin");
     const user = await prisma.user.findUnique({ where: { id: session.user.id } });
     if (!user) redirect("/signin");
     return (
          <div className="flex-center flex-col gap-8 w-full">
               <div className="w-full flex-center flex-col gap-4 font-semibold text-gray-700 bg-purple-2 p-6 shadow-md rounded-md">
                    <h1 className="text-xl">{user.name}</h1>
                    <h3>{user.email}</h3>
                    <div className="flex flex-col items-center">
                         <div>Bill: Rs.{user.bill}</div>
                         {user.bill >= Number(process.env.MAX_BILL_LIMIT as string) && <div className="text-red-600">You have reach the max limit of bill, Please pay your bill to continue booking rooms.</div>}
                    </div>
                    <AccountButtons />
               </div>
               <div className="flex justify-between gap-4 w-full text-2xl font-bold text-gray-700">
                    <Link href="/rooms/booked" className="flex-center shadow-md rounded-md w-1/2 h-40 bg-purple-2">
                         Booked Rooms 
                    </Link>
                    <Link href="/rooms/rented" className="flex-center shadow-md rounded-md w-1/2 h-40 bg-purple-2">
                         Rented Rooms
                    </Link>
               </div>
          </div>
     )
}