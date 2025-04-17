import dbConnect from "@/app/lib/db";
import MovieModel from "@/app/Model/movie";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await dbConnect
        const moVies= await MovieModel.aggregate([
            {
                $addFields:{
                    avgRating:{
                        $divide:[{
                            $last:"$rating"
                        },{$size:"$rating"}]
                    }
                }
            },
            {
                $match:{
                    avgRating:{$gt:3.7}
                }
            }
        ])
        return NextResponse.json({
            movies:moVies,
            success:true,
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