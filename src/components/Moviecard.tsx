import Link from 'next/link'
import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
type dMovieProps={
    movieId:string,
    movieTitle:string,
    movieLanguage:string,
    moviePosterUrl:string
}

const Moviecard = ({movieId,movieTitle,movieLanguage,moviePosterUrl}:dMovieProps) => {
    return (
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
                <b>{movieLanguage}</b>
            </CardFooter>
        </Card></Link>

    )
}

export default Moviecard
