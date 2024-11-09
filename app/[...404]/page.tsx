import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Custom404Page() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 mt-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-6xl mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-md mx-auto">
          We are sorry, but we could not find the page you are looking for.
        </p>
        <p className="text-base text-gray-500 mb-8 max-w-lg mx-auto">
          The page may have been moved, removed, renamed, or might never have
          existed.
        </p>
          <Link href="/">
               <Button>
                    Return to Homepage
               </Button>
          </Link>
    </div>
  );
};