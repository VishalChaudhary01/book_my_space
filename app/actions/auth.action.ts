"use server";
import prisma from "@/lib/database";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { signupSchema, SignupSchemaType } from "@/types/user";
import { sendConfirmationEmail } from "@/lib/auth/sendConfirmationEmail";
import { handleError, isTokenExpiredUtil } from "@/lib/utils";
import { TokenType } from "@prisma/client";

export async function signup(inputData: SignupSchemaType): Promise<IResponse> {
     try {
          const result = signupSchema.safeParse(inputData);
          if (!result.success) throw new Error(result.error.issues[0]?.message || "Invalid input");
          const { name, email, password } = result.data;
          const exist = await prisma.user.findFirst({
               where: { email },
          });
          if (exist) throw new Error("Email is already registerd");
          const hashPassword = await bcrypt.hash(password, 10);

          await prisma.$transaction(
               async(txn) => {
                    const user = await txn.user.create({
                         data: { name, email, password: hashPassword },
                    });
                    
                    const verificationToken = await txn.verificationToken.create({
                         data: {
                              id: user.id,
                              token: uuidv4(),
                              type: "EMAIL_VERIFICATION",
                         }
                    });

                    const confirmationLink = `${process.env.NEXTAUTH_URL}/verify-email/${verificationToken.token}`;
                    
                    await sendConfirmationEmail(
                         email,
                         confirmationLink,
                         "EMAIL_VERIFICATION",
                    );

                    return user;
               },
               {
                    maxWait: 5000,
                    timeout: 20000
               }
          );

          return { success: true, message: "User registered successfully. A verification link has been sent to your email." };
     } catch (error) {
          return handleError(error);
     }
}

async function resendVerificationLink({ userId, email, prevToken, reIssue=false, type }: { userId: string; email: string; prevToken: string; reIssue?: boolean; type: TokenType }) {
     try {
          const newToken = uuidv4();
          await prisma.verificationToken.update({
               where: {
                    token_id: {
                         id: userId,
                         token: prevToken,
                    },
                    type,
               },
               data: {
                    token: newToken,
                    ...(reIssue ? { createAt: new Date() } : {}),
               }
          });
          const confirmationLink = `${process.env.NEXTAUTH_URL}/verify-email/${newToken}`;
          await sendConfirmationEmail(email, confirmationLink, type);
     } catch (error) {
          return handleError(error);
     }
}


// It is serving two purpose/
// 1. Email verification
// 2. In case link got expired, by passing resend:true will be re-usable to re-issue the verfication link
export async function verifyEmail({ token, resend=false }: { token: string, resend?: boolean }): Promise<IResponse> {
     try {
          const verificationToken = await prisma.verificationToken.findFirst({
               where: {
                    token,
                    type: "EMAIL_VERIFICATION",
               },
          });
          if (!verificationToken) throw new Error("Resource not found!");

          if (!isTokenExpiredUtil(verificationToken.createdAt)) {
               await prisma.$transaction(async (txn) => {
                    await txn.user.update({
                         where: { id: verificationToken.id },
                         data: { emailVerified: new Date(), isVerified: true },
                    });
                    await txn.verificationToken.delete({
                         where: {
                              token_id: {
                                   token: verificationToken.token,
                                   id: verificationToken.id,
                              },
                         },
                    });
                    return true;
               });
               return {
                    success: true, 
                    message: "Email verified successfully!"
               }
          }

          if (!resend) throw new Error("Link expired!");

          const unverifiedUser = await prisma.user.findFirst({
               where: { id: verificationToken.id },
          });
          
          await resendVerificationLink({
               email: unverifiedUser!.email,
               prevToken: verificationToken.token,
               userId: unverifiedUser!.id,
               reIssue: true,
               type: "EMAIL_VERIFICATION",
          });
          return {
               success: true,
               message: "Verfication link resent successfully!",
          }
     } catch (error) {
          return handleError(error);
     }
}

export async function forgetPassword({ email }: { email: string }): Promise<IResponse> {
     try {
          const user = await prisma.user.findFirst({ where: { email }});
          if (!user) throw new Error("No account associated with this email address.");

          const verificationToken = await prisma.verificationToken.create({
               data: {
                    type: "RESET_PASSWORD",
                    token: uuidv4(),
                    id: user.id,
               },
          });
          const resetPasswordLink = `${process.env.NEXTAUTH_URL}/reset-password/${verificationToken.token}`;

          await sendConfirmationEmail(email, resetPasswordLink, "RESET_PASSWORD");

          return {
               success: true,
               message: "A password reset link has been sent to your email. Please check your inbox."
          }
     } catch (error) {
          return handleError(error);
     }
}


export async function resetPassword({ token, password }: { token: string, password: string }): Promise<IResponse> {
     try {
          const verificationToken = await prisma.verificationToken.findFirst({
               where: { token },
          });
          if (!verificationToken) throw new Error("Invalid or expired reset link.");

          if (isTokenExpiredUtil(verificationToken.createdAt)) 
               throw new Error("The reset link has expired. Please request a new one.");
          
          const user = await prisma.user.findFirst({
               where: { id: verificationToken.id },
          });
          if (!user) throw new Error("Unauthorized access, User not found.");

          await prisma.$transaction(async (txn) => {
               await txn.user.update({
                    where: { id: verificationToken.id },
                    data: {
                         password: await bcrypt.hash(password, 10),
                    },
               });
               
               await txn.verificationToken.delete({
                    where: {
                         token_id: {
                              token: verificationToken.token,
                              id: verificationToken.id,
                         },
                    },
               });
          });
          return {
               success: true,
               message: "Your password has been successfully updated.",
          }
     } catch (error) {
         return handleError(error);
     }
}