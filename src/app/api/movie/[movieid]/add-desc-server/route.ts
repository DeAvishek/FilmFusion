import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import MovieModel from "@/app/Model/movie";
import MovieDescModel from "@/app/Model/moviedescription";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req:NextRequest){
    const reqBody=await req.json()
    const movieTitle = req.nextUrl.pathname.split("/")[3]
    if(!movieTitle){
        return NextResponse.json({
            message:"Movie title is required"
        },{
            status:400
        })
    }
    try {
        await dbConnect()
        const movie=await MovieModel.findOne({title:movieTitle})
        if(!movie){
            return NextResponse.json({
                message:"No movie found",
                success:false
            },{
                status:400
            })
        }
        
        const newDesc= new MovieDescModel(
            reqBody
        )
        await newDesc.save()

        movie.descriptions=newDesc
        await movie.save()
        return NextResponse.json({ message: "Description added successfully", success: true }, { status: 200 });
    } catch (error) {
        console.error("Error adding description:", error);
        return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
    }
}