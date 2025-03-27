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

// "use client";
// import React, { useState } from "react";
// import Razorpay from "razorpay";
// const CheckoutForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handlePayment = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       // Create order on the server
//       const response = await fetch("/api/order", {
//         method: "POST",
//         body: JSON.stringify({ amount: 500, currency: "INR" }),
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await response.json();
//       if (!data.success) {
//         throw new Error(data.message || "Failed to create order");
//       }

//       const { order } = data;

//       // Load Razorpay Checkout script
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       document.body.appendChild(script);

//       script.onload = () => {
//         const options = {
//           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//           amount: order.amount,
//           currency: order.currency,
//           order_id: order.id,
//           name: "FilmFusion",
//           description: "Movie Ticket Booking",
//           handler: (response: any) => {
//             alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
//           },
//           prefill: {
//             name: "Avishek Patra",
//             email: "patraavishek881@gmail.com",
//             contact: "8116698594",
//           },
//           theme: {
//             color: "#3399cc",
//           },
//         };

//         const razorpay = new window.Razorpay(options);
//         razorpay.open();
//       };

//       script.onerror = () => {
//         setError("Failed to load Razorpay. Please try again.");
//       };
//     } catch (error) {
//       setError(error instanceof Error ? error.message : "An unexpected error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={handlePayment}
//         disabled={loading}
//         className="bg-blue-500 text-white p-2 rounded"
//       >
//         {loading ? "Processing..." : "Pay ₹500"}
//       </button>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// };

// export default CheckoutForm;
