"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function AddNewRoomButton() {
     const router = useRouter();
     return (
          <Button onClick={() => router.push('/rooms/add')} className="absolute right-0 top-4">Add New Room</Button>
     )
}