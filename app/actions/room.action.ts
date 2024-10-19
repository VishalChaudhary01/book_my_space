"use server";
import { authOptions } from "@/lib/auth/authOptions";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/database";
import { addRoomSchema, AddRoomSchemaType, bookRoomSchema, BookRoomSchemaType, updateRoomSchema, UpdateRoomSchemaType } from "@/types/room";
import { getServerSession } from "next-auth";

export async function uploadImage(image: any) {
     try {
          const sizeInMB = image.size / 1024*1024;
          if (sizeInMB > 2) throw new Error("Image size must be smaller then 2MB")
          const uploadedImage = await cloudinary.uploader.upload(image.secure_url,{
               public_id: image.public_id,
               folder: image.asset_folder
          });
          return { success: true, publicId: uploadedImage.public_id }
     } catch (error: any) {
          return { error: error.message || "Something went wrong" }
     }
}

// Add room for rent
export async function addRoom(formData: AddRoomSchemaType) {
     const session = await getServerSession(authOptions);
     try {
          const userId = session?.user?.id;
          if (!userId) throw new Error("Unauthorized user, Please login first!");
          const { data, error } = addRoomSchema.safeParse(formData);
          if (error) throw new Error(error.issues[0].message || "Invalid input");
          await prisma.room.create({
               data: {
                    ...data,
                    ownerId: userId
               }
          });
          return { success: true }
     } catch (error: any) {
          return { error: error.message || "Something went wrong" }
     }
}

// Book room -> User
export async function bookRoom(formData: BookRoomSchemaType) {
     const session = await getServerSession(authOptions);
     try {
          const userId = session?.user?.id;
          if (!userId) throw new Error("Unauthorized user, Please login first!");

          const { data, error } = bookRoomSchema.safeParse(formData);
          if (error) throw new Error(error.issues[0].message || "Invalid input");

          if (data.checkInTime.getTime() < new Date().getTime() || data.checkOutTime.getTime() <= data.checkInTime.getTime()) {
               throw new Error("Select a valid time interval");
          }

          const room = await prisma.room.findFirst({
               where: { id: data.roomId }
          });
          if (!room) throw new Error("Room not found");

          const allBookings = await prisma.bookedRoom.findMany({
               where: { roomId: room.id }
          });
          // Check for overlapping bookings
          const isOverlapping = allBookings.some(booking => {
               const existingCheckIn = booking.checkInTime;
               const existingCheckOut = booking.checkOutTime;
               const newCheckIn = data.checkInTime;
               const newCheckOut = data.checkOutTime;

               return (
                    (newCheckIn >= existingCheckIn && newCheckIn < existingCheckOut) || 
                    (newCheckOut > existingCheckIn && newCheckOut <= existingCheckOut) ||
                    (newCheckIn <= existingCheckIn && newCheckOut >= existingCheckOut)
               )
          })
          if (isOverlapping) {
               throw new Error("For the given schedule, this room is not available");
          }

          await prisma.bookedRoom.create({
               data: {
                    ...data,
                    userId: userId,
                    ownerId: room.ownerId,
               }
          });
          await prisma.room.update({
               where: {
                    id:data.roomId,
               },
               data: {
                    totalBooking: room.totalBooking + 1,
               }
          })
          return { success: true };
     } catch (error: any) {
          console.error(error);
          return { error: error.message || "Something went wrong" };
     }
}

// Fetch all bookings of a Rented Room -> Room owner
export async function fetchAllBookingByRoom(roomId: string) {
     const session = await getServerSession(authOptions);
     try {
          const userId = session?.user?.id;
          if (!userId) throw new Error("Unauthorized user, Please login first!");
          const bookingList = await prisma.bookedRoom.findMany({
               where: {
                    roomId,
                    ownerId: userId,
               },
               orderBy: {
                    createdAt: 'desc',
               },
               include: {
                    user: {
                         select: {
                              name: true,
                         }
                    }
               }
          });
          return { success: true, bookingList };
     } catch (error: any) {
          console.error(error);
          return { error: error.message || "Something went wrong" };
     }
}

// Room Owner Update the status of bookings (Approved, Success, Pending) -> Room owner
export async function updateStatus({ bookingId, status }: UpdateStatusProps) {
     const session = await getServerSession(authOptions);
     try {
          const userId = session?.user?.id;
          if (!userId) throw new Error("Unauthorized user, Please login first!");
          await prisma.bookedRoom.update({
               where: {
                    id: bookingId,
                    ownerId: userId,
               },
               data: {
                    status,
               }
          });
          return { success: true }
     } catch (error: any) {
          console.error(error);
          return { error: error.message || "Something went wrong" };
     }
}

// Cancel Booking by user => User
export async function cancelBooking(bookingId: string) {
     const session = await getServerSession(authOptions);
     try {
          const userId = session?.user?.id;
          if (!userId) throw new Error("Unauthorized user, Please login first!");
          await prisma.bookedRoom.update({
               where: {
                    id: bookingId,
                    userId: userId,
               },
               data: {
                    status: "Cancel",
                    checkInTime: new Date,
                    checkOutTime: new Date(),
               }
          });
          return { success: true }
     } catch (error: any) {
          console.error(error);
          return { error: error.message || "Something went wrong" };
     }
}

// Fetch all booked rooms by user
export async function fetchAllBookedRooms() {
     const session = await getServerSession(authOptions);
     try {
          const userId = session?.user?.id;
          if (!userId) throw new Error("Unauthorized user, Please login first!");
          const bookedRooms = await prisma.bookedRoom.findMany({
               where: { 
                    userId 
               },
               include: {
                    user: {
                         select: {
                              name: true
                         }
                    }
               },
               orderBy: {
                    createdAt: 'desc',
               },
          });
          return { success: true, bookedRooms };
     } catch (error: any) {
          console.error(error);
          return { error: error.message || "Something went wrong" };
     }
}

// Fetch all rooms
export async function fetchAllRooms() {
     try {
          const rooms = (await prisma.room.findMany({})).reverse();
          return { success: true, rooms };
     } catch (error: any) {
          console.error(error);
          return { error: error.message || "Something went wrong" };
     }
}

// Fetch room by room_id
export async function fetchRoomById(roomId: string) {
     try {
          const room = await prisma.room.findFirst({
               where: {
                    id: roomId,
               }
          });
          return { success: true, room }
     } catch (error: any) {
          console.error(error);
          return { error: error.message || "Something went wrong" };
     }
}

// Fetch all rented rooms of user -> Room owner
export async function fetchRoomByOwner() {
     const session = await getServerSession(authOptions);
     try {
          const userId = session?.user?.id;
          if (!userId) throw new Error("Unauthorized user, Please login first!");
          const rooms = (await prisma.room.findMany({
               where: {
                    ownerId: userId
               }
          })).reverse();
          return { success: true, rooms }
     } catch (error: any) {
          console.error(error);
          return { error: error.message || "Something went wrong" };
     }
}

// Update room -> Room owner
export async function updateRoom(formData: UpdateRoomSchemaType, roomId: string) {
     const session = await getServerSession(authOptions);
     try {
          const userId = session?.user?.id;
          if (!userId) throw new Error("Unauthorized user, Please login first!");

          const { data, error } = updateRoomSchema.safeParse(formData);
          if (error) throw new Error(error.issues[0].message || "Invalid input");

          const room = await prisma.room.findFirst({ 
               where: { 
                    id: roomId, 
                    ownerId: userId 
               }
          });
          if (!room) throw new Error("Room not found");

          await prisma.room.update({
               where: {
                    id: roomId,
                    ownerId: userId,
               },
               data: {
                    ...data,
               }
          });
          return { success: true }
     } catch (error: any) {
          console.error(error);
          return { error: error.message || "Something went wrong" };
     }
}

// Delete room -> Room owner
export async function deleteRoom(roomId: string) {
     const session = await getServerSession(authOptions);
     try {
          const userId = session?.user?.id;
          if (!userId) throw new Error("Unauthorized user, Please login first!");
          const room = await prisma.room.findFirst({ 
               where: {
                    id: roomId,
                    ownerId: userId,
               }
          });
          if (!room) throw new Error("Room not found");
          await prisma.room.delete({
               where: {
                    id: roomId,
                    ownerId: userId,
               }
          });
          return { success: true }
     } catch (error: any) {
          console.error(error);
          return { error: error.message || "Something went wrong" };
     }
}