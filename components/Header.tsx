"use client";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { AlignRight, CircleUserRound, Moon, Sun } from "lucide-react";
import { sidebarLinks } from "@/config";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [openSheet, setOpenSheet] = useState(false);
  const router = useRouter();
  const session = useSession();

  return (
    <div className="flex-between rounded-xl py-4 px-4 lg:px-8 mx-4 md:container md:mx-auto bg-purple-4 dark:bg-dark-3 text-white shadow-sm z-50">
      <Link href="/" className="text-lg lg:text-xl font-semibold">
        BookMySpace
      </Link>
      <div className="hidden md:flex-center">
        <Link href="/rooms" className="ghost-link">
          All Rooms
        </Link>
        {session?.data?.user && (
          <>
            <Link href="/rooms/booked" className="ghost-link">
              Booked Rooms
            </Link>
            <Link href="/rooms/rented" className="ghost-link">
              Rented Rooms
            </Link>
          </>
        )}
      </div>

      {session?.data?.user ? (
        <div className="flex-center">
          <Button
            onClick={() => setTheme(`${theme === "light" ? "dark" : "light"}`)}
            variant="ghost"
            size="icon"
            className="text-dark-1 hover:text-purple-4"
          >
            <Sun className="h-[24] w-[24] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
            <Moon className="absolute h-[24] w-[24] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            onClick={() => router.push("/account")}
            variant="ghost"
            size="icon"
            className="hidden md:flex items-center justify-center text-dark-1 hover:text-purple-4"
          >
            <CircleUserRound width={24} height={24} />
          </Button>
          <Button
            variant="link"
            onClick={() => signOut()}
            className="hidden md:block "
          >
            Logout
          </Button>
          <Button
            onClick={() => setOpenSheet(true)}
            variant="ghost"
            size="icon"
            className="md:hidden flex items-center justify-center text-dark-1 hover:text-purple-4"
          >
            <AlignRight width={24} height={24} />
          </Button>
        </div>
      ) : (
        <div className="flex-center">
          <Button
            onClick={() => setTheme(`${theme === "light" ? "dark" : "light"}`)}
            variant="ghost"
            size="icon"
            className="text-dark-1 hover:text-purple-4"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button onClick={() => router.push("/signin")} variant="link">
            Signin
          </Button>
          <Button
            onClick={() => router.push("/signup")}
            variant="link"
            className="hidden md:block"
          >
            Signup
          </Button>
          <Button
            onClick={() => setOpenSheet(true)}
            variant="ghost"
            size="icon"
            className="md:hidden flex items-center justify-center text-dark-1 hover:text-purple-4"
          >
            <AlignRight width={24} height={24} />
          </Button>
        </div>
      )}

      <Sheet open={openSheet} onOpenChange={() => setOpenSheet(false)}>
        <SheetContent
          side="left"
          className="flex flex-col justify-between w-56 bg-purple-1 dark:bg-dark-3"
        >
          <div>
            <SheetHeader>
              <SheetTitle className="text-2xl font-semibold text-purple-5 dark:text-white my-8">
                BookMySpace
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2">
              {session?.data?.user ? (
                sidebarLinks.map((link) => {
                  const isActive = link.href === pathname;
                  return (
                    <Button
                      onClick={() => {
                        setOpenSheet(false);
                        router.push(link.href);
                      }}
                      variant={"secondary"}
                      key={link.name}
                      className={`${
                        isActive &&
                        "bg-purple-4 dark:bg-dark-1 dark:text-dark-4 text-white hover:bg-purple-4"
                      }`}
                    >
                      {link.name}
                    </Button>
                  );
                })
              ) : (
                <Button
                  onClick={() => {
                    setOpenSheet(false);
                    router.push("/rooms");
                  }}
                  variant="secondary"
                >
                  All Rooms
                </Button>
              )}
            </div>
          </div>
          <SheetFooter>
            {session?.data?.user ? (
              <Button
                onClick={() => {
                  setOpenSheet(false);
                  signOut();
                }}
                className="mt-6 w-full"
              >
                Logout
              </Button>
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                <Button
                  onClick={() => {
                    setOpenSheet(false);
                    router.push("/signin");
                  }}
                  className="w-full"
                >
                  Signin
                </Button>
                <Button
                  onClick={() => {
                    setOpenSheet(false);
                    router.push("/signup");
                  }}
                  className="w-full"
                >
                  Signup
                </Button>
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
