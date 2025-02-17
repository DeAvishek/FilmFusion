import {  NextResponse } from "next/server"
import Stripe from "stripe"

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY!) 
export async function POST() {
    try {
        const paymentIntent=await stripe.paymentIntents.create({
            amount:50*100,  //convert to paisa 
            currency:"INR",
            // payment_method_types: ["card"],
            automatic_payment_methods: {
                enabled: true,
              },
    
        })
            return new Response(JSON.stringify({
            clientsecret:paymentIntent.client_secret
        }),{
            status:200
        })

        
    } catch (error:unknown) {
        return NextResponse.json({error:error instanceof Error ? error.message : "stripe payment intent error"},
            {
                status:500
            }
        )
    }
    

}
