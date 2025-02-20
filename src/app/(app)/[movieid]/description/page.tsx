'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
const page = () => {
    const [loading, setloading] = useState(false)
    const [responseMessage, setresponseMessage] = useState('');
    const [description, setdescription] = useState({
        descTitle: '' as string,
        cast: [] as string[],
        genre: [] as string[]
    })
    const params = useParams()
    const movieId = params.movieid

    useEffect(() => {
        const getDesc = async () => {
            try {
                setloading(true)
                const response = await axios.get(`/api/movie/${movieId}/movie-description`)
                if (response.status===200){
                    setresponseMessage(response.data.message)
                    console.log(responseMessage) //debugging
                    setdescription((prev)=>({
                        ...prev,
                        descTitle:response.data.content.descTitle,
                        cast:response.data.content.cast || [],
                        genre:response.data.content.genre ||[]
                    }))
                }
            } catch (error) {
                if(axios.isAxiosError(error)){
                    setresponseMessage(error.response?.data?.error || "Internal server error")
                    console.log(responseMessage)
                }else{
                    setresponseMessage("Internal server error")
                    console.log(responseMessage)
                }
            }finally{
                setloading(false)
            }

        }
        getDesc()
    },[movieId])

    return (
        <div>
            {movieId}
            {loading ?(<p>Getting description</p>):(<p>{description.descTitle}</p>)}
        </div>
    )
}

export default page
