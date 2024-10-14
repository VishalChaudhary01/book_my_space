import { z } from "zod";

export const addRoomSchema = z.object({
     name: z.string().min(1, "Name is required"),
     description: z.string().optional(),
     image: z.string(),
     price: z.number(),
     lengthInFeet: z.number(),
     widthInFeet: z.number(),
     address: z.string(),
     city: z.string().min(1, "City is required"),
     state: z.string().min(1, "State is required"),
     pin: z.number(),
})

export const updateRoomSchema = addRoomSchema.partial();

export const bookRoomSchema = z.object({
     roomId: z.string(),
     name: z.string(),
     image: z.string(),
     price: z.number(),
     checkInTime: z.date(),
     checkOutTime: z.date()
})

export type AddRoomSchemaType = z.infer<typeof addRoomSchema>;
export type UpdateRoomSchemaType = z.infer<typeof updateRoomSchema>;
export type BookRoomSchemaType = z.infer<typeof bookRoomSchema>;
