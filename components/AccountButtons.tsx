"use client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { checkoutPayment } from "@/app/actions/bill.action";
import { Button } from "./ui/button";

export function AccountButtons() {
  const router = useRouter();

  async function handleSubmit() {
    const res = await checkoutPayment();
    if (res.url) {
      router.push(res.url);
    } else {
      toast.error(res.error || "Something went wrong!");
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-full md:w-2/3 lg:w-2/5">
      <form action={handleSubmit}>
        <Button type="submit" className="w-full">
          Pay Bill Now
        </Button>
      </form>
      <Button onClick={() => signOut()} className="w-full">
        Logout
      </Button>
    </div>
  );
}
