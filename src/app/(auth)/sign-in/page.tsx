"use client"
import React, { useState } from 'react'
import { signInValidationScheam } from '@/app/schema/signinvalidation'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
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

import Toastalert from '@/components/Toastalert'

const Signin = () => {
    const [isSubmit, setisSumbmit] = useState<boolean>(false)
    const [responseMessage, setresponseMessage] = useState<string | null>('')
    const router = useRouter()
    const form = useForm<z.infer<typeof signInValidationScheam>>({
        resolver: zodResolver(signInValidationScheam),
        defaultValues: ({
            email: ""
        })
    })
    const handleSignIn = async (data: z.infer<typeof signInValidationScheam>) => {
        try {
            setisSumbmit(true)
            const response = await signIn('credentials', {
                redirect: false,
                email: data.email,
            })
            if (response?.error) {
                setresponseMessage(response.error);
            } else {
                setresponseMessage("Logged in successfully");

                setTimeout(() => {
                    router.push('/');
                }, 3500);


            }

        } catch (error) {
            setresponseMessage("Something went wrong. Please try again.");
            console.error(error);

        } finally {
            setisSumbmit(false)
        }

    }
    return (

        <>
            <div className="flex h-screen">
                {/* Left Side - Sign In Form */}

                <div className="w-1/2 flex flex-col justify-center items-center bg-white" >
                    
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMqSIOOGcw8PVa9nuGP2JsAQS3M5K7kserbg&s" alt="FilmFusion Logo" className="w-80 mb-8" />
                    <h2 className="text-2xl font-bold mb-4">Log in to your account</h2>
                    <h1 className="mb-4 text-3xl">
                        Don't have an account? <a href="/sign-up" className="text-red-500">Sign Up</a>
                    </h1>   
                    {responseMessage?.includes("success") && (<Toastalert alert_message="Logged in successfully" />)}          
                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-8">
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input className="bg-white-400 text-black" style={{width:'400px'}} type="email" placeholder="Email" {...field} />
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
                                {isSubmit ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>
                    </Form>
                </div>

                {/* Right Side - Visuals */}
                <div className="w-1/2 bg-grey-900 text-white flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold mb-4">FilmFusion 1.0 is here</h1>
                    <p className="mb-8 text-center">Experience seamless booking with improved performance and new features.</p>
                    <img src="https://i.etsystatic.com/isla/c628f5/72874316/isla_500x500.72874316_slgarmpr.jpg?version=0" alt="FilmFusion Visual" className="w-3/4 rounded-lg" />
                </div>
            </div>
        </>
    )
}

export default Signin
