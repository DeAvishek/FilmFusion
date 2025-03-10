import { NextResponse } from "next/server";
import MovieModel from "@/app/Model/movie";
import dbConnect from "@/app/lib/db";

export async function DELETE(req:Request,{params}:{params:{movieid:string}}){
    const id=await params?.movieid
    if(!id){
        return NextResponse.json({
            message:"Movie id is required"
        },{
            status:400
        })
    }
    try {
        await dbConnect()
        await MovieModel.findByIdAndDelete({_id:id})
        return NextResponse.json({
            message:"Movie deleted",
            success:true
        },{
            status:200
        })
    } catch (error) {
        console.error("Error adding description:", error);
        return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
    }
    

}