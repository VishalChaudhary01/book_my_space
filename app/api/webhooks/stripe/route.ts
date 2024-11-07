import { updateUserBill } from "@/app/actions/bill.action";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request:Request) {
     const body = await request.text();
     const sig = request.headers.get("stripe-signature") as string;
     const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

     let event;
     try {
          event = stripe.webhooks.constructEvent(body, sig, endPointSecret);
     } catch (error) {
          return NextResponse.json({ message: "Webhook error", error });
     }
     
     const eventType = event.type;
     if (eventType === "checkout.session.completed") {
          const userId = event?.data?.object?.metadata?.userId as string;
          await updateUserBill(userId);
          return NextResponse.json({ message: "OK" })
     }
     return new Response("", { status: 200 });
}