"use client"
import { IShowtime } from "./Model/showtime";
import axios from "axios";
import Moviecard from "@/components/Moviecard";
import { useState,useEffect } from "react";
export default function Home() {
  type MovieProps={
    _id:string,
    title:string,
    duration:number,
    language:string,
    descriptions:object,
    posterUrl:string,
    trailerUrl:string,
    releaseDate:Date,
    showtimes:IShowtime[]
  }
  const [movies, setmovies] = useState<MovieProps[]>([])
  const [responseMessage,setresponseMessage]=useState('');
  const [loading,setloading]=useState(false)
  const getMovies=async()=>{
    try {
      setloading(true)
      const response=await axios.get('/api/movie/get-movies')
      if(response.status===200){
        setmovies(response.data.movies)
        setresponseMessage(response.data.message)
        console.log(responseMessage)  //todo remove
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        setresponseMessage(error.response?.data?.error ||"Something went to wrong")
        console.log(responseMessage)//todo remove
      }else{
        setresponseMessage("Internal server error")
      }
      
    }finally{
      setloading(false);
    }
  }

  useEffect(()=>{
    getMovies()
  },[])
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {loading ?(<p>Getting best Movies for you</p>):
        (movies.map((movie)=>(
          <Moviecard
          key={movie._id}
          movieId={movie._id}
          movieTitle={movie.title} 
          movieLanguage={movie.language}
          moviePosterUrl={movie.posterUrl}/>
        )))
        }
      </main>
    </div>
  );
}
