"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function Hero() {
     const router = useRouter();
     return (
          <div className="relative">
               <Image src="/images/hero.png" width={1300} height={400} alt="hero image" className="w-full h-full rounded-md object-contain -z-1"/>
               <div className="absolute top-2 lg:top-8 left-1/2 transform -translate-x-1/2 text-xl font-bold lg:text-4xl font-serif text-purple-1">
                    <h1 className="hidden lg:block">
                         Best place to book meeting room, Seminar hall or coworking space, period.
                    </h1>
                    <h1 className="lg:hidden">
                         Best place to book room.
                    </h1>
                    <Button onClick={() => router.push("/rooms")} className="bg-purple-1 hover:bg-purple-3">Search Rooms</Button>
               </div>
          </div>
     )
}