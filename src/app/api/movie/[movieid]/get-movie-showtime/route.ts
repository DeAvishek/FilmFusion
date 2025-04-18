import dbConnect from "@/app/lib/db";
import MovieModel from "@/app/Model/movie";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest){
    const slug= req.nextUrl.pathname.split("/")[3] //grt the slug
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