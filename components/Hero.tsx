import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export function Hero() {
     return (
          <div className="relative">
               <div className="h-64 lg:h-96">
                    <Image src="/images/hero.png" width={1300} height={400} alt="hero image" className="w-full h-full object-cover overflow-hidden rounded-md -z-1"/>
               </div>
               <div className="absolute top-4 lg:top-12 left-1/2 transform -translate-x-1/2 text-xl font-bold md:text-2xl lg:text-3xl font-serif text-purple-1">
                    <div className="flex-center flex-col ">
                         <h1 className="flex-center text-center flex-col">
                              Best place to book meeting room,  
                              Seminar hall or coworking space
                              and period.
                         </h1>
                         <Link href="/rooms">
                              <Button>Search Rooms</Button>
                         </Link>
                    </div>
               </div>
          </div>
     )
}