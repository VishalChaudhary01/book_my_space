import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Custom404Page() {
  return (
    <div className="flex flex-col items-center container mx-auto px-4 py-8 mt-12">
        <h2 className="h2 mb-4">
          404 - Page Not Found
        </h2>
        <h4 className="h4 mb-6 max-w-md mx-auto text-center">
          We are sorry, but we could not find the page you are looking for.
        </h4>
        <p className="p mb-8 max-w-lg mx-auto text-center">
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