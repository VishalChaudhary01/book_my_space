"use server";
import prisma from "@/lib/database";
import bcrypt from "bcrypt";
import { handleError } from "@/lib/utils";
import { signupSchema, SignupSchemaType } from "@/types/user";

export async function signup({ name, email, password }: SignupSchemaType) {
     try {
          const { data, error } = signupSchema.safeParse({ name, email, password });
          if (error) throw new Error(error.issues[0]?.message || "Invalid input");
          const exist = await prisma.user.findFirst({
               where: { email: data.email }
          });
          if (exist) throw new Error("Email is already registerd");
          const hashPassword = await bcrypt.hash(data.password, 10);
          await prisma.user.create({
               data: {
                    name: data.name,
                    email: data.email,
                    password: hashPassword,
               }
          });
          return { success: true }
     } catch (error) {
          handleError(error);
          return { success: false }
     }
}