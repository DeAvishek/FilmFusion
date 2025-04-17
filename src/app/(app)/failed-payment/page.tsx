"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
const Page = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <Image 
        src="https://clipart-library.com/newhp/124-1245282_sad-dog-png-clipart-royalty-free-stock-sad.png" 
        alt="Sad dog" 
        className='mb-4 max-w-xs' // Added margin and max width for better spacing
      />
      <p className="text-lg text-center">
        Back to Home: {' '}
        <Link href="/" className="text-blue-600 underline">
          home@filmfusion.com
        </Link>
      </p>
    </div>
  )
}

export default Page