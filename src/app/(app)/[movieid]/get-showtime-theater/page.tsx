"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import { gql } from "graphql-tag"
import { useQuery } from "@apollo/client"
import ProgressDemo from '@/components/Progressbar'
const GET_THEATER_TITLE=gql`
query ExampleQuery($search: ShowtimeSearch) {
  showtime(search: $search) {
    theaters {
      name
      _id
    }
  }
}
`
type itemprop={
  name:string,
  _id:string
}
const page = () => {
  const params=useParams()
  const {data,loading,error} = useQuery(GET_THEATER_TITLE,{
    variables:{
      search:{
        _id:params?.movieid
      }
    }
  })
  console.log(data?.showtime?.theaters)
  return (
    <div className='content-center items-center'>
      {error && <p>{error.message}</p>}
      
      (<ul>
        {data?.showtime?.theaters.map((item:itemprop)=>{
          return <li className= "text-white" key={item._id}>{typeof item.name==='string' ? item.name:'Invalid'}</li>
        })}
       </ul>)
    </div>
  )
}

export default page
