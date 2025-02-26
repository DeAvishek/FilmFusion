import MovieModel from "@/app/Model/movie";
import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    let city = searchParams.get("city") as string
    city =city.charAt(0).toUpperCase() + city.slice(1);
    try {
        await dbConnect()
        const Movies = await MovieModel.aggregate([
            {
                $match: { "showtimes.theaters.location": city }
            },
            {
                $unwind: "$showtimes"
            },
            {
                $unwind: "$showtimes.theaters"
            },
            {
                $match: {
                    "showtimes.theaters.location": city
                }
            },
            {
                $group: {
                    _id: "$_id",
                    title: { $first: "$title" },
                    duration: { $first: "$duration" },
                    language: { $first: "$language" },
                    posterUrl: { $first: "$posterUrl" },
                    showtimes: { $push: "$showtimes" },
                    rating: { $first: "$rating" },
                    descriptions: { $first: "$descriptions" }
                }
            }
        ])
        return NextResponse.json({
            movies: Movies,
            message: "Movie fectched successfully"
        }, {
            status: 200
        })
    } catch (error: unknown) {
        console.log(error || "Movies getting error")
        return NextResponse.json({ message: error instanceof Error ? error.message : "Movies getting error" }, {
            status: 500
        })
    }
}