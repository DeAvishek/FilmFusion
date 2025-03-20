"use client"
import React from 'react'
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
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { SignupSchemaValidation } from "@/app/schema/signupvalidation"
import  Link  from 'next/link'
import axios from 'axios'
const page = () => {
    const router=useRouter()
    const [isSubmit, setisSubmit] = useState<boolean>(false)
    const [responseMessage, setresponseMessage] = useState<string | "">("")

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
            const response = await axios.post('/api/user/create-account', data)

            if (response.status === 201) {
                setresponseMessage(response.data.message)
                router.push('/sign-in')
            }
            
        } catch (error) {
                setresponseMessage("Email Must be Unique")
        }finally{
            setisSubmit(false)
        }

    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-grey-100 text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-sky-600 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-white">
                        Join Now
                    </h1>
                    <p className="mb-4 text-white">Sign up in to start your movie adventure</p>
                </div>

                {responseMessage && (
                    <b className={`text-sm ${responseMessage.includes("success") ? "text-green-900" : "text-red-500"}`}>
                        {responseMessage}
                    </b>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-8">
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>UserName</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white-500 text-black" type="text" placeholder="John Doe" {...field} />
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
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white-500 text-black" type="email" placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button
                            type="submit"
                            className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700"
                            disabled={isSubmit}
                        >
                            {isSubmit ? "Signing up..." : "Sign Up"}
                        </Button>
                    </form>
                </Form>

                <div className="text-center">
                    <p>Already have an account? <Link href='/sign-in' className="text-yellow-200">Sign In</Link></p>
                </div>
            </div>
        </div>
    )
}

export default page
