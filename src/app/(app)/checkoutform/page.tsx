'use client'
import React, { useState } from 'react'
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import {handle_Seat_status_post} from "@/app/functions/bookingAndseatsUpdate"
import { useRouter } from 'next/navigation'
import TheaterDataStore from '@/app/store/theaterStore'
import PriceStore from '@/app/store/ticPriceStore'
type theater_dataPrpop={
    seats:[string],
    theaterId:string,
    name:string
  }
const Checkoutform = ({ amount }: { amount: number }) => {
    const router=useRouter()
    const stripe = useStripe()
    const elements = useElements()
    const {price} = PriceStore()
    const theaterData=TheaterDataStore() as theater_dataPrpop //todo to update

    const [errors, seterrors] = useState('')
    const [loading, setloading] = useState(false)
    
    const handleSubmit = async (e: React.FormEvent) => {
        setloading(true)
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/success-payment",
            },
            redirect:"if_required"
        })
        if (result.error) {
            seterrors(result.error.message || "payment failed")
            setloading(false)
        } else {
            const paymentintent=result.paymentIntent
            if(paymentintent && paymentintent.status==="succeeded"){
                try {
                    await handle_Seat_status_post(theaterData, price,result.paymentIntent.id)
                    router.push('/success-payment')
                } catch (error) {
                    console.error("❌ Failed to update seat status:", error);
                }
            }else{
                seterrors("Unexpected payment status.");
                console.log("🔁 PaymentIntent status:", paymentintent?.status);
            }
        }
    }
    return (
        <div>
            <h2 className='text- animate-pulse '>This may take few seconds Don't refresh....</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <PaymentElement />
                {errors && <p className="text-red-500 mt-2">{errors}</p>}
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
                >
                    {loading ? "Processing..." : `Pay ₹${amount}`}
                </button>
            </form>

        </div>
    )
}

export default Checkoutform
