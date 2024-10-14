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
import { signupSchema, SignupSchemaType } from "@/types/user";
import { signup } from "@/app/actions/auth.action";

export function SignupForm() {
     const router = useRouter();

     const form = useForm<SignupSchemaType>({
          resolver: zodResolver(signupSchema),
          defaultValues: {
               name: "",
               email: "",
               password: "",
          },
     });

     async function signupHandler(data: SignupSchemaType) {
          try {
               const registerUser = await signup(data);
               if (registerUser.success) {
                    const response = await signIn("credentials", { ...data, redirect: false });
                    if (!response?.ok) {
                         return toast.error(response?.error || "Something went wrong, Please try again!");
                    } else {
                         toast.success("Signup successful");
                         router.push("/");
                    }
               }
          } catch (error: any) {
               console.error(error);
               return toast.error(error.message || "Internal server error");
          }
     }

     return (
          <>
               <Form {...form}>
                    <form onSubmit={form.handleSubmit(signupHandler)} className="space-y-6">
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
                              {form.formState.isSubmitting ? "Please wait..." : "Sign Up"}
                         </Button>
                    </form>
               </Form>
               <div className="flex items-center justify-center mt-6">
                    <span className="text-muted-foreground">
                         Already have an account?{" "}
                         <Link href="/signin" className="text-muted-foreground font-semibold hover:underline">
                              Sign In
                         </Link>
                    </span>
               </div>
          </>
     );
}
