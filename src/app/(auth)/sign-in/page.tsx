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
import Link from 'next/link'
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
                redirect:false,
                email:data.email,
            })
            if (response?.error) {
                setresponseMessage(response.error);
            } else {
                setresponseMessage("Logged in successfully");
                
                setTimeout(() => {
                    router.push('/');
                }, 3000);
                
               
            }

        } catch (error) {
            setresponseMessage("Something went wrong. Please try again.");
            console.error(error);

        } finally {
            setisSumbmit(false)
        }

    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-grey-100 text-white">
            {responseMessage &&<Toastalert alert_message="Logged in successfully"/>}
            <div className="w-full max-w-md p-8 space-y-8 bg-red-800 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-white">
                        Join Now
                    </h1>
                    <p className="mb-4 text-white">Sign in to start your movie adventure</p>
                </div>

                {responseMessage && (
                    <p className={`text-sm ${responseMessage.includes("success") ? "text-yellow-500" : "text-yellow-500"}`}>
                        {responseMessage}
                    </p>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-8">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white-500 text-black"type="email" placeholder="Email" {...field} />
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

                <div className="text-center">
                    <p>Dont have an account? <Link href='/sign-up' className="text-blue-500">Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signin
