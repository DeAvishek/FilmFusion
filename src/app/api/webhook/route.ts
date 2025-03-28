import Stripe from "stripe";
import { NextResponse } from "next/server";
import { Readable } from "stream";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parsing
  },
};

async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(req: Request) {
  if (!webhookSecret) {
    return NextResponse.json(
      { message: "Webhook secret not configured" },
      { status: 400 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { message: "No Stripe signature header found" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  let rawBody: Buffer;

  try {
    rawBody = await getRawBody(Readable.from(req.body as any));
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed.`, err);
    return NextResponse.json(
      { message: `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}` },
      { status: 400 }
    );
  }

  // Process the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`💰 Payment succeeded: ${paymentIntent.id}`);
      break;
    case 'checkout.session.completed':
      const payment_intent = event.data.object
      console.log(payment_intent.id)
      break;
    // Add other event types as neededs
    default:
      console.log(`🔔 Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
