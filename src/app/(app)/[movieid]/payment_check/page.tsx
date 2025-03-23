'use client'
import React from 'react'
import TheaterDataStore from '@/app/store/theaterStore'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
const page = () => {
  const router=useRouter()
  const [loading, setloading] = useState<boolean>(false)
    const theater_data=TheaterDataStore()
    console.log(theater_data.theaterId)
  
    const handle_Seat_status_post=async()=>{
      try {
        //before this need to setup payment and handle payment
        setloading(true);
        const response= await axios.post(`/api/movie/${theater_data.theaterId}/seat_status_update`,theater_data.seats)
        if(response.status===200){
          console.log(response.data.message)
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
        {theater_data.theaterId===null?(<p>hii</p>):(<p>{theater_data.theaterId}</p>)}
        {/* <Button onClick={handle_cleear_theater_state}>click_to_clear</Button> */}
      </h1>
      <div>
        <ul>
          {theater_data.seats.map((seat)=>(
            <li key={seat}>{seat}</li>
          ))}
        </ul>
      </div>
      <Button variant='secondary' onClick={handle_Seat_status_post} disabled={loading}>Pay $40</Button>
    </div>
  )
}

export default page
