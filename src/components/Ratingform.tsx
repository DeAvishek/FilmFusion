"use client"
import axios from "axios";
import { useForm } from "react-hook-form"
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
import { imdbRatingValidation } from "@/app/schema/ratingvalidation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";

import React from 'react'
type props = {
    movieID: string
}

const Ratingform = ({ movieID }: props) => {
    const formSchem = z.object({
        'imdbRating': imdbRatingValidation
    })
    const [isSubmitForm, setisSubmitForm] = useState(false)
    const [responseMessage, setresponseMessage] = useState('')
    const form = useForm<z.infer<typeof formSchem>>({
        resolver: zodResolver(formSchem),
        defaultValues: {
            'imdbRating': undefined
        }
    })

    const handleRating = async (data: z.infer<typeof formSchem>) => {
        try {
            setisSubmitForm(true)
            setresponseMessage("")
            const response = await axios.post(`/api/movie/${movieID}/movie-rating`, {
                'imdbRating': data['imdbRating']
            })
            if (response.status === 200) {
                setresponseMessage(response.data.message)
                console.log(responseMessage)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setresponseMessage(error.response?.data?.error || "Rating submit error")
            } else {
                setresponseMessage("Rating submit error")
            }

        } finally {
            setisSubmitForm(false)
        }
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleRating)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="imdbRating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rating</FormLabel>
                                <FormControl>
                                    <Input placeholder="Rating" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {responseMessage && (
                        <p className={`text-sm ${responseMessage.toLowerCase().includes('successfully')
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}>
                            {responseMessage}
                        </p>
                    )}
                    <Button type="submit" disabled={isSubmitForm}>{isSubmitForm?"submitting..":"submit"}</Button>
                </form>
            </Form>
        </div>
    )
}

export default Ratingform
