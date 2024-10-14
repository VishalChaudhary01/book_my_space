import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth"
import bcrypt from "bcrypt";
import prisma from "../database";
import { signinSchema } from "@/types/user";
import { handleError } from "../utils";

export const authOptions = { 
     providers: [
          CredentialsProvider({
               name: "credentials",
               credentials: {
                    email: { label: "Email", type: "text" },
                    password: { label: "Password", type: "password" }
               },
               async authorize(credentials: any) {
                    const { email, password } = credentials;
                    try {
                         const { data, error } = signinSchema.safeParse({ email, password });
                         if (error) throw new Error(error.issues[0].message || "Invalid input")
                         const user = await prisma.user.findFirst({
                              where: {
                                   email: data.email,
                              }
                         });
                         if (!user) throw new Error("User not found");
                         const verifyPassword = await bcrypt.compare(data.password, user.password);
                         if (!verifyPassword) throw new Error("Incorrect password")
                         return {
                              id: user.id.toString(),
                              name: user.name,
                              email: user.email
                         }
                    } catch (error) {
                         handleError(error);
                         return null;
                    }
               }
          })
     ],
     secret: process.env.NEXTAUTH_SECRET || "secret",
     pages: {
          signIn: "/auth/signin"
     },
     callbacks: {
          async session({ token, session }: any) {
               session.user.id = token.sub
               return session;
          }
     }
} satisfies NextAuthOptions;