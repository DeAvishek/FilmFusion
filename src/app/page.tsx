"use client"
import { IShowtime } from "./Model/showtime";
import axios from "axios";
import Moviecard from "@/components/Moviecard";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ValueContext } from "./context/optionsvalueprovider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@apollo/client"
import { gql } from "graphql-tag"
import { useSession } from "next-auth/react"
import Recomended_rating from "@/components/Recomended_rating";
import Recomanded_predictions from "@/components/Recomanded_predictions";
import { useMovieRecommendation } from '@/app/hooks/useMovieRecommendation'
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
  type InterAction_prop = {
    movieId: string
    rating: number
  }
  const [baseurl, setBaseUrl] = useState<string>("")
  const [fullurl, setfullurl] = useState<string>("")
  const [movies, setmovies] = useState<MovieProps[]>([])
  const [responseMessage, setresponseMessage] = useState('');
  const [loading_for_base, setloading_for_base] = useState(false)
  const { cityValue } = useContext(ValueContext)
  const { data: session } = useSession()
  const [current_user_interaction, setcurrent_user_interaction] = useState<InterAction_prop[]>([])

  //query for getting the current user interactions
  const GET_CURRENT_USER_INTERACTIONS = gql`
  query Interaction_Of_One_User($search: UserIdSearch) {
  interaction_Of_One_User(search: $search) {
    movieId
    rating
  }
}
  `
  const { data } = useQuery(GET_CURRENT_USER_INTERACTIONS, {
    variables: session?.user?._id ? {
      search: {
        _id: session?.user?._id
      }
    } : undefined,
    skip: !session?.user?._id
  })

  useEffect(() => {
    if (data?.interaction_Of_One_User) {
      setcurrent_user_interaction(data.interaction_Of_One_User.map((item: InterAction_prop) => item));
    }
  }, [data]);

  const getMovies = async () => {
    try {
      setloading_for_base(true)
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
      setloading_for_base(false);
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
      {fullurl === baseurl && <Navbar />}
      <div className="bg-gradient-to-r from-yellow-700 to-blue-700 min-h-screen flex flex-col items-center min-h-screen">
        <span className="text-xl font-bold text-gray-800 w-full text-center mt-4"></span>

        {(session?.user) &&(
          <>
            <h1 className="text-lg font-semibold text-black-700 animate-pulse text-bold ml-0">Recomendations for You</h1>
            <div className=" mb-5 flex flex-wrap gap-8 sm:items-start justify-center rounded">

              {current_user_interaction.length === 0 ? (
                <Recomended_rating />
              ) : (
                <Recomanded_predictions />
              )}
            </div>
          </>)}
        <h1 className="text-lg font-semibold text-black-700 animate-pulse text-bold mt-10">Top Movies</h1>
        <div className=" mb-5 flex flex-wrap gap-8 sm:items-start justify-center rounded">
          {loading_for_base ? (
            <h1 className="text-lg font-semibold text-gray-700 animate-pulse">Getting best Movies for you...</h1>
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
      {fullurl === baseurl && <Footer />}
    </>

  );
}
