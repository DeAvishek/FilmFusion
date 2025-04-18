"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { SignupSchemaValidation } from "@/app/schema/signupvalidation"
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image'

// Disable static generation for this page

const Page = () => {
  const router = useRouter()
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [responseMessage, setResponseMessage] = useState<string>("")
  const params = useSearchParams()
  
  // Default role is 'user', can be overridden by query param
  const role = params?.get('role') || 'user'

  const form = useForm<z.infer<typeof SignupSchemaValidation>>({
    resolver: zodResolver(SignupSchemaValidation),
    defaultValues: {
      username: "",
      email: ""
    }
  })

  const handleSignUp = async (data: z.infer<typeof SignupSchemaValidation>) => {
    try {
      setIsSubmit(true)
      setResponseMessage("")
      
      const response = await axios.post(`/api/user/create-account?role=${role}`, data)

      if (response.status === 201) {
        setResponseMessage(response.data.message)
        router.push('/sign-in') // Changed from '/api/auth/signin' to client route
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResponseMessage(error.response?.data.error?.message || "Email must be unique")
      } else {
        setResponseMessage("An unexpected error occurred")
      }
    } finally {
      setIsSubmit(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500 px-4">
      <div className="w-full max-w-md p-10 bg-gray-300 rounded-2xl shadow-xl space-y-6">
        <h1 className="text-4xl font-bold text-sky-700 text-center">Join Now</h1>
        <div className="text-center flex justify-center items-center">
          <p className="mt-2 text-gray-600">Sign up to start your movie adventure </p>
          <Image 
            src='https://linktr.ee/og/image/FilmFusion.jpg' 
            width={50}
            height={30}
            className='mt-2 ml-2' 
            alt="logo"
          />
        </div>

        {responseMessage && (
          <p className={`text-sm text-center font-medium ${
            responseMessage.toLowerCase().includes("success") 
              ? "text-green-600" 
              : "text-red-500"
          }`}>
            {responseMessage}
          </p>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Username</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-gray-100 text-black" 
                      type="text" 
                      placeholder="John Doe" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-gray-100 text-black" 
                      type="email" 
                      placeholder="you@example.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-semibold transition duration-200"
              disabled={isSubmit}
            >
              {isSubmit ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href='/sign-in' className="text-sky-600 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page