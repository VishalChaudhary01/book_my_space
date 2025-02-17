"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { addRoomFormElements } from "@/config";
import { addRoomSchema, AddRoomSchemaType } from "@/types/room";
import { MediaUploader } from "@/components/MediaUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addRoom, updateRoom, uploadImage } from "@/app/actions/room.action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function RoomForm({ room, roomId }: RoomFormProps) {
  const router = useRouter();
  const [image, setImage] = useState<any>(room?.image || null);
  const publicId = room?.image;

  const initialValue = {
    name: room?.name || "",
    image: room?.image || "",
    pricePerHour: room?.pricePerHour || 0,
    pricePerDay: room?.pricePerDay || 0,
    pricePerMonth: room?.pricePerMonth || 0,
    lengthInFeet: room?.lengthInFeet || 0,
    widthInFeet: room?.widthInFeet || 0,
    address: room?.address || "",
    city: room?.city || "",
    state: room?.state || "",
    pin: room?.pin || 0,
    description: room?.description || "",
  };

  const form = useForm<AddRoomSchemaType>({
    resolver: zodResolver(addRoomSchema),
    defaultValues: initialValue,
  });

  async function addRoomHandler(data: AddRoomSchemaType) {
    try {
      if (image && !roomId) {
        const uploadedImage = await uploadImage(image);
        if (uploadedImage.publicId) {
          const response = await addRoom({
            ...data,
            image: uploadedImage.publicId,
          });
          console.log(response);
          if (response.success) {
            toast.success("Room added successfully");
            router.push("/rooms/rented");
          } else {
            console.error(response);
            toast.error(response.error || "Error while adding room");
          }
        } else {
          console.error(uploadedImage);
          toast.error("Error while uploading image");
        }
      } else if (roomId) {
        const response = await updateRoom({ ...data }, roomId);
        if (response.success) {
          toast.success("Room updated successfully");
          router.push("/rooms/rented");
        } else {
          console.error(response);
          toast.error("Error while updating room");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal server error");
    }
  }

  return (
    <div className="flex-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(addRoomHandler)}
          className="space-y-4 w-[340px] md:w-full md:max-w-2xl border-2 border-purple-2 dark:border-dark-2 rounded-lg shadow-md p-4"
        >
          <div className="flex-center border border-purple-2 dark:border-dark-2 p-4">
            <MediaUploader
              image={image}
              setImage={setImage}
              publicId={publicId}
            />
          </div>
          {addRoomFormElements.map((formElement) => (
            <FormField
              key={formElement.name}
              control={form.control}
              name={formElement.name as keyof AddRoomSchemaType}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">
                    {formElement.label}
                  </FormLabel>
                  <FormControl>
                    <>
                      {formElement.componentType === "input" && (
                        <Input
                          {...field}
                          type={formElement.type}
                          placeholder={formElement.placeholder}
                        />
                      )}
                      {formElement.componentType === "textarea" && (
                        <Textarea
                          {...field}
                          placeholder={formElement.placeholder}
                        />
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting ? "Please wait..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
