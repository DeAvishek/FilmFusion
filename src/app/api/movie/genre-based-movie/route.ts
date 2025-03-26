import { NextResponse } from "next/server";
import MovieModel from "@/app/Model/movie";
import dbConnect from "@/app/lib/db";

export async function GET(req:Request){
    const {searchParams} =new URL(req.url)
    const genre=searchParams.get("genre") as string

    try {
        await dbConnect()
        const Movies= await MovieModel.aggregate([
            {
                $unwind:"$descriptions.genre"
            },
            {
                $match:{
                    "descriptions.genre":genre
                }
            },
            {
                $group:{
                    _id:"$_id",
                    title:{$first:"$title"},
                    duration:{$first:"$duration"},
                    language:{$first:"$language"},
                    posterUrl:{$first:"$posterUrl"},
                    trailerUrl:{$first:"$trailerUrl"},
                    showtimes: { $push: "$showtimes" },
                    rating: { $first: "$rating" },
                    descriptions: { $first: "$descriptions" },
                }
            }
        ])
        return NextResponse.json({
            movies:Movies,
            success:true,
            message:"Movies Fecthed"
        },{
            status:200
        })
    } catch (error) {
        console.log(error || "Movies getting error")
        return NextResponse.json({ message: error instanceof Error ? error.message : "Movies getting error" }, {
            status: 500
        })
    }
}