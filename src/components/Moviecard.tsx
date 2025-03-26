"use client"
import Link from 'next/link'
import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import { Button } from './ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
// Movie Props
type dMovieProps = {
    movieId: string
    movieTitle: string
    moviePosterUrl: string
    rating: number[]
}

const Moviecard = ({ movieId, movieTitle, moviePosterUrl, rating }: dMovieProps) => {
    const router= useRouter()
    const handleDeleteMovie = async () => {
        try {
            const response = await axios.delete(`/api/movie/${movieId}/delete-movie`)
            if (response.status === 200) {
                console.log(response.data.message)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data.error)
            } else {
                console.log('adjust this')
            }
        }
    }

    const { data: session } = useSession()
    const user = session?.user

    const getAverageRating = () => {
        let length = rating.length
        if (length === 0) return 'No ratings yet'
        if (length === 1) return rating[0].toFixed(1)
        let lastElement = rating.at(-1)
        return (lastElement as number / length).toFixed(1)
    }

    return (
        <div className='movie-card'>
            <Link href={`/${movieId}/description`}>
                <Card className='shadow-lg hover:shadow-xl transition-shadow duration-300'>
                    <CardHeader>
                        <CardTitle className='text-xl font-semibold'>{movieTitle}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <img
                            width={300}
                            height={300}
                            className='w-full h-64 object-cover rounded-lg'
                            src={moviePosterUrl}
                            alt={movieTitle}
                        />
                        <b>⭐{getAverageRating()}/5</b>
                    </CardContent>
                </Card>
            </Link>
            {user?.role === 'admin' && (
                <div className='mt-2'>
                    <Button onClick={()=>router.push(`${movieTitle}/add-showtime-client`)}>Add show time</Button>
                    <Button className='ml-3' variant='destructive' onClick={handleDeleteMovie}>Delete</Button>
                </div>
            )}
        </div>
    )
}

export default Moviecard
