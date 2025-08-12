"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import { gql } from "graphql-tag"
import { useQuery } from "@apollo/client"
import Theatername from '@/components/Theatername'
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

const Page = () => {
  const params = useParams()
  const { data,loading, error } = useQuery(GET_THEATER_ID, {
    variables: {
      search: {
        _id: params?.movieid
      },
    },
    skip:!params?.movieid
  })
  return (
    <div className='flex justify-center'>
      {error && <p>{error.message}</p>}
      {loading ?(<p>Loading to get theaters...</p>):(<div>
        {data?.showtime?.theaters?.map((item: itemprop) => {
          return (
            <ul key={item._id}>
              <Theatername _id={item._id} name={item.name} location={item.location}/>
            </ul>
          )
        })}
        
      </div>)}
    </div>
  )
}

export default Page
