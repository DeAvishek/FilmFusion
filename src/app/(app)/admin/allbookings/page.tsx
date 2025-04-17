"use client"
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Bookingrows from '@/components/Bookingrows'
type booking_prop={
    _id:string,
    userId:string,
    theaterName:string,
    seats:[string],
    totalAmount:number,
    paymentStatus:string,
    paymentId:string,
    bookedAt:string
}
const page = () => {
    const [bookings, setbookings] = useState<booking_prop[]>([])
    const [loading, setloading] = useState<boolean>(false)
    useEffect(()=>{
        const handleBookings=async()=>{
            try {
                setloading(true)
                const response= await axios.get('/api/admin/get-all-bookings')
                if(response.status===200){
                    setbookings(response.data.bookings)
                }
            } catch (error) {
                if(axios.isAxiosError(error)){
                    console.log(error.response?.data.error.message);
                    setbookings([])
                }
            }finally{
                setloading(false)
            }
        }
        handleBookings()
    },[])
    return (
        
        <div className="p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-4 border border-gray-500">THEATER NAME</th>
              <th className="p-4 border border-gray-500">SEATS</th>
              <th className="p-4 border border-gray-500">TOTAL AMOUNT</th>
              <th className="p-4 border border-gray-500">PAYMENT STATUS</th>
              <th className="p-4 border border-gray-500">BOOKED AT</th>
            </tr>
          </thead>
          <tbody>
          {bookings.map((booking,index)=>(
                    <Bookingrows  
                    key={index} 
                    theaterName={booking.theaterName}
                    seats={booking.seats} 
                    totalAmount={booking.totalAmount}
                    paymentStatus={booking.paymentStatus}
                    bookedAt={booking.bookedAt}
                    />
                ))}
          </tbody>
        </table>
      </div>
    </div>
    )
}

export default page
