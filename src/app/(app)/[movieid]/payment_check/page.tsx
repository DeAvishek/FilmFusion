'use client'
import React from 'react'
import TheaterDataStore from '@/app/store/theaterStore'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PriceStore from '@/app/store/ticPriceStore'
const page = () => {
  //use priceStore
  const {price}=PriceStore()
  const [loading, setloading] = useState<boolean>(false)
    const theater_data=TheaterDataStore()
    const router=useRouter()
    const handle_Seat_status_post=async()=>{
      try {
        //before this need to setup payment and handle payment
        setloading(true);
        const response= await axios.post(`/api/movie/${theater_data.theaterId}/seat_status_update`,theater_data.seats)
        if(response.status===200){
          console.log(response.data.message)
          // clear_Price()
          router.push('/success-payment')
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
