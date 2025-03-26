"use client"
import { IShowtime } from "./Model/showtime";
import axios from "axios";
import Moviecard from "@/components/Moviecard";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ValueContext } from "./context/optionsvalueprovider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {

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
  const [baseurl,setBaseUrl]=useState<string>("")
  const [fullurl,setfullurl]=useState<string>("")
  const [movies, setmovies] = useState<MovieProps[]>([])
  const [responseMessage, setresponseMessage] = useState('');
  const [loading, setloading] = useState(false)
  const { cityValue } = useContext(ValueContext)
  
  const getMovies = async () => {
    try {
      setloading(true)
      if (!cityValue) {
        const response = await axios.get('/api/movie/get-movies')
        if (response.status === 200) {
          setmovies(response.data.movies)
          setresponseMessage(response.data.message)
          console.log(responseMessage)
        }
      } else {
        const response = await axios.get(`/api/movie/location-movie?city=${cityValue}`)
        if (response.status === 200) {
          setmovies(response.data.movies);
          setresponseMessage(response.data.message)
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setresponseMessage(error.response?.data?.error || "Something went to wrong")
        console.log(responseMessage)//todo remove
      } else {
        setresponseMessage("Internal server error")
      }

    } finally {
      setloading(false);
    }
  }


  useEffect(() => {
    getMovies()
  }, [cityValue])
 
   useEffect(() => {
    if (typeof window !== "undefined") {
      setfullurl(window.location.href);
      setBaseUrl(`${window.location.protocol}//${window.location.host}/`);
    }
  }, []);
  return (
    <>
    {fullurl===baseurl &&  <Navbar/> }
      <div className="flex flex-col items-center min-h-screen">
        <span className="text-xl font-bold text-gray-800 w-full text-center mt-4">
          Movies that you may like in .. {cityValue}
        </span>
        <div className=" mb-5 flex flex-wrap gap-8 sm:items-start justify-center rounded">
          {loading ? (
            <p className="text-lg font-semibold text-gray-700 animate-pulse">Getting best Movies for you...</p>
          ) : movies.length === 0 ? (<p>No movies found</p>) : (
            (
              movies.map((movie) => (
                <Moviecard
                  key={movie._id}
                  movieId={movie._id}
                  movieTitle={movie.title}
                  moviePosterUrl={movie.posterUrl}
                  rating={movie.rating}
                />
              ))
            )
          )}
        </div>
      </div>
      {fullurl===baseurl && <Footer/>}
    </>

  );
}
