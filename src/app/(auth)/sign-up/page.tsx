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

const Page = () => {
    const router = useRouter()
    const [isSubmit, setisSubmit] = useState<boolean>(false)
    const [responseMessage, setresponseMessage] = useState<string | "">("")
    let role = "user"
    const params = useSearchParams();
    const role_of_user = params.get("role") as string
    if (role_of_user) {
        role = role_of_user
    }

    const form = useForm<z.infer<typeof SignupSchemaValidation>>({
        resolver: zodResolver(SignupSchemaValidation),
        defaultValues: {
            username: "",
            email: ""
        }
    })

    const handleSignUp = async (data: z.infer<typeof SignupSchemaValidation>) => {
        try {
            setisSubmit(true)
            const response = await axios.post(`/api/user/create-account?role=${role}`, data)

            if (response.status === 201) {
                setresponseMessage(response.data.message)
                router.push('/api/auth/signin')
            }

        } catch (error) {
            setresponseMessage("Email must be unique")
        } finally {
            setisSubmit(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500 px-4">
            <div className="w-full max-w-md p-10 bg-gray-300 rounded-2xl shadow-xl space-y-6">
            <h1 className="text-4xl font-bold text-sky-700 text-center">Join Now</h1>
                <div className="text-center flex justify-center ">
                    <p className="mt-2 text-gray-600">Sign up to start your movie adventure </p>
                    <img src='https://film-fusion-ecu.netlify.app/Images/Logo.png' style={{width:'50px',height:'30px'} } className='mt-2 ml-2'/>
                </div>

                {responseMessage && (
                    <p className={`text-sm text-center font-medium ${responseMessage.includes("success") ? "text-green-600" : "text-red-500"}`}>
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
                                        <Input className="bg-gray-100 text-black" type="text" placeholder="John Doe" {...field} />
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
                                        <Input className="bg-gray-100 text-black" type="email" placeholder="you@example.com" {...field} />
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
