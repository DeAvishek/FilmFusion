import dbConnect from "@/app/lib/db";
import PredictionModel from "@/app/Model/prediction";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/provider";
import {getServerSession} from "next-auth/next"
export async function GET(req:Request){
    const session=await getServerSession(AuthOptions)
    const userId=session?.user?._id
    try {
        await dbConnect()
        const moVies =  await PredictionModel.aggregate([
            // {
            //     $match:{user_id:userId}
            // },
            {
                $match:{
                    predicted_rating:{$gt:3.7}
                }
            },
            {
                $lookup:{
                    from:"movies",
                    localField:"movie_id",
                    foreignField:"_id",
                    as:"movieDetails"
                }
            },
            
        
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