
import { NextResponse } from "next/server";
import MovieModel from "@/app/Model/movie";
import dbConnect from "@/app/lib/db";
export async function GET() {
    try {
        await dbConnect();
        const Movies = await MovieModel.find()
        if (!Movies.length) {
            return NextResponse.json({ message: "No movies found", movies: [] }, { status: 204 });
        }
        console.log("Movies fetched successfully") //todo remove
        return NextResponse.json({ message: "Movies fetched successfully", movies: Movies }, {
            status: 200
        })

    } catch (error:unknown) {
        console.log(error || "Movies getting error")
        return NextResponse.json({message:error instanceof Error ? error.message: "Movies getting error"},{
            status:500
        })
    }


}