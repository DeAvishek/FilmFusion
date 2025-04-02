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
import { Plus, Trash2 } from 'lucide-react'
// Movie Props
type dMovieProps = {
    movieId: string
    movieTitle: string
    moviePosterUrl: string
    rating: number[]
}

const Moviecard = ({ movieId, movieTitle, moviePosterUrl, rating }: dMovieProps) => {
    const router = useRouter()
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
        <div className="movie-card relative group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md">
            <Link href={`/${movieId}/description`}>
                <Card className="border-0 bg-transparent">
                    <CardHeader className="p-0">
                        <div className="relative">
                            {/* Movie Poster with Gradient Overlay */}
                            <img
                                width={300}
                                height={450}
                                className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500"
                                src={moviePosterUrl}
                                alt={movieTitle}
                            />
                            {/* Rating Badge (positioned absolutely) */}
                            <div className="absolute bottom-3 left-3 bg-black/80 text-white px-2 py-1 rounded-full flex items-center text-sm font-medium">
                                ⭐ {getAverageRating()}/5
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="px-3 py-2">
                        <CardTitle className="text-lg font-bold line-clamp-1 text-white dark:text-white">
                            {movieTitle}
                        </CardTitle>
                    </CardContent>
                </Card>
            </Link>

            {/* Admin controls (only shown for admin users) */}
            {user?.role === 'admin' && (
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        variant="outline"
                        size="icon"
                        className="bg-white/90 hover:bg-white"
                        onClick={() => router.push(`/${movieTitle}/add-showtime-client`)}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="bg-white/90 hover:bg-red-500 hover:text-white"
                        onClick={handleDeleteMovie}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Moviecard
