"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { EyeIcon, EyeOff } from "lucide-react";

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
               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-0 translate-y-1/4 text-black/90 dark:text-dark-1/50">
                    {showPassword ? <EyeIcon /> : <EyeOff />}
               </button>
          </div>
     )
}