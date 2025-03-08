import MovieModel from "@/app/Model/movie";
import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";

export async function POST(req: Request, res: NextResponse) {
    const reqBody = await req.json()
    const { title, duration, language, posterUrl, trailerUrl, releaseDate } = reqBody

    try {
         await dbConnect()
        const movie = new MovieModel({
            title,
            duration,
            language,
            posterUrl,
            trailerUrl,
            releaseDate,
        })
        await movie.save();
        console.log("Movie added successfully")  //todo remove
        return NextResponse.json({
            message: "Movie added successfully"
        },{
            status:200
        })
    } catch (error:unknown) {
        console.log(error || "Error occur during add Movie") //todo remove
        return NextResponse.json({
            message: "Error occur during add Movie"
        },{
            status:500
        })
    }

}