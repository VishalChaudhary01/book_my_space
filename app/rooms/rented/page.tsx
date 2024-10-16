"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function RentedRooms() {
     const session = useSession();
     const router = useRouter();
     if (!session?.data?.user) redirect("/signin");
     return (
          <div className="flex flex-col gap-4 relative">
               <Button onClick={() => router.push('/rooms/add')} className="absolute right-0 top-4 bg-purple-1 hover:bg-purple-3">Add New Room</Button>
               <div className="flex flex-col items-center gap-4">
                    <div className="my-4 text-2xl font-bold text-gray-700">
                         Your all Rented Room are here
                    </div>
                    <div className="flex-center bg-purple-2 w-full">
                         Tabel
                    </div>
               </div>
          </div>
     )
}