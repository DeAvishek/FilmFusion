'use client'
import React from 'react'
import TheaterDataStore from '@/app/store/theaterStore'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PriceStore from '@/app/store/ticPriceStore'
import Toastalert from '@/components/Toastalert'
const page = () => {
  //use priceStore
  const {price}=PriceStore()
  const [loading, setloading] = useState<boolean>(false)
    const theater_data=TheaterDataStore()
    const router=useRouter()
    //post booking
    const handle_making_booking=async()=>{
      try {
        const data={
          theatername:theater_data.name,
          seats:theater_data.seats,
          totalamount:price,
          paymentId:'q2312456785@ybl'  //todo to modify
        }
        const response = await  axios.post('/api/booking/make_booking',data)
        if(response.status===201){
          <Toastalert alert_message={response.data.message} />
          router.push('/success-payment')
        }
      } catch (error) {
        if(axios.isAxiosError(error)){
          <Toastalert alert_message={error.response?.data.error || "Your booking is failed due to server issue please try again later"} />
          console.log(error.response?.data.error || "Your booking is failed due to server issue please try again later")
          
        }else{
          console.log("...Error....")
        }
      }
    }
    const handle_Seat_status_post=async()=>{
      try {
        //before this need to setup payment and handle payment
        setloading(true);
        const response= await axios.post(`/api/movie/${theater_data.theaterId}/seat_status_update`,theater_data.seats)
        if(response.status===200){
          //make a post booking
          handle_making_booking()
        }
      } catch (error) {
        if(axios.isAxiosError(error)){
          console.log(error.response?.data.error || "...error")
        }else{
          console.log("...Error....")
        }
      }finally{
        setloading(false)
      }
    }
    
  return (
    <div className='text-white flex content-center justify-center mt-10'>
      <h1 className='text-2xl'>
        {typeof theater_data.theaterId ==="string" ? theater_data.theaterId:"invalid"}

      </h1>
      <div>
        <ul>
          {theater_data.seats.map((seat)=>(
            <li key={seat}>{seat}</li>
          ))}
        </ul>
      </div>
      <Button variant='secondary' onClick={handle_Seat_status_post} disabled={loading}>
        {loading?"Processing":`Pay ${price}`}
        </Button>
    </div>
  )
}

export default page
