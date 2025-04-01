"use client"
import { IShowtime } from '@/app/Model/showtime'
import React, { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"

import axios from 'axios'
import Moviecard from './Moviecard'
type MovieProps = {
    _id: string,
    title: string,
    duration: number,
    language: string,
    descriptions: object,
    posterUrl: string,
    trailerUrl: string,
    releaseDate: Date,
    showtimes: IShowtime[]
    rating: number[]
}
const Recomended_rating = () => {
    const [loading, setloading] = useState<boolean>(false)
    const [movies, setmovies] = useState<MovieProps[]>([])
    useEffect(() => {
        const getMovies = async () => {
            try {
                setloading(true)
                const response = await axios.get('/api/movie/rating-based-recomendation')
                if (response.status === 200) {
                    setmovies(response.data.movies)
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {

                    console.log((error.response?.data?.error || "Something went to wrong"))//todo remove
                } else {
                    console.log("Internal server error")
                }
            } finally {
                setloading(false)
            }

        }
        getMovies()
    }, [])
    return (
       <>
       {loading ?(<Progress className="w-full" value={100} max={100} />):(
        movies.map((movie)=>
            <Moviecard
            key={movie._id}
            movieId={movie._id}
            movieTitle={movie.title}
            moviePosterUrl={movie.posterUrl}
            rating={movie.rating}
            />))}
       </>
    )
}

export default Recomended_rating
