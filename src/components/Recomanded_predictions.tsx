"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Moviecard from './Moviecard'
import { IShowtime } from '@/app/Model/showtime'
import { Progress } from "@/components/ui/progress"
const Recomanded_predictions = () => {
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
  const [loading, setloading] = useState<boolean>(false)
  const [movies, setMovies] = useState<MovieProps[]>([])

  const get_movies_based_on_predictions = async () => {
    try {
      setloading(true)
      const response = await axios.get('/api/movie/prediction-based-recomendation')
      if (response.status === 200) {
        setMovies(response.data.movies)
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
  useEffect(() => {
    get_movies_based_on_predictions()
  }, [])


  return (
    <>
      {loading ? (<Progress className="w-full" value={100} max={100} />) :
        (movies.map((movie) =>
          <Moviecard
            key={movie._id}
            movieId={movie._id}
            movieTitle={movie.title}
            moviePosterUrl={movie.posterUrl}
            rating={movie.rating} />
        ))}
    </>
  )
}

export default Recomanded_predictions
