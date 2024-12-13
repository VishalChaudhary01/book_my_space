"use client";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { RoomImage } from "./RoomImage";
import { File, Plus, X } from "lucide-react";

type MediaUploaderProps = {
  image: any;
  setImage: React.Dispatch<any>;
  publicId?: string;
};

export function MediaUploader({
  image,
  setImage,
  publicId,
}: MediaUploaderProps) {
  function onUploadSuccess(result: any) {
    setImage(result.info);
  }

  function onUploadError() {
    toast.error("Error while uploading image");
  }

  function handleRemoveImage() {
    setImage(null);
  }
  return (
    <>
      {!publicId ? (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}
          options={{
            multiple: false,
            resourceType: "image",
          }}
          onSuccess={onUploadSuccess}
          onError={onUploadError}
        >
          {({ open }) => (
            <div className="w-full">
              {image?.display_name ? (
                <div className="flex-center">
                  <File width={24} height={24} className="text-black dark:text-dark-1"/>
                  <p className="text-sm font-medium">
                    {image.display_name}.{image.format}
                  </p>
                  <Button
                    onClick={handleRemoveImage}
                    variant="ghost"
                    size="icon"
                    className="dark:hover:bg-dark-3"
                  >
                    <X width={24} height={24} />
                  </Button>
                </div>
              ) : (
                <div
                  onClick={() => open()}
                  className="cursor-pointer flex flex-col w-full gap-2 justify-center items-center"
                >
                  <Button variant="ghost" type="button" size="icon" className="dark:hover:bg-dark-3">
                    <Plus width={24} height={24} />
                  </Button>
                  <p>Click here to upload image</p>
                </div>
              )}
            </div>
          )}
        </CldUploadWidget>
      ) : (
        <RoomImage src={publicId} />
      )}
    </>
  );
}
