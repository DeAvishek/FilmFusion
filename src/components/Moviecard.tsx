import Link from 'next/link'
import React, { use } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useSession } from 'next-auth/react'
import { Button } from './ui/button'
type dMovieProps={
    movieId:string,
    movieTitle:string
    moviePosterUrl:string,
    rating:number[]
} 
const Moviecard = ({movieId,movieTitle,moviePosterUrl,rating}:dMovieProps) => {
     const {data:session}=useSession();
     const user=session?.user
     const getAverageRating = () => {
        let length = rating.length
        if (length=== 0) return "No ratings yet"
        if (length === 1) return rating[0].toFixed(1)
        let lastElement = rating.at(-1)
        return (lastElement as number / length).toFixed(1)
    }
    return (
        <div>
        <Link href={`/${movieId}/description`}><Card className="bg-red-500 text-white">
            <CardHeader>
                <CardTitle><b style={{fontSize:'20px'}}>{movieTitle}</b></CardTitle>
            </CardHeader>
            <CardContent>
                <img 
                width={300}
                height={300}
                className="w-full h-64 object-cover rounded-lg"              
                src={moviePosterUrl} 
                alt={movieTitle}/>
            </CardContent>
            <CardFooter>
                <b>{getAverageRating()}/5</b>
            </CardFooter>
        </Card></Link>
        {user?.role==="admin" &&
        (
            <>
            <Button>Edit show time</Button>
            <Button className="ml-3"variant="destructive">Delete</Button>
            </>
        )}
        </div>

    )
}

export default Moviecard
