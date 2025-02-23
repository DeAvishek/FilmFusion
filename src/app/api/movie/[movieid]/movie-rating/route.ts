import dbConnect from "@/app/lib/db";
import MovieModel from "@/app/Model/movie";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { movieid: string } }) {
    const body=await req.json();
    const rating=body['imdbRating']

    const movieId = params.movieid
    console.log("movie id", movieId) 
    if (!movieId) {
        return NextResponse.json({
            message: "Not found",
            success: false
        }, {
            status: 400
        })
    }
    try {
        await dbConnect()
        const movie = await MovieModel.findById( movieId )
        if (!movie) {
            return NextResponse.json({ message: "Content not found", success: true },
                {
                    status: 404
                }
            )
        }
         const prefixSumRating=movie.rating.length>0?movie.rating.at(-1):0
         const newRating=prefixSumRating as number+rating
         movie.rating.push(newRating)
         await movie.save()
         return NextResponse.json({
            message:"Rating submit successfully",
            success:true,
         },{
            status:200
         })
    } catch (error) {
        return NextResponse.json({
            message:error instanceof Error ? error.message: "Rating submit error",
            success:false
        },{
            status:500
        })
    }
}