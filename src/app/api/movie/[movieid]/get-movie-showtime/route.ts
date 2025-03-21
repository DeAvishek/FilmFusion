import dbConnect from "@/app/lib/db";
import MovieModel from "@/app/Model/movie";
import ShowtimeModel, { IShowtime } from "@/app/Model/showtime";
import { NextResponse } from "next/server";
import { string } from "zod";
type showtime_type={
    _id:string,
    screen:number,
    price:number,
    time:Date,
    theaters:[]
}
export async function GET(req:Request,{params}:{params:{movieid:string}}){
    const slug= await params?.movieid //grt the slug
    try {
        await dbConnect()
        const movie = await MovieModel.findById(slug).populate('showtimes');

        if(!movie){
            return NextResponse.json({
                success:false
            },{
                status:400
            })
        }
    
        return NextResponse.json({
            success:true,
            showtimes:movie?.showtimes
        },{
            status:200
        })
    } catch (error) {
        return NextResponse.json({
            message:error instanceof Error ? error.message: "Getting showtimes error",
            success:false
        },{
            status:500
        })
    }
}