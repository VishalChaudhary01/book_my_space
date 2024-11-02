"use client";
import { services } from "@/config";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function Services() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-16">
      <div>
        <h2 className="flex-center text-2xl lg:text-3xl font-bold text-gray-700 pb-4">
          Our unique and affordable office solutions
        </h2>
        <div className="grid grid-cols-1 items-center justify-items-center md:grid-cols-2 gap-4 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.header}
              src={service.src}
              header={service.header}
              desc={service.desc}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row md:flex-row lg:items-start items-center gap-8">
        <Image src="/images/img.jpg" width={400} height={500} alt="image" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 text-gray-600 bg-purple-2 p-4 rounded-md">
            <div>
              <h1 className="text-2xl lg:text-3xl font-medium">
                Book a coworking space
              </h1>
              <p>
                BookMySpace helps you find and book a coworking space near you for
                meetings and work.
              </p>
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-medium">Pay-per-use</h3>
              <p>No contracts, or commitments. Book for an hour or a day.</p>
            </div>
            <Button
              onClick={() => router.push("/rooms")}
              className="w-1/3 mt-4"
            >
              Search Rooms
            </Button>
          </div>
          <div className="flex flex-col gap-4 text-gray-600 bg-purple-2 p-4 rounded-md">
            <div>
              <h1 className="text-2xl lg:text-3xl font-medium">
                Turn Your Space into Extra Income
              </h1>
              <p>
                With BookMySpace, you can monetize your space and reach a global audience, with a simple 3-5% commission fee.
              </p>
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-medium">Start renting your space with Zero Extra Cost</h3>
              <p>No setup fees or hidden charges. List your space and earn effortlessly with just a 3-5% commission on bookings.</p>
            </div>
            <Button
              onClick={() => router.push("/rooms/add")}
              className="w-1/3 mt-4"
            >
              List My Space
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ src, header, desc }: { src: string; header: string; desc: string; }) {
  return (
    <div className="rounded-md max-w-96">
      <Image
        src={src}
        alt="hybrid"
        width={400}
        height={300}
        className="object-cover rounded-md"
      />
      <div className="text-gray-600">
        <h3 className="text-xl font-medium">{header}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}
