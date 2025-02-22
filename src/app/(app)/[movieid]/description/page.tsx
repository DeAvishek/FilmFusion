'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import { Card } from "@/components/ui/card"
import { Button } from '@/components/ui/button'

const Page = () => {
    const router = useRouter()
    const params = useParams()
    const movieId = params.movieid

    const [loading, setLoading] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')
    const [description, setDescription] = useState({
        descTitle: '',
        cast: [],
        genre: []
    })
    const [moviePoster, setMoviePoster] = useState<string | null>(null)
    const [movieTitle, setMovieTitle] = useState('')
    const [movieRating, setMovieRating] = useState<number[]>([])

    useEffect(() => {
        const getDesc = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/movie/${movieId}/movie-description`)
                if (response.status === 200) {
                    setResponseMessage(response.data.message)
                    setDescription({
                        descTitle: response.data.content.descTitle || '',
                        cast: response.data.content.cast || [],
                        genre: response.data.content.genre || []
                    })
                    setMoviePoster(response.data.posterUrl || null)
                    setMovieTitle(response.data.movieTitle || '')
                    setMovieRating(response.data.rating || [])
                    console.log(responseMessage) //todo to remove
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setResponseMessage(error.response?.data?.error || "Internal server error")
                } else {
                    setResponseMessage("Internal server error")
                }
            } finally {
                setLoading(false)
            }
        }
        getDesc()
    }, [movieId])

    // Calculate the average rating
    const getAverageRating = () => {
        let length=movieRating.length
        if ( length=== 0) return "No ratings yet"
        if (length === 1) return movieRating[0].toFixed(1)
        let lastElement=movieRating.at(-1)
        return (lastElement as number / length).toFixed(1) 
    }

    return (
        <div className="w-full h-full mt-10">
            <section className="bg-black flex items-center justify-center gap-8 p-8 relative">
                {!loading ? (
                    <>
                        {/* 🔥 Blurred Background Poster (Only render if image exists) */}
                        {moviePoster && (
                            <div
                                className="absolute inset-0 w-full h-full bg-cover bg-center blur-md opacity-30"
                                style={{ backgroundImage: `url(${moviePoster})` }}
                            ></div>
                        )}

                        {/* 🎬 Main Poster with Small Overlay */}
                        <div className="relative">
                            <Card className="shadow-lg rounded-lg overflow-hidden border-2 border-gray-700">
                                {moviePoster ? (
                                    <img
                                        className="w-[700px] h-[500px] object-cover"
                                        src={moviePoster}
                                        alt={movieTitle}
                                    />
                                ) : (
                                    <div className="w-[700px] h-[500px] flex items-center justify-center text-gray-500">
                                        No Poster Available
                                    </div>
                                )}
                            </Card>

                            {/* 🔥 Small Poster Overlay (Only render if image exists) */}
                            {moviePoster && (
                                <div className="absolute bottom-5 right-5 w-[200px] h-[150px]">
                                    <img
                                        className="w-full h-full object-cover rounded-lg border-4 border-white shadow-md"
                                        src={moviePoster}
                                        alt="Highlighted Poster"
                                    />
                                </div>
                            )}
                        </div>

                        {/* 🎥 Movie Details */}
                        <div className="text-white max-w-lg relative z-10">
                            <h2 className="text-3xl font-bold">{movieTitle}</h2>
                            <div className="text-white">
                                <b className="text-yellow-300">IMDb Rating:</b>
                                <span className="ml-2 text-lg font-semibold">{getAverageRating()}</span>

                                {/* 🎬 IMDb Rating Button */}
                                <Button className="ml-4 bg-yellow-500 hover:bg-yellow-600">
                                    Rate now
                                </Button>
                            </div>
                            <p className="mt-2 text-gray-300">{description.descTitle}</p>
                            <div className="mb-3">
                                <b className="text-yellow-300">Cast:</b>
                                <p className="text-gray-400">{description.cast.join(", ")}</p>
                            </div>

                            {/* Genre Details */}
                            <div className="mb-4">
                                <b className="text-yellow-300">Genre:</b>
                                <p className="text-gray-400">{description.genre.join(", ")}</p>
                            </div>

                            <Button variant="destructive" onClick={() => router.push('/success-payment')}>
                                Book now
                            </Button>
                        </div>
                    </>
                ) : (
                    <p>Getting...</p>
                )}
            </section>
        </div>
    )
}

export default Page
