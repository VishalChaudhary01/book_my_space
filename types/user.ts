import { z } from "zod";

export const signinSchema = z.object({
     email: z.string().min(1, "Email is required").email().trim(),
     password: z.string().min(1, "Password is required").max(25, "Password is too long"),
});

export const signupSchema = z.object({
     name: z.string().min(1, "Name is required"),
     email: z.string().min(1, "Email is requreid").email().trim(),
     password: z.string().min(1, "Password is required").max(25, "Password is too long"),
});

export const resetPasswordSchema = z.object({
     password: z.string().min(1, "Password is required"),
     confirmPassword: z.string().min(1, "Confirm password is required")
})

export type SignupSchemaType = z.infer<typeof signupSchema>;
export type SigninSchemaType = z.infer<typeof signinSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;