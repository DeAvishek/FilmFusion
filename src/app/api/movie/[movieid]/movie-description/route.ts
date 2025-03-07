
import MovieModel from "@/app/Model/movie";
import dbConnect from "@/app/lib/db";
import mongoose from 'mongoose'
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { movieid: string } }) {
    const movieId=await params?.movieid
    const movieObjId=new mongoose.Types.ObjectId(movieId )
    
    console.log("movie id",movieObjId) //todo remove
    if (!movieObjId) {
        return NextResponse.json({
            message: "Not found",
            success: false
        }, {
            status: 404
        })
    }
    try {
        await dbConnect()
        const movie = await MovieModel.findById( movieObjId )
        if (!movie) {
            return NextResponse.json({ message: "Content not found", success: true },
                {
                    status: 404
                }
            )
        }
        
        return NextResponse.json({
            message:"Movie found",
            content:movie,
            poster:movie.posterUrl,
            success:true

        },{
            status:200
        })
    } catch (error:unknown) {
        return NextResponse.json({
            message:error instanceof Error ? error.message: "Movies getting error",
            success:false
        },{
            status:500
        })
    }


}