"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signup } from "@/app/actions/auth.action";
import { signupSchema, SignupSchemaType } from "@/types/user";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PasswordInput } from "./PasswordInput";
import { GoogleOauthButton } from "./social-auth";
import { ConfirmationDialog } from "./ConfirmationDialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

export function SignupForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function signupHandler(data: SignupSchemaType) {
    const registerUser = await signup(data);
    if (registerUser.success) {
      toast.success(registerUser.message);
      setOpenDialog(true);
    } else {
      toast.error(registerUser.error || "Error while signup");
    }
  }

  return (
    <>
      <h2 className="h2 my-6">Most Welcome!</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(signupHandler)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">User Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your full name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Email address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="name@gmail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="form-label">Password</FormLabel>
                <FormControl>
                  <PasswordInput field={field} placeholder="Password" />
                </FormControl>
                <Link
                  href={"/forget-password"}
                  className="absolute bottom-0 transform translate-y-6 right-0 text-muted-foreground text-base hover:underline"
                >
                  Forget Password?
                </Link>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full mt-4"
          >
            {form.formState.isSubmitting ? "Please wait..." : "Sign Up"}
          </Button>
          <GoogleOauthButton label="Sign up with Google" />
        </form>
      </Form>
      <div className="flex items-center justify-center mt-6">
        <span className="text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-muted-foreground font-semibold hover:underline"
          >
            Sign In
          </Link>
        </span>
      </div>
      {openDialog && (
        <ConfirmationDialog
          open={openDialog}
          setOpen={setOpenDialog}
          title="Email han been registered successfully,"
          desc="Please go to your email address and click the confirmation link to activate your account."
        />
      )}
    </>
  );
}
