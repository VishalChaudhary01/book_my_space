"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookRoomSchema, BookRoomSchemaType } from "@/types/room";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { bookRoom } from "@/app/actions/room.action";
import { formatToDateTimeLocalString } from "@/lib/utils";

interface BookingFormProps {
     roomId: string;
     name: string;
     image: string;
     price: number;
}
const initialValue = {
     roomId: "",
     name: "",
     image: "",
     price: 0,
     checkInTime: new Date(),
     checkOutTime: new Date(),
}
export function BookingForm({ roomId, name, image, price }: BookingFormProps) {
     const form = useForm<BookRoomSchemaType>({
          resolver: zodResolver(bookRoomSchema),
          defaultValues: initialValue,
     })

     async function bookingHandler(data: BookRoomSchemaType) {
          if (data.checkInTime.getTime() < new Date().getTime() || data.checkOutTime.getTime() < data.checkInTime.getTime()) {
               alert("Please select a valid date");
               return;
          }
          // const totalRentTime = (data.checkOutTime.getTime() - data.checkInTime.getTime()) / (1000 * 60 * 60);
          // const totalAmount = (totalRentTime * price);
          // console.log(totalAmount, totalRentTime)
          const response = await bookRoom({ ...data, roomId, name, image, price });
          if (response.success) {
               toast.success("Room booking successful");
          } else {
               console.error(response);
               toast.error(response.error || "Something went wrong");
          }
     }

     return (
          <Form {...form}>
               <form onSubmit={form.handleSubmit(bookingHandler)} className="space-y-6 my-4 border-2 border-purple-2 min-w-96 rounded-md shadow-sm p-4 lg:px-8">
                    <FormField
                         control={form.control}
                         name="checkInTime"
                         render={({ field }) => (
                         <FormItem>
                              <FormLabel className="form-label">Check in Date & Time</FormLabel>
                              <FormControl>
                              <Input
                                   {...field}
                                   type="datetime-local"
                                   value={field.value ? formatToDateTimeLocalString(new Date(field.value)) : ''}
                                   onChange={(e) => field.onChange(new Date(e.target.value))}
                              />
                              </FormControl>
                              <FormMessage />
                         </FormItem>
                         )}
                    />
                    <FormField
                         control={form.control}
                         name="checkOutTime"
                         render={({ field }) => (
                         <FormItem>
                              <FormLabel className="form-label">Check out Date & Time</FormLabel>
                              <FormControl>
                              <Input
                                   {...field}
                                   type="datetime-local"
                                   value={field.value ? formatToDateTimeLocalString(new Date(field.value)) : ''}
                                   onChange={(e) => field.onChange(new Date(e.target.value))}
                              />
                              </FormControl>
                              <FormMessage />
                         </FormItem>
                         )}
                    />
                    <Button type="submit" className="w-full bg-purple-1 hover:bg-purple-3">Submit</Button>
               </form>
          </Form>
     )
}