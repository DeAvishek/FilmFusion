"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { signInValidationScheam } from '@/app/schema/signinvalidation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Toastalert from '@/components/Toastalert'

const SignIn = () => {
    const [isSubmitting, setSubmitting] = useState(false)
    const [responseMessage, setResponseMessage] = useState<string | null>(null)
    const router = useRouter()

    const form = useForm<z.infer<typeof signInValidationScheam>>({
        resolver: zodResolver(signInValidationScheam),
        defaultValues: {
            email: "",
        }
    })

    const handleSignIn = async (data: z.infer<typeof signInValidationScheam>) => {
        setSubmitting(true)
        try {
            const response = await signIn('credentials', {
                redirect: false,
                email: data.email,
            })

            if (response?.error) {
                setResponseMessage(response.error)
            } else {
                setResponseMessage("Logged in successfully")
                setTimeout(() => router.push("/"), 3000)
            }
        } catch (err) {
            setResponseMessage("Something went wrong. Try again.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="flex h-screen w-full">
            {/* Left Side - Form (1/3) */}
            <div className="w-1/3 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 flex justify-center items-center p-6">
                <div className="bg-white/20 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-sm">
                    <h1 className="text-3xl font-bold text-white mb-6">Sign In</h1>
                    <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-5">
                        <Input
                            className="rounded-full py-2 px-4 text-black placeholder-gray-500 bg-white/90"
                            placeholder="Email Address"
                            {...form.register("email")}
                        />
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-black text-white rounded-full py-2 hover:bg-gray-800"
                        >
                            {isSubmitting ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                    <p className="text-sm text-white mt-4">
                        Don’t have an account?{" "}
                        <a href="/sign-up" className="text-black font-semibold hover:underline">Sign Up</a>
                    </p>

                    {responseMessage?.includes("success") && <Toastalert alert_message="Logged in successfully" />}

                    {/* Social login buttons */}
                    <div className="mt-6 space-y-3">
                        <p className="text-white text-center">Or</p>
                        <button 
                        className="flex items-center justify-center w-full border border-white text-white rounded-full py-2 hover:bg-white hover:text-black transition"
                        onClick={()=>signIn('facebook')}
                        >
                            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5 mr-2" />
                            Sign in with Facebook
                        </button>
                        <button 
                        className="flex items-center justify-center w-full border border-white text-white rounded-full py-2 hover:bg-white hover:text-black transition"
                        onClick={()=>signIn('github')}
                        >
                            <img src="https://www.svgrepo.com/show/35001/github.svg" alt="Facebook" className="w-5 h-5 mr-2" />
                            Sign in with Github
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Side - Visual (2/3) */}
            <div className="w-2/3 relative">
                <img
                    src="https://img.freepik.com/premium-photo/film-fusion-ultimate-movie-mixing-machine_1015980-28917.jpg?w=2000" // Replace with your own image if desired
                    alt="Visual"
                    className="object-cover w-full h-full"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
                    <h1 className="text-white text-4xl font-bold">Welcome to FilmFusion</h1>
                </div>
            </div>
        </div>
    )
}

export default SignIn
