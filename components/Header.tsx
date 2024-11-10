"use client";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/config";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Header() {
     const [openSheet, setOpenSheet] = useState(false);
     const router = useRouter();
     const session = useSession();

     return (
          <div className="sticky z-50 top-4 flex-between rounded-xl py-4 px-4 mb-4 lg:px-8 bg-purple-1 text-white shadow-sm">
               <Link href="/" className="text-[20px] lg:text-[25px] font-bold">BookMySpace</Link>
               <div className="hidden md:flex-center text-base lg:font-medium">
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
                         <Link href="/account" className="text-[18px] shrink-0 hidden md:block"><Image src="/icons/user.svg" alt="account" width={28} height={28} /></Link>
                         <Button onClick={() => signOut()} className="hidden md:block bg-white hover:bg-purple-2 text-purple-1">Logout</Button>
                         <Button onClick={() => setOpenSheet(true)} variant="ghost" size="sm" className="md:hidden bg-white hover:bg-purple-2">
                              <Image src="/icons/right-align.svg" alt="align" width={24} height={24} />
                         </Button>
                    </div>
               ) : (
                    <div className="flex-center">
                         <Button onClick={() => router.push("/signin")} className="bg-white hover:bg-purple-2 text-purple-1">Signin</Button>
                         <Button onClick={() => router.push("/signup")} className="hidden md:block bg-white hover:bg-purple-2 text-purple-1">Signup</Button>
                         <Button onClick={() => setOpenSheet(true)} variant="ghost" size="sm" className="md:hidden bg-white hover:bg-purple-2">
                              <Image src="/icons/right-align.svg" alt="align" width={24} height={24} />
                         </Button>
                    </div>
               )}
               {openSheet && <SidebarSheet open={openSheet} setOpen={setOpenSheet} />}
          </div>
     )
}

interface SidebarProps {
     open: boolean;
     setOpen: (e: boolean) => void;
}
export function SidebarSheet({ open, setOpen }: SidebarProps) {
     const session = useSession();
     const router = useRouter();
     const pathname = usePathname();
     return (
          <Sheet open={open} onOpenChange={() => setOpen(false)}>
               <SheetContent side="left" className="flex flex-col justify-between w-56">
                    <div>
                    <SheetHeader>
                         <SheetTitle className="text-2xl font-bold text-gray-700 my-8">BookMySpace</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-2">
                         {session?.data?.user ? sidebarLinks.map((link) => {
                              const isActive = link.href === pathname;
                              return (
                                   <Button onClick={() => {
                                        setOpen(false)
                                        router.push(link.href)
                                   }}
                                    variant={"secondary"}
                                    key={link.name} className={`border border-purple-2 hover:bg-purple-1 hover:text-white ${isActive && "bg-purple-1 text-white hover:bg-purple-1"}`}>
                                        {link.name}
                                   </Button>
                              )
                         }) : (
                              <Button onClick={() => {
                                   setOpen(false)
                                   router.push("/rooms")
                              }}
                               variant={"secondary"}
                               className={`border border-purple-2 hover:bg-purple-1 hover:text-white`}>
                                   All Rooms
                              </Button>
                         )}
                    </div>
                    </div>
                    <SheetFooter>
                         {session?.data?.user ? (
                              <Button onClick={() => {
                                   setOpen(false);
                                   signOut()
                              }} className="mt-6">Logout</Button>
                         ) : (
                              <div className="flex flex-col gap-2 mt-4">
                                   <Button onClick={() =>{
                                        setOpen(false);
                                        router.push("/signin")
                                   }}>Signin</Button>
                                   <Button onClick={() => {
                                        setOpen(false)
                                        router.push("/signup")
                                   }} className="mt-">Signup</Button>
                              </div>
                         )
                    }
                    </SheetFooter>
               </SheetContent>
          </Sheet>
     )
}