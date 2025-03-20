"use client"
import React from 'react'
import axios from 'axios'
import { useState ,useEffect} from 'react'
import { useParams } from 'next/navigation'
import Showtimecard from '@/components/Showtimecard'
import { number } from 'zod'
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
    <div className='flex flex-row flex-wrap  mb-10 gap-0'>
      {showTimes.map((showtime,index)=>(
          <Showtimecard 
          key={showtime._id} 
          screen={showtime.screen}
          price={showtime.price}
          _id={showtime._id}
          time={typeof showtime.time==='string' ?showtime.time:'Invalid time'}
          />
      ))}
    </div >
  )
}

export default page
