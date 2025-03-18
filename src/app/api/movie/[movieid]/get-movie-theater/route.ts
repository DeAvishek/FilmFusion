import dbConnect from "@/app/lib/db";
import MovieModel from "@/app/Model/movie";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:{movieid:string}}){
    const slug= await params?.movieid //grt the slug
    try {
        await dbConnect()
        const movie= await MovieModel.findOne({_id:slug})
        if(!movie){
            return NextResponse.json({
                success:false
            },{
                status:400
            })
        }
        return NextResponse.json({
            success:true,
            showtimes:movie.showtimes
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