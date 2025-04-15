"use client"
import React from 'react'
type booking_prop={
    
    theaterName:string,
    seats:[string],
    totalAmount:number,
    paymentStatus:string,
    bookedAt:string
}

const Bookingrows = ({theaterName,seats,totalAmount,paymentStatus,bookedAt}:booking_prop) => {
  return (
    <tr className="border border-gray-300 hover:bg-gray-100 transition-all">
      <td className="p-4 border border-gray-300 text-center text-bold ">{theaterName}</td>
      <td className="p-4 border border-gray-300 text-center ">{seats.join(", ")}</td>
      <td className="p-4 border border-gray-300 text-center font-semibold text-green-600">INR {totalAmount}</td>
      <td
        className={`p-4 border border-gray-300 text-center font-semibold ${
        paymentStatus === "successful" ? "text-green-500" : "text-red-500"
        }`}
      >
        {paymentStatus}
      </td>
      <td className="p-4 border border-gray-300 text-center">
        {new Date(bookedAt).toLocaleString()}
      </td>
    </tr>
  )
}

export default Bookingrows
