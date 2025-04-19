'use client'
import React, { useRef } from 'react'
import TheaterDataStore from '@/app/store/theaterStore'
import PriceStore from '@/app/store/ticPriceStore'
import { useReactToPrint } from "react-to-print"
import { useRouter } from 'next/navigation'
import {Download} from "lucide-react"
import Image from 'next/image'
const Page = () => {
  const { seats, theaterId, name, clearTheaterData } = TheaterDataStore()
  const { price, clear_Price } = PriceStore()
  const router = useRouter()
  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({
    contentRef,
    onAfterPrint: () => {
      clearTheaterData()
      clear_Price()
      router.push('/')
    },
  })
  
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        {/* Payment Success Message */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600">🎉 Payment Successful!</h1>
          <p className="text-lg text-gray-700 mt-2">
            Thank you for booking your tickets. Enjoy the movie!
          </p>
        </div>

        {/* Ticket Container */}
        <div
          ref={contentRef}
          className="bg-white w-full max-w-[600px] h-[300px] rounded-lg shadow-lg overflow-hidden border border-gray-300 flex print-container"
        >
          {/* Success Image Section */}
          <div className="bg-green-500 text-white flex justify-center items-center p-4 w-1/3">
            <Image src="/FilmFusion2.jpg" alt="Success" className="w-full h-full object-cover rounded-l-lg"
            width={8}
            height={13} 
            />
          </div>

          {/* Ticket Details Section */}
          <div className="p-5 w-2/3">
            <h1 className="text-xl font-bold text-gray-800">🎟️ Theater: {name}</h1>
            <h3 className="text-md text-black mt-2">Theater ID: {theaterId}</h3>

            <div className="mt-4">
              <h3 className="text-lg text-black font-semibold">Booked Seats:</h3>
              <ul className="grid grid-cols-5 gap-2 mt-2">
                {seats.map((item) => (
                  <li key={item} className="p-2 bg-blue-500 text-white text-center rounded-md">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="text-lg font-semibold mt-4 text-black">
              Total Amount: <span className="text-green-500">INR {price}</span>
            </h3>
            <p className="mt-1 text-sm text-gray-600">Thank you for booking with us! Enjoy your show! 🎬</p>
          </div>
        </div>

        {/* Download Button */}
          <p className='text-black'>Download Tickets</p>
        <Download onClick={() => reactToPrintFn()} className='text-black hover:cursor-pointer'/> 

      </div>

    </>
  )
}

export default Page