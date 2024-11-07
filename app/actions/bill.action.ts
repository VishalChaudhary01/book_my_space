"use server";
import { authOptions } from '@/lib/auth/authOptions';
import prisma from '@/lib/database';
import { handleError } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import Stripe from 'stripe';

export async function checkoutPayment(): Promise<ICheckoutResponse> {
     const session = await getServerSession(authOptions);
     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
     try {
          const user = await prisma.user.findFirst({
               where: { id: session?.user.id ?? "" },
          })
          if (!user) throw new Error("Unauthorized user, Please login first!");
          const checkoutSession = await stripe.checkout.sessions.create({
               payment_method_types: ["card"],
               line_items: [
                 {
                   price_data: {
                     currency: "inr",
                     product_data: {
                       name: "User Bill",
                     },
                     unit_amount: user.bill*100,
                   },
                   quantity: 1,
                 },
               ],
               metadata: { userId: user.id, amount: user.bill },
               mode: "payment",
               success_url: `${process.env.NEXTAUTH_URL}`,
               cancel_url: `${process.env.NEXTAUTH_URL}`,
          });

          return { success: true, url: checkoutSession.url as string };
     } catch (error) {
          return handleError(error);
     }
}

export async function updateUserBill(userId: string): Promise<IResponse> {
     try {
          await prisma.user.update({
               where: { id: userId },
               data: { bill: 0 }
          });
          return { success: true, message: "Payment Successfull"}
     } catch (error) {
          return handleError(error);
     }
}