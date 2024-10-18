"use client";

import { CldImage } from "next-cloudinary";

interface RoomImageProps {
     src: string;
     w?: number;
     h?: number;
}
export function RoomImage({ src, w=250, h=250 }: RoomImageProps) {
     return (
          <CldImage src={src} width={w} height={h} alt="room image" className="rounded-md object-cover"/>
     )
}