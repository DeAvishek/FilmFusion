"use client"
import React, { use } from 'react'
import { gql } from 'graphql-tag'
import { useQuery } from '@apollo/client'
import {LucideLoaderCircle} from "lucide-react" 
import Users from '@/components/Users'
type user_prop={
    username:string,
    email:string
}
const page = () => {
    const GET_USERS = gql`
    query Query {
     users {
       username
       email
  }
}`
    const { data, loading, error } = useQuery(GET_USERS)
    const [users,setUsers] = React.useState<user_prop[]>([])

    React.useEffect(() => {
            if (data && data?.users) {
                setUsers(data.users.map((user:user_prop) => user ));
            }
        }, [data]);
    return (
        <div className='flex items-center justify-center mt-5'>
            {error ? (<span className='bg-red-500'> </span>):(
                loading?(<LucideLoaderCircle size={100}  className="text-blue-500 animate-spin"/>):
                (users.map((user,index)=>
                <Users key={index} username={user.username} email={user.email} />))
            )}

        </div>
    )
}

export default page
