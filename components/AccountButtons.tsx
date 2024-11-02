"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { checkoutPayment } from "@/app/actions/checkout";

export function AccountButtons() {
     const handleClick = async () => {
          await checkoutPayment();
     }
     return (
          <div className="grid grid-cols-2 gap-4 w-full md:w-2/3 lg:w-2/5">
               <Button onClick={handleClick} className="w-full">Pay Bill Now</Button>
               <Button onClick={() => signOut()} className="w-full">
                    Logout
               </Button>
          </div>
     )
}