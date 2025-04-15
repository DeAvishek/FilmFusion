'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import { Card } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import Ratingform from '@/components/Ratingform'
import Home from '@/app/page'
import { Star } from "lucide-react"
import User_Settings_Data_store from '@/app/store/usersettingsStore'
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
  const [trailerUrl, settrailerUrl] = useState<string>("")

  const autoplayTrailers = User_Settings_Data_store(state => state.autoplayTrailers) //autoplaytrailer from store
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
          setMovieTitle(response.data.content.movieTitle || "")
          setMovieRating(response.data.content.rating || [])
          setduration(response.data.content.duration)
          setlanguage(response.data.content.language)
          settrailerUrl(response.data.content.trailerUrl)
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
  //get the youtube video id
  const videoID = getYoutubeVideoID(trailerUrl)
  function getYoutubeVideoID(url:string){
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }

  return (
    <div className="w-full h-full mt-0">
      {/* Section with Glassmorphism Effect */}
      <section className="bg-black flex items-center justify-center gap-8 p-8 relative">
        {!loading ? (
          <>
            {/* Blurred Background Poster */}
            {moviePoster && (
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center blur-lg opacity-20"
                style={{ backgroundImage: `url(${moviePoster})` }}
              ></div>
            )}

            {/* Main Poster */}
            <div className="relative">
              <Card className="shadow-xl rounded-lg overflow-hidden border-2 border-gray-700">
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

              {/* Small Poster Overlay */}
              {moviePoster && (
                <div className="absolute bottom-5 right-5 w-[200px] h-[150px]">
                  <img
                    className="w-full h-full object-cover rounded-lg border-4 border-white shadow-lg"
                    src={moviePoster}
                    alt="Highlighted Poster"
                  />
                </div>
              )}
            </div>

            {/* Movie Details Section */}
            <div className="text-white max-w-lg relative z-10">
              <h2 className="text-4xl font-bold mb-4">{movieTitle}</h2>

              <div className="text-white bg-gradient-to-r from-gray-800 to-gray-600 p-4 rounded-lg flex items-center w-full mb-4">
                <Star className="text-yellow-500" size={24} />
                <b className="text-yellow-300 ml-3">IMDb Rating:</b>
                <span className="ml-2 text-lg font-semibold">{getAverageRating()}/5</span>

                {/* Rating Form Toggle Button */}
                <Button onClick={handleRatingForm} className="ml-5 bg-yellow-500 hover:bg-yellow-600">
                  {ratingFormEnable ? 'Close Form' : 'Rate Now'}
                </Button>
              </div>

              <p className="text-gray-300">🗣 Language: {language}</p>
              <p className="text-gray-300">⏱ Duration: {duration} Minutes</p>

              {ratingFormEnable && <Ratingform movieID={movieId} />}


              <Button onClick={() => router.push(`/${movieId}/get-showtimes`)} className="mt-5" variant="destructive">
                Book Now
              </Button>


              {(trailerUrl && autoplayTrailers) && <div className='mt-5'>
                <iframe
                  width="100%"
                  height="275"
                  src={`https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1&rel=0&showinfo=0`}
                  title="YouTube Trailer"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>}

            </div>
          </>
        ) : (
          <p className="text-white">Getting...</p>
        )}
      </section>

      {/* Movie Description Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <p className="text-gray-700 text-xl font-semibold mb-4">{mdescription.descTitle}</p>

        {/* Cast Details */}
        <div className="mb-3">
          <b className="text-yellow-500">🎭 Cast:</b>
          <p className="text-gray-600">{mdescription.cast.join(', ')}</p>
        </div>

        {/* Genre Details */}
        <div className="mb-4">
          <b className="text-yellow-500">🎬 Genre:</b>
          <p className="text-gray-600">{mdescription.genre.join(', ')}</p>
        </div>
      </div>

      {/* Home Component */}
      <Home />
    </div>
  );
}

export default Page
