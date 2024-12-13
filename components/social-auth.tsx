"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";

export function GoogleOauthButton({ label }: { label: string }) {
     return (
          <Button 
           onClick={(e) => {
               e.preventDefault();
               signIn("google")
           }}
           className="w-full flex-center gap-4 bg-dark-2">
               {label}
               <Image src={'/icons/google.svg'} alt="google" width={24} height={24} />
          </Button>
     )
}