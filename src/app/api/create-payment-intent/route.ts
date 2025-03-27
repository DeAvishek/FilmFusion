import {  NextResponse } from "next/server"
import Stripe from "stripe"

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY!) 
export async function POST() {
    try {
        const paymentIntent=await stripe.paymentIntents.create({
            amount:50*100,  //convert to paisa 
            currency:"INR",
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

// import Razorpay from "razorpay"
// import crypto from "crypto"
// import { NextResponse } from "next/server"

// const razorpay=new Razorpay({

// })
// export async function POST(req:Request) {
//     const reqBody=await req.json()
//     const {amount,currency}=reqBody
//     try {
//         const order=await razorpay.orders.create({
//             amount:amount*100,
//             currency,
//             receipt:crypto.randomBytes(10).toString('hex')
//         })

//         return NextResponse.json({
//             order:order,
//             success:true
//         },{
//             status:200
//         })
//     } catch (error) {
//         return NextResponse.json({
//             message: error instanceof Error ? error.message : "An unknown error occurred",
//             success: false,
//           }, {
//             status: 500,
//           });
//     }
// }
