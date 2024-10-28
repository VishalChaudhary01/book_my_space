import { ResetPassword } from "@/components/ResetPassword";
import prisma from "@/lib/database";
import { isTokenExpiredUtil } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function ResetPasswordPage({ params: { token } }: { params: { token: string } }) {
     const verificationToken = await prisma.verificationToken.findFirst({
          where: { token }
     });
     if (!verificationToken) notFound();

     if (isTokenExpiredUtil(verificationToken.createdAt)) return <h1>Link has been expired!</h1>

     const user = await prisma.user.findFirst({
          where: { id: verificationToken.id }
     });
     if (!user) notFound();

     return <ResetPassword token={token} />
}