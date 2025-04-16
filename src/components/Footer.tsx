"use client"
import React from 'react'
import Link from 'next/link'
import {FaFacebook,FaGithub,FaLinkedin,FaTwitter} from 'react-icons/fa'
const Footer = () => {
  return (
    <footer className="bg-gray-300 text-black py-4 px-6 mt-5">
      <div className="flex flex-wrap  justify-between">
        <div>
          <h4 className="font-semibold mb-2">Help</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/aboutus" className="text-black">About Us</Link></li>
            <li><Link href="/contactus" className="text-black">Contact Us</Link></li>
            <li><Link href="#" className="text-black">FAQs</Link></li>
            <li><Link href="#" className="text-black">Terms and Conditions</Link></li>
            <li><Link href="#" className="text-black">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Connect With Us</h4>
          <ul className="flex space-x-3">
            <li><Link href="https://www.facebook.com/avishek.patra.75685"><FaFacebook size={25}/></Link></li>
            <li><Link href="https://www.linkedin.com/in/avishek-patra-95ba08321/"><FaLinkedin size={25}/></Link></li>
            <li><Link href="https://x.com/Avishek96233923"><FaTwitter size={25}/></Link></li>
            <li><Link href="https://github.com/DeAvishek"><FaGithub size={25}/></Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Partner With Us</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="#" className="text-black">List Your Show</Link></li>
            <li><Link href="#" className="text-black">Advertise</Link></li>
            <li><Link href="#" className="text-black">Become an Affiliate</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-6 text-sm">
        <p className="text-black">&copy; 2025 FilmFusion. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
