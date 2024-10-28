"use client";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { forgetPassword } from "@/app/actions/auth.action";
import { toast } from "sonner";
import { ConfirmationDialog } from "./ConfirmationDialog";

export function ForgetPassword() {
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await forgetPassword({ email });
    if (res.success) {
      setOpenDialog(true);
      toast.success(res.message);
    } else {
      console.error(res?.error);
      toast.error(res?.error || "Something went wrong!");
    }
    setIsSubmitting(false);
  }

  return (
    <div>
      <h2 className="flex-center text-2xl text-gray-600 font-bold mb-4">
        Forget Password?
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Label htmlFor="email" className="form-label">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Enter your registerd email"
          required={true}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button type="submit" disabled={isSubmitting} className="mt-4">
          {isSubmitting ? "Please wait..." : "Submit"}
        </Button>
      </form>
      {openDialog && <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} title="A link has been send to your email address." desc="Go to your email address and click the link to generate new password." />}
    </div>
  );
}
