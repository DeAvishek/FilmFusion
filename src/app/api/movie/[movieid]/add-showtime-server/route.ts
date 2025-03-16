
import dbConnect from '@/app/lib/db'
import ShowtimeModel from '@/app/Model/showtime'
import MovieModel from '@/app/Model/movie'
import { NextResponse } from 'next/server'

export async function POST(req: Request, { params }: { params: { movieid: string } }) {
    const reqBody = await req.json();
    const movieTitle = await params?.movieid
    if (!movieTitle) {
        return NextResponse.json({
            message: "Movie title is required"
        }, {
            status: 400
        })
    }
    try {
        await dbConnect()
        const movieFormMovieDb = await MovieModel.findOne({ title: movieTitle })

        if (!movieFormMovieDb) {
            return NextResponse.json({
                message: "No movie found",
                success: false
            }, {
                status: 400
            })
        }
        const newShowtime = new ShowtimeModel(
            reqBody
        )
        await newShowtime.save();
        movieFormMovieDb.showtimes.push(newShowtime)
        await movieFormMovieDb.save()
        return NextResponse.json({ message: "showtime added successfully", success: true }, { status: 200 });
    } catch (error) {
        console.error("Error adding description:", error);
        return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
    }

}
