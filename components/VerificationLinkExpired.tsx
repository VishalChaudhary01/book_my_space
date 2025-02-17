"use client";
import { useState } from "react";
import { toast } from "sonner";
import { verifyEmail } from "@/app/actions/auth.action";
import { Button } from "./ui/button";

export function VerificationLinkExpired({ token }: { token: string }) {
  const [isMail, setIsMail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleResendMail() {
    setIsSubmitting(true);
    if (token) {
      const res = await verifyEmail({ token, resend: true });
      console.log(res);
      if (res.success) {
        setIsMail(true);
      } else {
        console.error(res?.error);
        toast.error(res?.error || "Something went wrong!");
      }
    }
    setIsSubmitting(false);
  }

  return (
    <div className="text-base font-medium text-gray-700">
      {isMail ? (
        <p>
          We’ve sent a confirmation email to your inbox. Please confirm your
          email address to activate your account.
        </p>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4">
          <p>
            The verification link has expired or is invalid. Please request a
            new verification link.
          </p>
          <Button onClick={handleResendMail} disabled={isSubmitting}>
            {isSubmitting ? "Please wait..." : "Resend Verification Email"}
          </Button>
        </div>
      )}
      ;
    </div>
  );
}
