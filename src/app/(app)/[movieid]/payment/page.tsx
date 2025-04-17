'use client'
import axios from "axios"
import { useEffect,useState } from "react"
import  {loadStripe} from "@stripe/stripe-js"
import  {Elements} from "@stripe/react-stripe-js"
import { StripeElementsOptions } from "@stripe/stripe-js";
import Checkoutform from "@/app/(app)/checkoutform/page"
import PriceStore from "@/app/store/ticPriceStore"
import {LucideLoaderCircle} from "lucide-react" 
const stripePromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!)
const CheckoutPage = () => {
const [clientsecret, setclientsecret] = useState<string |null>('')
const [responseMessage,setresponseMessage]=useState('')
const {price} =PriceStore()
const data={
  amount:price,
  currency:'INR'
}
useEffect( () => {
  async function getclientsecret(){
    try {
        const response = await axios.post('/api/create-payment-intent',data) 
        if(response.status===200){
            setclientsecret(response.data.clientsecret)
            setresponseMessage('client secret  fetched successfully')
        }
    } catch (error) {
        if(axios.isAxiosError(error)){
            setresponseMessage(error.response?.data?.error || "stripe payment intent error")
        }else{
            setresponseMessage("stripe payment intent error")
        }
    }
  }
  getclientsecret()
},[price])
const options:StripeElementsOptions={
    clientSecret :clientsecret ||"", // Ensure it's a string
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#0070f3",
        fontFamily: "Arial, sans-serif",
      },
    },
    locale: "en",
}

  return (
    <div className="flex justify-center items-center h-screen">
        {clientsecret ? (
            <Elements stripe={stripePromise} options={options}>
                <Checkoutform amount={price}/>
            </Elements>
        ):(<p>{responseMessage || <LucideLoaderCircle size={100}  className="text-blue-500 animate-spin"/>}</p>)}
    </div>
  )
}

export default CheckoutPage
