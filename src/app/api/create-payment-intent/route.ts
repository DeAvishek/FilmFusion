import { NextRequest, NextResponse } from "next/server"

const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)  //todo to remove
export async function POST(req:NextRequest) {
    try {
        const paymentIntent=await stripe.paymentIntents.create({
            amount:50*100,  //convert to paisa 
            currency:"INR",
            // payment_method_types: ["card", "upi", "netbanking"],
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
