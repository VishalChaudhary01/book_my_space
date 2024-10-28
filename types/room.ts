import { z } from "zod";

export const addRoomSchema = z.object({
     name: z.string().min(1, "Name is required"),
     description: z.string().optional(),
     image: z.string(),
     pricePerHour: z.coerce.number({ message: 'PricePerHour must be a number' }).nonnegative(),
     pricePerDay: z.coerce.number({ message: 'PricePerDay must be a number' }).nonnegative(),
     pricePerMonth: z.coerce.number({ message: 'PricePerMonth must be a number' }).nonnegative(),
     lengthInFeet: z.coerce.number({ message: 'Length must be a number' }).nonnegative(),
     widthInFeet: z.coerce.number({ message: 'Width must be a number' }).nonnegative(),
     address: z.string(),
     city: z.string().min(1, "City is required"),
     state: z.string().min(1, "State is required"),
     pin: z.coerce.number({ message: 'Pin code must be a number' }).nonnegative(),
})

export const updateRoomSchema = addRoomSchema.partial();

export const bookRoomSchema = z.object({
     roomId: z.string(),
     checkInTime: z.date(),
     checkOutTime: z.date()
})

export const updateStatusSchema = z.object({
     status: z.enum(["BOOKED", "CANCEL", "SUCCESS"]),
     bookingId: z.string()
})

export type UpdateStatusSchemaType = z.infer<typeof updateStatusSchema>;
export type AddRoomSchemaType = z.infer<typeof addRoomSchema>;
export type UpdateRoomSchemaType = z.infer<typeof updateRoomSchema>;
export type BookRoomSchemaType = z.infer<typeof bookRoomSchema>;
