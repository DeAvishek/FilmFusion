"use client"
import React from 'react'
// import { useState,useEffect } from 'react'
import { useParams } from 'next/navigation'

const page = () => {
  const seats=[
    {
      seatnumber:"A1",
      status:"available"
    },
    {
      seatnumber:"A2",
      status:"available"
    },
    {
      seatnumber:"A3",
      status:"available"
    },
    {
      seatnumber:"A4",
      status:"available"
    }

  ]
  // const [selectedSeats,setselectedSeats] = useState<[]>([])
  const toggleSeatSelection =(seatnumber:string)=>{
    const seat=seats.find((seat)=>{
      return seatnumber==seat.seatnumber
    })
    if(seat?.status==="available"){
      seat.status="pending"
    }
    else if(seat?.status==="pending"){
      seat.status="available"
    }
  }
    const params=useParams()
  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-gray-800 text-white py-2 text-center mb-4 rounded-md my-10">
        🎬 Screen
      </div>
      <div className="grid grid-cols-10 gap-2">
        {seats.map((seat) => {
          // const isSelected = selectedSeats.includes(seat.seatnumber);
          return (
            <button
              key={seat.seatnumber}
              className={`w-10 h-10 text-sm font-bold rounded-md ${
                seat.status === "available" ? "bg-green-500": "bg-yellow-500 " 
              }`}
              onClick={() => seat.status === "available" && toggleSeatSelection(seat.seatnumber)}
              disabled={seat.status === "booked"}
            >
              {seat.seatnumber}
            </button>
          );
        })}
      </div>
    </div>
  )
}

export default page
