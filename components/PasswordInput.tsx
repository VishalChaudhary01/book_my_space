"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";

interface PasswordInputProps {
     field: any;
     placeholder: string;
}

export function PasswordInput({ field, placeholder }: PasswordInputProps) {
     const [showPassword, setShowPassword] = useState(false);

     return (
          <div className="relative">
               <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder || "*******"}
               />
               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-0 translate-y-1/4">
                    <Image src={showPassword ? "/icons/eye.svg" : "/icons/eyeoff.svg"} alt="show password" width={24} height={24} />
               </button>

          </div>
     )
}