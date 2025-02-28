import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import MovieModel from "@/app/Model/movie";
export async function GET(request:Request){
    const {searchParams}= new URL(request.url)
    let searchItem=searchParams.get("search") as string
    searchItem=searchItem.charAt(0).toLocaleUpperCase()+ searchItem.slice(1).toLowerCase()

    try {
        await dbConnect();
        const movie=await MovieModel.findOne({title:searchItem})
        if(!movie){
            return NextResponse.json({
                message:"No movie found",
                success:false,
                content:{}
            },{
                status:400
            })
        }
        return NextResponse.json({
            message:"movie fetched",
            success:true,
            content:movie
        },{
            status:200
        })
    } catch (error: unknown) {
        console.log(error || "Movies getting error")
        return NextResponse.json({ message: error instanceof Error ? error.message : "Movies getting error" }, {
            status: 500
        })
    }
}