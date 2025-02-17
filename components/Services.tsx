"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { services } from "@/config";
import { Button } from "./ui/button";
import { InfiniteMovingCards } from "./ui/infinite-moving-card";

export function Services() {
  const router = useRouter();
  return (
    <div className="w-full md:container md:mx-auto rounded-xl flex flex-col items-center gap-12 mx-4">
      <div className="flex flex-col gap-4">
        <h2 className="flex-center h2">
          Our unique and affordable office solutions
        </h2>
        <div className="h-[375px] w-full max-w-[360px] sm:max-w-[600px] md:max-w-[750px] lg:max-w-[1024px] xl:max-w-7xl rounded-md flex flex-col antialiased bg-white dark:bg-dark-4 items-center relative overflow-hidden">
          <InfiniteMovingCards
            services={services}
            direction="left"
            speed="slow"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <h2 className="h2">Want to start renting your space</h2>
        <div className="flex flex-col md:flex-row items-center md:justify-between md:px-8 gap-8 w-full dark:bg-dark-3 bg-purple-3/10 p-4 rounded-xl border dark:border-dark-1/50">
          <div className="flex flex-col gap-4 max-w-lg">
            <div>
              <h3 className="h3">Turn Your Space into Extra Income</h3>
              <p className="p">
                With BookMySpace, you can monetize your space and reach a global
                audience, with a simple 3-5% commission fee.
              </p>
            </div>
            <div>
              <h3 className="h3">
                Start renting your space with Zero Extra Cost
              </h3>
              <p className="p">
                No setup fees or hidden charges. List your space and earn
                effortlessly with just a 3-5% commission on bookings.
              </p>
            </div>
            <Button
              onClick={() => router.push("/rooms/add")}
              className="w-1/2 mt-4"
            >
              List My Space
            </Button>
          </div>
          <Image
            src={"/images/partnership.jpg"}
            alt="partner"
            width={600}
            height={400}
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
