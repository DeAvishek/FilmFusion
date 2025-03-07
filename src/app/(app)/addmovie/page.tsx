"use client"
import axios from "axios";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form"
import { z } from "zod";
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { movieValidationSchema } from "@/app/schema/movievalidation";

const page = () => {
    const router = useRouter()
    const [isSubmit, setisSubmit] = React.useState<boolean>(false)
    const [responseMessage, setresponseMessage] = useState<string>("")


    const form = useForm<z.infer<typeof movieValidationSchema>>({
        resolver: zodResolver(movieValidationSchema),
        defaultValues: {
            title: "",
            duration: "",
            language: "",
            posterUrl: "",
            trailerUrl: "",

        }
    })
    const handleAddMovie = async (data: z.infer<typeof movieValidationSchema>) => {
        console.log("Submitting data:", data);
        try {
            setisSubmit(true)
            const response = await axios.post("/api/movie/add-movie", data)
            if (response.status === 200) {
                setresponseMessage(response.data.message)
                router.push(`/${data.title}/adddescp`)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setresponseMessage(error?.response?.data.error)
            } else {
                setresponseMessage("error occur during add of movie")
            }
        } finally {
            setisSubmit(false)
        }

    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4">
            <div className="w-full max-w-2xl p-10 bg-gray-900 shadow-lg rounded-xl border border-gray-700">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-white">
                        Join Now
                    </h1>
                    <p className="mb-4 text-white">Sign up in to start your movie adventure</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddMovie)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="title"
                                        className="bg-gray-800 text-white border-gray-600 focus:border-sky-400 focus:ring-sky-400"
                                        {...field} />
                                    </FormControl>
                                   
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Duration</FormLabel>
                                    <FormControl>
                                        <Input placeholder="duration"
                                        className="bg-gray-800 text-white border-gray-600 focus:border-sky-400 focus:ring-sky-400"
                                        {...field} />
                                    </FormControl>
                                   
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="language"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Language</FormLabel>
                                    <FormControl>
                                        <Input placeholder="language" 
                                        className="bg-gray-800 text-white border-gray-600 focus:border-sky-400 focus:ring-sky-400"
                                        {...field} />
                                    </FormControl>
                                   
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="posterUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>PosterUrl</FormLabel>
                                    <FormControl>
                                        <Input placeholder="posterUrl" 
                                        className="bg-gray-800 text-white border-gray-600 focus:border-sky-400 focus:ring-sky-400"
                                        {...field} />
                                    </FormControl>
                                   
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}  
                            name="trailerUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>TrailerUrl</FormLabel>
                                    <FormControl>
                                        <Input placeholder="trailerUrl"
                                        className="bg-gray-800 text-white border-gray-600 focus:border-sky-400 focus:ring-sky-400"
                                         {...field} />
                                    </FormControl>
                                
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div> 

    )
}

export default page
