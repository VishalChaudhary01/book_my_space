import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Spotlight } from "./ui/spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";

export function Hero() {
  return (
    <div className="w-full mx-4 md:container md:mx-auto rounded-xl">
      <Spotlight
        className="-top-40 left-0 md:left-50 md:-top-20"
        fill="#3F1D60"
      />
      <div className="h-[500px] w-full dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark-4 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        <div className="flex flex-col items-center gap-6 px-4">
          <div className="flex flex-col justify-center gap-4 items-center max-w-[400px] md:max-w-[700px]">
            <TextGenerateEffect
              duration={3}
              filter={false}
              words={"Find the Perfect Space, When You Need It"}
            />
            <p className="p text-center lg:text-base bg-clip-text">
              Discover seamless room booking for every occasion. Whether
              it&apos;s a cozy room for personal use, a professional meeting
              space, or a seminar hall for larger gatherings, we&apos;ve got you
              covered. Book by the hour or the day—flexible options tailored to
              your needs.
            </p>
          </div>
          <Button>
            <Link href={"/rooms"}>Search Rooms</Link>
          </Button>
        </div>
      </div>
      <div className="h-[900px] md:h-[570px] w-full p-4 bg-purple-3/10 dark:bg-dark-3 rounded-xl flex flex-col md:flex-row items-center justify-center md:justify-start gap-8">
        <div className="min-w-[342px] max-w-[600px] md:w-[430px] h-[530px] flex gap-2">
          <div className="w-1/2 h-full flex flex-col gap-2">
            <div className="h-2/3 w-full rounded-lg overflow-hidden">
              <Image
                src="/images/s2.webp"
                alt="services"
                width={300}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="h-1/3 w-full rounded-lg overflow-hidden">
              <Image
                src="/images/s4.jpg"
                alt="services"
                width={300}
                height={350}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col gap-2">
            <div className="h-1/3 w-full rounded-lg overflow-hidden">
              <Image
                src="/images/s3.jpeg"
                alt="services"
                width={300}
                height={350}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="h-2/3 w-full rounded-lg overflow-hidden">
              <Image
                src="/images/s1.webp"
                alt="services"
                width={300}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="md:max-w-xl flex flex-col justify-start gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="h3">Book a coworking space</h3>
            <p className="p">
              Your remote and distributed teams can now gain instant access to
              2000+ professional, productive coworking spaces across 45 cities
              in India on a pay-per-use model.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="h3">Book a coworking space</h3>
            <p className="p">
              Your remote and distributed teams can now gain instant access to
              2000+ professional, productive coworking spaces across 45 cities
              in India on a pay-per-use model.
            </p>
          </div>
          <Button className="w-1/2">
            <Link href="/rooms">Search Rooms</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
