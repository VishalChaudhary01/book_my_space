"use client";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { signinSchema, SigninSchemaType } from "@/types/user";
import { GoogleOauthButton } from "./social-auth";
import { PasswordInput } from "./PasswordInput";

export function SigninForm() {
     const router = useRouter();

     const form = useForm<SigninSchemaType>({
          resolver: zodResolver(signinSchema),
               defaultValues: {
                    email: "",
                    password: "",
               },
     });

     async function signinHandler(data: SigninSchemaType) {
          try {
               const response = await signIn("credentials", { ...data, redirect: false });
               if (!response?.ok) {
                    return toast.error(response?.error || "Something went wrong, Please try again!");
               } else {
                    toast.success("Signin successful, Welcome back!");
                    router.push("/");
               }
          } catch (error) {
               console.error(error);
               return toast.error("Internal server error");
          }
     }

     return (
     <>
          <h2 className="h2 my-6">Welcome back!</h2>
          <Form {...form}>
               <form onSubmit={form.handleSubmit(signinHandler)} className="flex flex-col gap-4">
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
                                   href={'/forget-password'}
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
                         {form.formState.isSubmitting ? "Please wait..." : "Sign In"}
                    </Button>
                    <GoogleOauthButton label="Sign in with Google" />
               </form>
          </Form>
          <div className="flex items-center justify-center mt-6">
               <span className="text-muted-foreground">
                    Don&apos;t have an account yet?{" "}
                    <Link href="/signup" className="text-muted-foreground font-semibold hover:underline">
                         Sign Up
                    </Link>
               </span>
          </div>
     </>
     );
}
