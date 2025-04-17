"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useForm, useFieldArray } from "react-hook-form"
import axios from 'axios'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
type formvalue = {
    descTitle: string,
    cast: Array<{ name: string; role?: string }>,
    genre:Array<{name:string;role?: string}>
}
const page = () => {
    const router = useRouter();
    const [loading, setloading] = useState(false)
    const [responseMessage, setResponseMessage] = useState("")
    const { movieid } = useParams()  //movie id is here movie title 
    const { register, handleSubmit, control } = useForm<formvalue>({
        defaultValues: {
            descTitle: "",
            cast: [{ name: "" }],
            genre: [{name:""}],
        }
    })

    const { fields: castFields, append: castAppend, remove: castRemove } = useFieldArray({
        control,
        name: "cast"
    })
    const { fields: genreFields, append: appendGenre, remove: removeGenre } = useFieldArray({
        control,
        name: "genre"
    });

    const handleAddDesc = async (data: formvalue) => {
        try {
            setloading(true)
            const response = await axios.post(`/api/movie/${movieid}/add-desc-server`, data)
            if (response.status === 200) {
                setResponseMessage(response.data.message)
                router.push(`/${movieid}/add-showtime-client`)

            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponseMessage(error?.response?.data.error)
            } else {
                setResponseMessage("Add description error");
            }
        } finally {
            setloading(false);

        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <div className="w-full max-w-lg p-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg">
                {responseMessage.includes("error")&& <h2>{responseMessage}</h2>}
                <h1 className="text-2xl font-bold text-center text-gray-800">Add Description for {movieid}</h1>

                <form onSubmit={handleSubmit(handleAddDesc)} className="space-y-4">
                    {/* Description Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description Title</label>
                        <input
                            type="text"
                            {...register("descTitle", { required: "Description Title is required" })}
                            placeholder="Enter Description Title"
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Cast Members */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Cast Members</h2>
                        {castFields.map((field, index) => (
                            <div key={field.id} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    {...register(`cast.${index}`)}
                                    placeholder="Enter cast member"
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Button
                                    type="button"
                                    onClick={() => castRemove(index)}
                                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                                >
                                    ✖
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={() => castAppend({name:""})}
                            className="mt-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Add Cast Member
                        </Button>
                    </div>

                    {/* Genres */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Genres</h2>
                        {genreFields.map((field, index) => (
                            <div key={field.id} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    {...register(`genre.${index}`)}
                                    placeholder="Enter genre"
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Button
                                    type="button"
                                    onClick={() => removeGenre(index)}
                                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                                >
                                    ✖
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={() => appendGenre({name:""})}
                            className="mt-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Add Genre
                        </Button>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 font-semibold text-lg text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
                    >
                        Add Description
                    </Button>
                </form>
            </div>
        </div>

    )
}

export default page
