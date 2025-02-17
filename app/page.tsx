import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 items-center">
      <Hero />
      <Services />
    </div>
  );
}
