"use server";
import { DEFAULT_PAGE, ROOMS_PER_PAGE } from "@/config";
import { authOptions } from "@/lib/auth/authOptions";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/database";
import { getFormatedTime, handleError, isTimeMultipleOfHour } from "@/lib/utils";
import { addRoomSchema, AddRoomSchemaType, bookRoomSchema, BookRoomSchemaType, updateRoomSchema, UpdateRoomSchemaType } from "@/types/room";
import { getServerSession } from "next-auth";

export async function uploadImage(image: any): Promise<IUploadImageResponse> {
     try {
          const sizeInMB = image.size / 1024*1024;
          if (sizeInMB > 2) throw new Error("Image size must be smaller then 2MB")
          const uploadedImage = await cloudinary.uploader.upload(image.secure_url,{
               public_id: image.public_id,
               folder: image.asset_folder
          });
          return { success: true, publicId: uploadedImage.public_id }
     } catch (error) {
          return handleError(error);
     }
}

// Add room for rent
export async function addRoom(formData: AddRoomSchemaType): Promise<IResponse> {
     const session = await getServerSession(authOptions);
     try {
          const user = await prisma.user.findFirst({
               where: { id: session?.user?.id },
          })
          if (!user) throw new Error("Unauthorized user, Please login first!");
          
          if (user.bill >= Number(process.env.MAX_BILL_LIMIT! as string)) {
               throw new Error("You have exceeded the maximum bill limit. You cannot rent your room until the outstanding balance is paid.");
          }

          const { data, error } = addRoomSchema.safeParse(formData);
          if (error) throw new Error(error.issues[0].message || "Invalid input");

          await prisma.room.create({
               data: {
                    ...data,
                    ownerId: user.id,
               }
          });
          return { success: true }
     } catch (error) {
          return handleError(error);
     }
}

// Book room -> User
export async function bookRoom(formData: BookRoomSchemaType): Promise<IResponse> {
     const session = await getServerSession(authOptions);
     try {
          const userId = session?.user?.id;
          if (!userId) throw new Error("Unauthorized user, Please login first!");

          const { data, error } = bookRoomSchema.safeParse(formData);
          if (error) throw new Error(error.issues[0].message || "Invalid input");

          if (data.checkInTime.getTime() < new Date().getTime() || data.checkOutTime.getTime() <= data.checkInTime.getTime()) {
               throw new Error("Select a valid time interval");
          }
          
          const timeMultipleOfHour = isTimeMultipleOfHour(data.checkOutTime, data.checkInTime);
          if (!timeMultipleOfHour) throw new Error("Please select time in multiple of hours");

          const room = await prisma.room.findFirst({
               where: { id: data.roomId },
               include: {
                    owner: {
                         select: {
                              bill: true,
                         }
                    }
               }
          });
          if (!room || !room.owner) throw new Error("Room not found");
          
          if (room.owner.bill >= Number(process.env.MAX_BILL_LIMIT as string)) {
               throw new Error("This room has been blocked due to unpaid bills.");
          }

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
          const { forMonths, forDays, forHours } = getFormatedTime(data.checkInTime, data.checkOutTime);
          const totalPrice = ((forMonths || 0) * (room.pricePerMonth || 0)) + ((forDays || 0) * (room.pricePerDay || 0)) + ((forHours || 0) * (room.pricePerHour || 0));
          await prisma.$transaction(async (txn) => {
               await txn.bookedRoom.create({
                    data: {
                         ...data,
                         userId: userId,
                         price: totalPrice,
                         name: room.name,
                         image: room.image,
                         ownerId: room.ownerId,
                    }
               });
               await txn.room.update({
                    where: { id:data.roomId },
                    data: { totalBooking: { increment: 1 } }
               });
               return true;
          });
          return { success: true };
     } catch (error) {
          return handleError(error);
     }
}

// Fetch all bookings of a Rented Room -> Room owner
export async function fetchAllBookingByRoom(roomId: string): Promise<IFetchAllBookingByRoomResponse> {
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
     } catch (error) {
          return handleError(error);
     }
}

// Room Owner Update the status of bookings -> Room owner
export async function updateStatus({ bookingId, status }: UpdateStatusProps): Promise<IResponse> {
     const session = await getServerSession(authOptions);
     try {
          const userId = session?.user?.id;
          if (!userId) throw new Error("Unauthorized user, Please login first!");
          const updatedBooking = await prisma.bookedRoom.update({
               where: {
                    id: bookingId,
                    ownerId: userId,
               },
               data: { status },
          });
          if (updatedBooking.status === "SUCCESS") {
               let commission = 0;
               if (updatedBooking.price <= Number(process.env.PRICE_LEVEL! as string)) {
                    commission = updatedBooking.price * 5/100;
               } else {
                    commission = updatedBooking.price * 3/100;
               }
               await prisma.user.update({
                    where: { id: userId },
                    data: { bill: { increment: commission } }
               });
          }
          return { success: true }
     } catch (error) {
          return handleError(error);
     }
}

// Cancel Booking by user -> User
export async function cancelBooking(bookingId: string): Promise<IResponse> {
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
                    status: "CANCEL",
                    checkInTime: new Date,
                    checkOutTime: new Date(),
               }
          });
          return { success: true }
     } catch (error) {
          return handleError(error);
     }
}

// Fetch all rooms booked by user -> User
export async function fetchAllBookedRooms(): Promise<IFetchAllBookedRoomsResponse> {
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
     } catch (error) {
          return handleError(error);
     }
}

// Fetch all rooms
export async function fetchAllRooms({ searchQuery = "", page = DEFAULT_PAGE }: RoomListsProps): Promise<IFetchRoomsResponse> {
     const skip = (Number(page) - 1) * ROOMS_PER_PAGE;
     try {
          const maxBillLimit = Number(process.env.MAX_BILL_LIMIT) || 1000;
          const rooms = (await prisma.room.findMany({
               where: {
                    owner: {
                         bill: { lte: maxBillLimit }
                    },
                    OR: [
                         { name: { contains: searchQuery, mode: 'insensitive' } },
                         { address: { contains: searchQuery, mode: 'insensitive' } },
                         { city: { contains: searchQuery, mode: 'insensitive' } },
                         { state: { contains: searchQuery, mode: 'insensitive' } },
                    ],
               },
               skip,
               take: ROOMS_PER_PAGE,
          })).reverse();
          
          return { success: true, rooms };
     } catch (error) {
          return handleError(error);
     }
}

// Fetch room by room_id
export async function fetchRoomById(roomId: string): Promise<IFetchRoomByIdResponse> {
     try {
          const room = await prisma.room.findFirst({
               where: {
                    id: roomId,
               }
          });
          return { success: true, room: room }
     } catch (error) {
          return handleError(error);
     }
}

// Fetch all rented rooms -> Room owner
export async function fetchRoomByOwner(): Promise<IFetchRoomsResponse> {
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
     } catch (error) {
          return handleError(error);
     }
}

// Update room -> Room owner
export async function updateRoom(formData: UpdateRoomSchemaType, roomId: string): Promise<IResponse> {
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
     } catch (error) {
          return handleError(error);
     }
}

// Delete room -> Room owner
export async function deleteRoom(roomId: string): Promise<IResponse> {
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
     } catch (error) {
          return handleError(error);
     }
}