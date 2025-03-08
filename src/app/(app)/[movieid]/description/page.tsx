'use client'
import React, {useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import { Card } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import Ratingform from '@/components/Ratingform'
import Home from '@/app/page'

const Page = () => {
    const router = useRouter()
    const params = useParams()
    const movieId = params?.movieid as string

    const [loading, setLoading] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')
    const [mdescription, setmDescription] = useState({
        descTitle: '',
        cast: [],
        genre: [],
    })
    const [moviePoster, setMoviePoster] = useState<string | null>(null)
    const [movieTitle, setMovieTitle] = useState('')
    const [movieRating, setMovieRating] = useState<number[]>([])
    const [duration, setduration] = useState<number>(0);
    const [language, setlanguage] = useState<string>('')
    const [ratingFormEnable, setratingFormEanble] = useState<boolean>(false)
    useEffect(() => {
        const getDesc = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/movie/${movieId}/movie-description`)
                if (response.status === 200) {
                    setResponseMessage(response.data.message)
                    setmDescription({
                        descTitle: response.data.content.descriptions.descTitle || '',
                        cast: response.data.content.descriptions.cast || [],
                        genre: response.data.content.descriptions.genre || []
                    })
                    setMoviePoster(response.data.content.posterUrl || null)
                    console.log(response.data.content.posterUrl || "not availabel")
                    setMovieTitle(response.data.content.movieTitle ||"")
                    setMovieRating(response.data.content.rating || [])
                    setduration(response.data.content.duration)
                    setlanguage(response.data.content.language)
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
        let length = movieRating.length
        if (length === 0) return "No ratings yet"
        if (length === 1) return movieRating[0].toFixed(1)
        let lastElement = movieRating.at(-1)
        return (lastElement as number / length).toFixed(1)
    }
    useEffect(() => {
        getAverageRating()
    }, [movieRating])
    const handleRatingForm = () => {
        setratingFormEanble((prev) => !prev)
    }

    return (
        <div className="w-full h-full mt-0">
            <section className="bg-black flex items-center justify-center gap-8 p-8 relative">
                {!loading ? (
                    <>
                        {/* 🔥 Blurred Background Poster (Only render if image exists) */}
                        {moviePoster && (
                            <div
                                className="absolute inset-0 w-full h-full bg-cover bg-center blur-md opacity-30"
                                style={{ backgroundImage:`${moviePoster}` }}
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
                            <div style={{ height: "50px" }} className="text-white bg-gray-600 rounded flex items-center w-full">

                                <b className="text-yellow-300 ml-3">IMDb Rating:</b>
                                <span className="ml-2 text-lg font-semibold">{getAverageRating()}/5</span>

                                {/* 🎬 IMDb Rating Button */}
                                <Button onClick={handleRatingForm} className="ml-10 bg-yellow-500 hover:bg-yellow-600">
                                    {ratingFormEnable ? "Close Form" : "Rate Now"}
                                </Button>
    
                                
                            </div>
                            <a href='#'>{language}</a>
                            <p>{duration} Minutes</p>
                            {ratingFormEnable && <Ratingform movieID={movieId} />}
                            <Button className="mt-5" variant="destructive" onClick={() => router.push('/success-payment')}>
                                Book now
                            </Button>
                        </div>
                    </>
                ) : (
                    <p>Getting...</p>
                )}
            </section>
            <div className='bg-gray-900'>
                <p className="mt-2 text-gray-300">{mdescription.descTitle}</p>
                <div className="mb-3">
                    <b className="text-yellow-300">Cast:</b>
                    <p className="text-gray-400">{mdescription.cast.join(", ")}</p>
                </div>
                {/* Genre Details */}
                <div className="mb-4">
                    <b className="text-yellow-300">Genre:</b>
                    <p className="text-gray-400">{mdescription.genre.join(", ")}</p>
                </div>
            </div>
            <Home />
        </div>

    )
}

export default Page
