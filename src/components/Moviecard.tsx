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
        <Link href={`/${movieId}/description`}><Card className="bg-red-500"style={{ width: '230px', height: '300px' }}>
            <CardHeader>
                <CardTitle>{movieTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                <img src={`${moviePosterUrl}`} alt='poster'/>
            </CardContent>
            <CardFooter>
                <p>{movieLanguage}</p>
            </CardFooter>
        </Card></Link>

    )
}

export default Moviecard
