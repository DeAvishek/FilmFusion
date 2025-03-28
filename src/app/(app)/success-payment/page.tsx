'use client'
import React, { useRef } from 'react'
import TheaterDataStore from '@/app/store/theaterStore'
import PriceStore from '@/app/store/ticPriceStore'
import { Button } from '@/components/ui/button'
import{useReactToPrint} from "react-to-print"
import { useRouter } from 'next/navigation'
const Page = () => {
  const { seats, theaterId, name, clearTheaterData } = TheaterDataStore()
  const { price, clear_Price } = PriceStore()
  const router=useRouter()
  const contentRef=useRef<HTMLDivElement>(null)
  const reactToPrintFn= useReactToPrint({
    contentRef,
    onAfterPrint:()=>{
      clearTheaterData()
      clear_Price()
      router.push('/')
    },
  })


  return (
    <>
      <div className='flex justify-center items-center h-screen bg-gray-200'>
         <div className="text-center mt-20">
           <h1 className="text-3xl text-green-500">🎉 Payment Successful!</h1>
          <p>Thank you for booking your tickets. Enjoy the movie!</p>
        </div>
        <div ref= {contentRef} className='bg-white w-[600px] h-[300px] rounded-lg shadow-lg overflow-hidden border border-gray-300 flex print-container'>
          {/* Success Image Section */}
          <div className='bg-green-500 text-white flex justify-center items-center p-4 w-1/3'>
            <img src='/FilmFusion2.jpg' alt='Success' className='w-full h-full object-cover' />
          </div>

          {/* Ticket Details Section */}
          <div className='p-5 w-2/3'>
            <h1 className='text-xl font-bold text-gray-800'>🎟️ Theater: {name}</h1>
            <h3 className='text-md text-gray-600 mt-2'>Theater ID: {theaterId}</h3>

            <div className='mt-4'>
              <h3 className='text-lg font-semibold'>Booked Seats:</h3>
              <ul className='grid grid-cols-5 gap-2 mt-2'>
                {seats.map((item) => (
                  <li key={item} className='p-2 bg-blue-500 text-white text-center rounded-md'>{item}</li>
                ))}
              </ul>
            </div>

            <h3 className='text-lg font-semibold mt-4'>Total Amount: <span className='text-green-500'>${price}</span></h3>
            Thank you for booking with us! Enjoy your show! 🎬
          </div>
        </div>
        <Button onClick={()=>reactToPrintFn()}>Download Tickets</Button>
      </div>
    </>
  )
}

export default Page
// const geneRatePdf = () => {
  //   const doc = new jsPDF()
  
  //   // Title with Styling
  //   doc.setFont('helvetica', 'bold')
  //   doc.setFontSize(24)
  //   doc.setTextColor(33, 150, 243) // Blue Color
  //   doc.text('🎟️ Movie Ticket', 105, 20, { align: 'center' })
  
  //   // Theater Info Section
  //   doc.setFontSize(14)
  //   doc.setTextColor(0, 0, 0) // Black
  //   doc.text(`Theater: ${name}`, 10, 40)
  //   doc.text(`Theater ID: ${theaterId}`, 10, 50)
  
  //   // Add Line Separator
  //   doc.setDrawColor(200, 200, 200)
  //   doc.line(10, 55, 200, 55)
  
  //   // Booked Seats Section
  //   doc.setFontSize(14)
  //   doc.setFont('helvetica', 'bold')
  //   doc.setTextColor(76, 175, 80) // Green
  //   doc.text('📍 Booked Seats:', 10, 65)
  
  //   doc.setFont('helvetica', 'normal')
  //   doc.setTextColor(0, 0, 0)
  
  //   seats.forEach((seat, index) => {
  //     const x = 10 + (index % 10) * 18
  //     const y = 75 + Math.floor(index / 10) * 10
  //     doc.setFillColor(33, 150, 243) // Blue
  //     doc.roundedRect(x, y, 15, 8, 2, 2, 'F')
  //     doc.setTextColor(255, 255, 255) // White
  //     doc.text(seat, x + 5, y + 6)
  //   })
  
  //   // Total Amount Section
  //   const amountY = 85 + Math.ceil(seats.length / 10) * 10
  //   doc.setFont('helvetica', 'bold')
  //   doc.setTextColor(244, 67, 54) // Red
  //   doc.text(`💰 Total Amount: $${price}`, 10, amountY)
  
  //   // Thank You Message
  //   doc.setTextColor(33, 150, 243) // Blue
  //   doc.text('🎬 Thank you for booking with us! Enjoy your show!', 10, amountY + 20)
  
  //   // Save PDF
  //   doc.save('Movie_Ticket.pdf')
  
  //   // Clear Data After Download
  //   clearTheaterData()
  //   clear_Price()
  //   router.push('/')
  // }