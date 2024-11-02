import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth"
import bcrypt from "bcrypt";
import prisma from "../database";
import { signinSchema } from "@/types/user";

export const authOptions = { 
     providers: [
          GoogleProvider({
               clientId: process.env.GOOGLE_CLIENT_ID as string,
               clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          }),
          CredentialsProvider({
               name: "credentials",
               credentials: {
                    email: { label: "Email", type: "text" },
                    password: { label: "Password", type: "password" }
               },
               async authorize(credentials): Promise<any> {
                    const { data, error } = signinSchema.safeParse(credentials);
                    if (error) throw new Error(error.issues[0].message || "Invalid input")
                    const user = await prisma.user.findUnique({
                         where: {
                              email: data.email,
                              emailVerified: { not: null }
                         }
                    });
                    if (!user ) throw new Error("User not found");
                    if (!user.password) throw new Error("You are signed up with a different provider, try signing in with Google!")
                    const verifyPassword = await bcrypt.compare(data.password, user.password);
                    if (!verifyPassword) throw new Error("Incorrect password")
                    return {
                         id: user.id,
                         name: user.name,
                         email: user.email
                    }
               }
          })
     ],
     secret: process.env.NEXTAUTH_SECRET || "secret",
     pages: {
          signIn: "/signin"
     },
     callbacks: {
          async signIn({user, account, profile}) {
               if (account?.provider === 'google' && profile) {
                    const { id: oauthId, email, name } = user;
                    const existingUser = await prisma.user.findFirst({
                         where: {
                              OR: [{email: email! }, { oauthId: oauthId! }],
                         }
                    });
                    if (!existingUser) {
                         const newUser = await prisma.user.create({
                              data: {
                                   oauthId,
                                   oauthProvider: "GOOGLE",
                                   email: email as string,
                                   name: name as string,
                                   isVerified: true,
                                   emailVerified: new Date()
                              }
                         });
                         user.id = newUser.id;
                    } else {
                         user.id = existingUser.id;
                    }
               }
               return true;
          },
          async jwt({ token }) {
               return token;
          },
          async session({ token, session }) {
               if (token.sub && session.user) {
                    session.user.id = token.sub
               }
               return session;
          },
     }
} satisfies NextAuthOptions;