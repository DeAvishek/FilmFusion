"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import { gql } from "graphql-tag"
import { useQuery } from "@apollo/client"
import Seastui from '@/components/Seastui'
//type define
type seat_prop={
  _id:string,
  seatnumber:string,
  status:string
}
type itemprop = {
  _id: string
  location:string
  name:string
  totalseats:seat_prop[]
}

// Queries
const GET_THEATER_ID = gql`
query ExampleQuery($search: ShowtimeSearch) {
  showtime(search: $search) {
    theaters {
      _id
      location
      name
    }
  }
}
`

const page = () => {
  const params = useParams()
  const { data, loading, error } = useQuery(GET_THEATER_ID, {
    variables: {
      search: {
        _id: params?.movieid
      }
    }
  })
  return (
    <div className='flex justify-center'>
      {error && <p>{error.message}</p>}

      <div>
        {data?.showtime?.theaters.map((item: itemprop) => {
          return (
            <ul key={item._id}>
              <Seastui _id={item._id} name={item.name} location={item.location}/>
            </ul>
          )
        })}
        
      </div>
      {/* MOST IMPORTANT SEAT ALLOCATION */}
      

    </div>
  )
}

export default page
