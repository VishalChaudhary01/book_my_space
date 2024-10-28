"use client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { resetPassword } from "@/app/actions/auth.action";
import { useForm } from "react-hook-form";
import { resetPasswordSchema, ResetPasswordSchemaType } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { PasswordInput } from "./PasswordInput";
import { useRouter } from "next/navigation";

export function ResetPassword({ token }: { token: string }) {
     const router = useRouter();
     const form = useForm<ResetPasswordSchemaType>({
          resolver: zodResolver(resetPasswordSchema),
          defaultValues: {
               password: "",
               confirmPassword: "",
          }
     })
     
     async function handleReset(data: ResetPasswordSchemaType) {
          if (data.password !== data.confirmPassword) {
               return toast.error("Password and Confirm Password are not same");
          }
          const res = await resetPassword({ token, password: data.password });
          if (res.success) {
               toast.success(res.message);
               router.push("/signin");
          } else {
               console.error(res);
               toast.error(res?.error || "Something went wrong!");
          }
     }

     return (
          <Form {...form}>
               <form onSubmit={form.handleSubmit(handleReset)} className="space-y-4">
                    <div className="flex-center text-xl font-bold text-gray-600 mb-4">
                         Enter new Password
                    </div>
                    <FormField
                         control={form.control}
                         name="password"
                         render={({ field }) => (
                              <FormItem>
                                   <FormLabel className="form-label">Password</FormLabel>
                                   <FormControl>
                                        <PasswordInput field={field} placeholder="Enter new password" />
                                   </FormControl>
                                   <FormMessage />
                              </FormItem>
                         )}
                    />
                    <FormField
                         control={form.control}
                         name="confirmPassword"
                         render={({ field }) => (
                              <FormItem>
                                   <FormLabel className="form-label">Confirm Password</FormLabel>
                                   <FormControl>
                                        <PasswordInput field={field} placeholder="Enter confirm password" />
                                   </FormControl>
                                   <FormMessage />
                              </FormItem>
                         )}
                    />
                    <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                         {form.formState.isSubmitting ? "Please wait..." : "Submit"}
                    </Button>
               </form>
          </Form>
     )
}