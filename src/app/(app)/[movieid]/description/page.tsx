'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Card,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
const page = () => {
    const router=useRouter()
    const [loading, setloading] = useState(false)
    const [responseMessage, setresponseMessage] = useState('');
    const [description, setdescription] = useState({
        descTitle: '' as string,
        cast: [],
        genre: []
    })
    const [moviePoster, setmoviePoster] = useState('')
    const [movieTitle, setmovieTitle] = useState('')
    const params = useParams()
    const movieId = params.movieid

    useEffect(() => {
        const getDesc = async () => {
            try {
                setloading(true)
                const response = await axios.get(`/api/movie/${movieId}/movie-description`)
                if (response.status === 200) {
                    setresponseMessage(response.data.message)
                    console.log(responseMessage) //debugging
                    setdescription((prev) => ({
                        ...prev,
                        descTitle: response.data.content.descTitle,
                        cast: response.data.content.cast || [],
                        genre: response.data.content.genre || []
                    }))
                    setmoviePoster(response.data.posterUrl)
                    setmovieTitle(response.data.movieTitle)
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setresponseMessage(error.response?.data?.error || "Internal server error")
                    console.log(responseMessage)
                } else {
                    setresponseMessage("Internal server error")
                    console.log(responseMessage)
                }
            } finally {
                setloading(false)
            }

        }
        getDesc()
    }, [movieId])

    return (
        <div className="w-full h-full mt-10">
            <section className="bg-black flex items-center justify-center gap-8 p-8 relative">

                {/* 🔥 Blurred Background Poster */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center blur-md opacity-30"
                    style={{ backgroundImage: `url(${moviePoster})` }}
                ></div>

                {/* 🎬 Main Poster with Small Overlay */}
                <div className="relative">
                    <Card className="shadow-lg rounded-lg overflow-hidden border-2 border-gray-700">
                        <img
                            className="w-[700px] h-[500px] object-cover"
                            src={moviePoster}
                            alt={movieTitle}
                        />
                    </Card>

                    {/* 🔥 Small Poster Overlay (Reused Image) */}
                    <div className="absolute bottom-5 right-5 w-[200px] h-[150px]">
                        <img
                            className="w-full h-full object-cover rounded-lg border-4 border-white shadow-md"
                            src={moviePoster} // Reusing the same image
                            alt="Highlighted Poster"
                        />
                    </div>
                </div>

                {/* 🎥 Movie Details */}
                <div className="text-white max-w-lg relative z-10">
                    <h2 className="text-3xl font-bold">{movieTitle}</h2>
                    <p className="mt-2 text-gray-300">
                        A thrilling experience awaits! Get ready for an unforgettable story.
                    </p>
                    <div className="mb-3">
                        <b className="text-yellow-300">Cast:</b>
                        <p className="text-gray-400">{description.cast.join(", ")}</p>
                    </div>

                    {/* Genre Details */}
                    <div className="mb-4">
                        <b className="text-yellow-300">Genre:</b>
                        <p className="text-gray-400">{description.genre.join(", ")}</p>
                    </div>
                    
                        <Button variant="destructive" onClick={()=>router.push('/success-payment')}>Book now</Button>
                </div>

            </section>
        </div>
    )
}

export default page
