
import dbConnect from '@/app/lib/db'
import ShowtimeModel from '@/app/Model/showtime'
import MovieModel from '@/app/Model/movie'
import { NextRequest, NextResponse } from 'next/server'
import TheaterModel, { ITheater } from '@/app/Model/theater'
import mongoose from 'mongoose';
export async function POST(req:NextRequest) {
    const reqBody = await req.json();
    const {screen,time,price,theaters}=reqBody
    const movieTitle = req.nextUrl.pathname.split("/")[3]
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
            price:price
        })
        // Save all theaters and store 
        const theaterIds= await Promise.all(theaters.map(async(theaterdata:Partial<ITheater>)=>{
            const newTheater =  new TheaterModel(
                theaterdata
            )
            await newTheater.save()
            return newTheater._id

        }))
        newShowtime.theaters=theaterIds
        await newShowtime.save();
        const showtimeId: mongoose.Types.ObjectId = newShowtime._id as mongoose.Types.ObjectId;
        movieFormMovieDb.showtimes=movieFormMovieDb.showtimes.concat(showtimeId)
        await movieFormMovieDb.save()
        return NextResponse.json({ message: "showtime added successfully", success: true }, { status: 200 });
    } catch (error) {
        console.error("Error adding Showtime:", error);
        console.log(error)
        return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
    }

}
