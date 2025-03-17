"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form"
import { useParams } from "next/navigation";
import { useState } from "react";
import React from 'react'
import { Button } from "@/components/ui/button";

const page = () => {
    const [loading, setloading] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>("");
    type theater = {
        name: string,
        location: string,
        totalseats: number
    }
    type formValue = {
        screen: number,
        time: string,
        seatAvailable: number,
        price: number,
        theaters: theater[],
    }
    //getting the params of movie name
    const { movieid } = useParams()
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm<formValue>({
        defaultValues: {
            screen: 0,
            time: "",
            seatAvailable: 0,
            price: 0,
            theaters: []
        }
    })
    const { fields: theatersFields, append: theatersAppend, remove: theatersRemove } = useFieldArray({
        control,
        name: "theaters"
    })
    const router = useRouter();

    const handeAddShowtime = async (data: formValue) => {
        try {
            setloading(true);
            const response = await axios.post(`/api/movie/${movieid}/add-showtime-server`, data)
            if (response.status === 200) {
                setResponseMessage(response.data.message)
                reset()  //resest the form
                console.log(responseMessage) //todo to remove
                router.push("/") //todo to modify
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponseMessage(error.response?.data.error || "Error occur  during add show time")
            } else {
                setResponseMessage("Error occur  during add show time");
            }
        } finally {
            setloading(false);
        }
    }
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                <div className="w-full max-w-lg p-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-bold text-center text-gray-800">Add Showtime for {movieid}</h1>
                    <form onSubmit={handleSubmit(handeAddShowtime)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-white">Screen:</label>
                            <input type="number"
                                placeholder="Enter Screen number.."
                                {...register("screen", { required: "Screen number is required" })}
                                className="w-full p-3 mt-1 border border-white/30 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            {errors.screen && <p className="text-red-300 text-sm">{errors.screen.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-white">ShowTime:</label>
                            <input type="datetime-local"
                                placeholder="Enter Show-time.."
                                {...register("time", { required: "Show-time is required" })}
                                className="w-full p-3 mt-1 border border-white/30 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            {errors.time && <p className="text-red-300 text-sm">{errors.time.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-white">SeatAvailable:</label>
                            <input type="number"
                                placeholder="Available seat.."
                                {...register("seatAvailable", { required: "This filed is required" })}
                                className="w-full p-3 mt-1 border border-white/30 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            {errors.seatAvailable && <p className="text-red-300 text-sm">{errors.seatAvailable.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-white">Price:</label>
                            <input type="number"
                                placeholder="Enter Price"
                                {...register("price", { required: "Price is required" })}
                                className="w-full p-3 mt-1 border border-white/30 bg-white/20 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            {errors.price && <p className="text-red-300 text-sm">{errors.price.message}</p>}
                        </div>
                        {/* for theaters */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Add Theater collection for {movieid}</h2>
                            {theatersFields.map((theater, index) => (
                                <div key={theater.id}>
                                    <input
                                        type="text"
                                        {...register(`theaters.${index}.name`)}
                                        placeholder="Enter Theater-name"
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input type="text"
                                        {...register(`theaters.${index}.location`)}
                                        placeholder="Enter loacation"
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input type="number"
                                        {...register(`theaters.${index}.totalseats`)}
                                        placeholder="Enter Available seat"
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => theatersRemove(index)}
                                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                                    >
                                        ✖
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                onClick={() => theatersAppend({name:"",location:"",totalseats:0})}
                                className="mt-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Add Theater Collection
                            </Button>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 mt-4 font-semibold text-lg text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
                        >
                            Add showtime
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default page
