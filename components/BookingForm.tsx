"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { bookRoom } from "@/app/actions/room.action";
import { formatToDateTimeLocalString } from "@/lib/utils";
import { bookRoomSchema, BookRoomSchemaType } from "@/types/room";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const initialValue = {
  roomId: "",
  checkInTime: new Date(),
  checkOutTime: new Date(),
};

export function BookingForm({ roomId }: { roomId: string }) {
  const router = useRouter();
  const form = useForm<BookRoomSchemaType>({
    resolver: zodResolver(bookRoomSchema),
    defaultValues: initialValue,
  });

  async function bookingHandler(data: BookRoomSchemaType) {
    if (
      data.checkInTime.getTime() < new Date().getTime() ||
      data.checkOutTime.getTime() <= data.checkInTime.getTime()
    ) {
      toast.error("Please select a valid date");
      return;
    }

    const response = await bookRoom({ ...data, roomId });
    if (response.success) {
      toast.success("Room booking successful");
      router.push("/rooms/booked");
      router.refresh();
    } else {
      console.error(response);
      toast.error(response.error || "Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(bookingHandler)}
        className="space-y-6 my-4 border-2 border-purple-2 dark:border-dark-1/50 min-w-80 rounded-md shadow-sm p-4 lg:px-8"
      >
        <h3 className="h3 text-center">Select time in multiple of hours!</h3>
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
                  value={
                    field.value
                      ? formatToDateTimeLocalString(new Date(field.value))
                      : ""
                  }
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
              <FormLabel className="form-label">
                Check out Date & Time
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="datetime-local"
                  value={
                    field.value
                      ? formatToDateTimeLocalString(new Date(field.value))
                      : ""
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? "Please wait..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
