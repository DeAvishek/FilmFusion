
import dbConnect from '@/app/lib/db'
import ShowtimeModel from '@/app/Model/showtime'
import MovieModel from '@/app/Model/movie'
import { NextResponse } from 'next/server'
import TheaterModel from '@/app/Model/theater'

export async function POST(req: Request, { params }: { params: { movieid: string } }) {
    const reqBody = await req.json();
    const {screen,time,seatAvailable,price,theaters}=reqBody
    const movieTitle = await params?.movieid
    if (!movieTitle) {
        console.log("i am from Movie title required") 
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
            console.log("i am from No movie found") //for debugging 
            return NextResponse.json({
                message: "No movie found",
                success: false
            }, {
                status: 400
            })
        }
        const newShowtime = new ShowtimeModel({
            screen:screen,
            time:time,
            seatAvailable:seatAvailable,
            price:price
        })
        // Save all theaters and store 
        const theater= await Promise.all(theaters.map(async(theaterdata:unknown)=>{
            const newTheater =  new TheaterModel(
                theaterdata
            )
            await newTheater.save()
            return newTheater

        }))
        newShowtime.theaters=theater
        await newShowtime.save();
        movieFormMovieDb.showtimes.push(newShowtime)
        // newShowtime.theaters=newTheater
        await movieFormMovieDb.save()
        return NextResponse.json({ message: "showtime added successfully", success: true }, { status: 200 });
    } catch (error) {
        console.error("Error adding Showtime:", error);
        console.log(error)
        return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
    }

}
