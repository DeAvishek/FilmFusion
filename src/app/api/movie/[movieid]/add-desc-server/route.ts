import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import MovieModel from "@/app/Model/movie";
import MovieDescModel from "@/app/Model/moviedescription";
export async function  POST(req:Request,{params}:{params:{movieid:string}}){
    const reqBody=await req.json()
    const movieTitle= await params?.movieid
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