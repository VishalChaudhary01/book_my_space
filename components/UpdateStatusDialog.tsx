"use client";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { updateStatusSchema, UpdateStatusSchemaType } from "@/types/room";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateStatus } from "@/app/actions/room.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UpdateBookingFormProps {
     id: string;
     status: "Success" | "Confirm" | "Pending";
     setOpen: (o: boolean) => void;
}

export function UpdateBookingForm({ id, setOpen, status }: UpdateBookingFormProps) {
     const router = useRouter();
     const form = useForm<UpdateStatusSchemaType>({
          resolver: zodResolver(updateStatusSchema),
          defaultValues: {
               bookingId: id,
               status: status,
          }
     });

     async function handleUpdate(data: UpdateStatusSchemaType) {
          setOpen(false);
          const response = await updateStatus(data);
          if (response.success) {
               toast.success("Status updated");
               router.refresh();
          } else {
               console.error(response.error);
               toast.error(response.error || "Something went wrong, Please try again!");
          }
     }

  return (
     <Form {...form}>
     <form onSubmit={form.handleSubmit(handleUpdate)}>
          <FormField
               control={form.control}
               name="status"
               render={({ field }) => (
                    <FormItem>
                         <FormLabel className="text-xl font-bold text-gray-600">Pick Updated status</FormLabel>
                         <FormControl>
                              <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-2">
                                   <FormItem className={`px-4 py-1 cursor-pointer rounded-md ${field.value === "Pending" ? "bg-blue-500 text-white" : "bg-gray-100"}`}>
                                        <RadioGroupItem
                                             value="Pending"
                                             id="r1"
                                             className="sr-only"
                                        />
                                        <FormLabel htmlFor="r1" className="cursor-pointer">Pending</FormLabel>
                                   </FormItem>
                                   <FormItem className={`px-4 py-1 cursor-pointer rounded-md ${field.value === "Confirm" ? "bg-yellow-500 text-white" : "bg-gray-100"}`}>
                                        <RadioGroupItem
                                             value="Confirm"
                                             id="r2"
                                             className="sr-only"
                                        />
                                        <FormLabel htmlFor="r2" className="cursor-pointer">Confirm</FormLabel>
                                   </FormItem>
                                   <FormItem className={`px-4 py-1 cursor-pointer rounded-md ${field.value === "Success" ? "bg-green-500 text-white" : "bg-gray-100"}`}>
                                        <RadioGroupItem
                                             value="Success"
                                             id="r3"
                                             className="sr-only"
                                        />
                                        <FormLabel htmlFor="r3" className="cursor-pointer">Success</FormLabel>
                                   </FormItem>
                              </RadioGroup>
                         </FormControl>
                         <FormMessage />
                    </FormItem>
               )}
          />
          <Button type="submit" className="mt-4 w-full bg-purple-1 hover:bg-purple-3">Update</Button>
     </form>
     </Form>
  )
}
