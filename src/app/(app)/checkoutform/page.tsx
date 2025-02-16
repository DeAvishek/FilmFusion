'use client'
import React, { useState } from 'react'
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
const Checkoutform = () => {
    const stripe = useStripe()
    const elements = useElements()
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
        })
        if (result.error) {
            console.log(result.error.message) //todo remove
            seterrors(result.error.message || "payment failed")
            setloading(false)
        } else {
            console.log("Payment successful") //todo remove
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <PaymentElement />
                {errors && <p className="text-red-500 mt-2">{errors}</p>}
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
                >
                    {loading ? "Processing..." : "Pay Now"}
                </button>
            </form>

        </div>
    )
}

export default Checkoutform
