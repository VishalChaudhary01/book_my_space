"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Header() {
     const router = useRouter();
     const session = useSession();

     return (
          <div className="sticky top-4 flex-between rounded-xl py-4 px-4 lg:px-8 m-4 lg:mx-8 bg-purple-1 text-white shadow-sm">
               <Link href="/" className="text-[20px] lg:text-[25px] font-bold">Room Bookit</Link>
               <div className="hidden md:flex-center lg:flex-center text-base lg:font-medium">
                    <Link href="/rooms" className="ghost-link">All Rooms</Link>
                    {session?.data?.user && (
                         <>
                              <Link href="/rooms/booked" className="ghost-link">Booked Rooms</Link>
                              <Link href="/rooms/rented" className="ghost-link">Rented Rooms</Link>
                         </> 
                    )}
               </div>
               {session?.data?.user ? (
                    <div className="flex-center">
                         <Link href="/account" className="text-[18px] shrink-0"><Image src="/icons/user.svg" alt="account" width={28} height={28} /></Link>
                         <Button onClick={() => {
                              toast.success("Logout successful");
                              signOut();
                         }} className="hidden md:block lg:block bg-white hover:bg-purple-2 text-purple-1 font-semibold text-base">Logout</Button>
                    </div>
               ) : (
                    <div className="flex-center">
                         <Button onClick={() => router.push("/signin")} className="bg-white hover:bg-purple-2 text-purple-1 font-semibold text-base">Signin</Button>
                         <Button onClick={() => router.push("/signup")} className="hidden md:block lg:block bg-white hover:bg-purple-2 text-purple-1 font-semibold text-base">Signup</Button>
                    </div>
               )}
          </div>
     )
}