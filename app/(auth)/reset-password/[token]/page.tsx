import prisma from "@/lib/database";
import { notFound } from "next/navigation";
import { isTokenExpiredUtil } from "@/lib/utils";
import { ResetPassword } from "@/components/ResetPassword";

export default async function ResetPasswordPage({
  params: { token },
}: ResetPasswordPageProps) {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: { token: token },
  });

  if (!verificationToken) notFound();

  if (isTokenExpiredUtil(verificationToken.createdAt)) {
    return <h1>Link has been expired!</h1>;
  }

  const user = await prisma.user.findFirst({
    where: { id: verificationToken.id },
  });

  if (!user) notFound();

  return <ResetPassword token={token} />;
}
