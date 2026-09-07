/* eslint-disable camelcase */
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "@/lib/database/mongoose";
import User from "@/lib/database/models/user.model";
import Transaction from "@/lib/database/models/transaction.model";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = Stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ message: "Webhook signature error", error: String(err) }, { status: 400 });
  }

  console.log("Stripe webhook received:", event.type);

  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    const clerkId = metadata?.buyerId;
    const credits = Number(metadata?.credits) || 0;
    const plan = metadata?.plan || "";
    const amount = amount_total ? amount_total / 100 : 0;

    console.log("Checkout completed:", { clerkId, credits, plan, amount, stripeId: id });

    if (!clerkId) {
      console.error("Missing buyerId in metadata");
      return NextResponse.json({ message: "Missing buyerId in metadata" }, { status: 400 });
    }

    try {
      await connectToDatabase();

      const user = await User.findOne({ clerkId });
      if (!user) {
        console.error("User not found for clerkId:", clerkId);
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      console.log("User found, current balance:", user.creditBalance, "adding:", credits);

      const newTransaction = await Transaction.create({
        stripeId: id,
        amount,
        plan,
        credits,
        buyer: user._id,
        createdAt: new Date(),
      });

      user.creditBalance += credits;
      await user.save();

      console.log("Credits added successfully. New balance:", user.creditBalance);

      return NextResponse.json({ message: "OK", transaction: newTransaction, newCreditBalance: user.creditBalance });
    } catch (error) {
      console.error("Transaction creation failed:", error);
      return NextResponse.json({ message: "Transaction failed", error: String(error) }, { status: 500 });
    }
  }

  return new Response("", { status: 200 });
}