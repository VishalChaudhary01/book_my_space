import Link from "next/link";
import prisma from "@/lib/database";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { AccountButtons } from "@/components/AccountButtons";

export default async function Account() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signin");
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/signin");

  return (
    <div className="flex flex-col gap-4 w-full md:container md:mx-auto px-4 md:px-0">
      <div className="w-full flex-center flex-col bg-purple-2 dark:bg-dark-3 p-6 shadow-md rounded-lg">
        <h3 className="h3">{user.name}</h3>
        <h3 className="">{user.email}</h3>
        <div className="flex flex-col items-center ">
          <div>Bill: Rs.{user.bill}</div>
          {user.bill >= Number(process.env.MAX_BILL_LIMIT as string) && (
            <div className="text-red-600">
              You have reach the max limit of bill, Please pay your bill to
              continue booking rooms.
            </div>
          )}
        </div>
        <AccountButtons />
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <Link
          href="/rooms/booked"
          className="h3 flex-center shadow-md rounded-lg py-6 md:w-1/2 md:py-12 bg-purple-2 dark:bg-dark-3"
        >
          Booked Rooms
        </Link>
        <Link
          href="/rooms/rented"
          className="h3 flex-center shadow-md rounded-lg py-6 md:w-1/2 md:py-12 bg-purple-2 dark:bg-dark-3"
        >
          Rented Rooms
        </Link>
      </div>
    </div>
  );
}
