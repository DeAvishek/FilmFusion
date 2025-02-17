import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhooksecret=process.env.STRIPE_WEBHOOK_SECRET as string

export async function POST(req:Request,res:NextResponse){
    let event=await req.json()

    if(!event || !webhooksecret){
        return NextResponse.json({mssage:"missing webhook secret"},{
            status:400
        })
    }
    const sig=req.headers.get("strpie-signature")
    try {
        event=stripe.webhooks.constructEvent(
            event,
            sig as string,
            webhooksecret
        )
    } catch (error:unknown) {
        console.log("⚠️  Webhook signature verification failed.")  //todo to remove
        return NextResponse.json({
            message:error || "⚠️  Webhook signature verification failed."
        },{
            status:500
        })
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent=event.data.object as Stripe.PaymentIntent
            console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
            console.log("💰 Payment Successful:", paymentIntent.id);
            break;
        case 'payment_intent.payment_failed':
            const failedPayment=event.data.object  as Stripe.PaymentIntent
            console.log("❌ Payment Failed:",failedPayment.last_payment_error?.message)
        default:
            console.log(`Unhandled event type ${event.type}`);
            break;
    }

    return NextResponse.json({recived:true})

}