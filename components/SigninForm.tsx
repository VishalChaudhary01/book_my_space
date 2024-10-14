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
          <Form {...form}>
               <form onSubmit={form.handleSubmit(signinHandler)} className="space-y-6">
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
                         <FormItem>
                              <FormLabel className="form-label">Password</FormLabel>
                              <FormControl>
                                   <Input {...field} type="password" placeholder="Password" />
                              </FormControl>
                              <FormMessage />
                         </FormItem>
                         )}
                    />
                    <Button
                         type="submit"
                         disabled={form.formState.isSubmitting}
                         className="w-full bg-purple-1 hover:bg-purple-1 text-base font-semibold"
                    >
                         {form.formState.isSubmitting ? "Please wait..." : "Sign In"}
                    </Button>
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
