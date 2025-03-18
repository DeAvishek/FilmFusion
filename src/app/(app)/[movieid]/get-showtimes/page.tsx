"use client"
import React from 'react'
import axios from 'axios'
import { useState ,useEffect} from 'react'
import { useParams } from 'next/navigation'
type showTimes={
  _id:string,
  screen:number,
  time:Date,
  price:number,
  theaters:[]
}
const page = () => {
  const [showTimes, setshowTimes] = useState<showTimes[]>([])
  const params=useParams();
  const slug=params?.movieid
  const [loding,setloading]=useState<boolean>(false)
  useEffect(()=>{
    const getShowtimes=async()=>{
      try {
        setloading(true);
        const response= await axios.get(`/api/movie/${slug}/get-movie-showtime`)
        if(response.status===200){
          setshowTimes(response.data.showtimes)
        }
      } catch (error) {
        console.log(error)
      }finally{
        setloading(false)
      }
    }
    getShowtimes()
  },[])
  return (
    <div>
      {showTimes.map((showtime,index)=>(
        <div key={showtime._id}>
         <p>{showtime._id}</p>
         <p>{showtime.price}</p>
         <p>{showtime.time}</p>
        </div>
      ))}
    </div>
  )
}

export default page
