import dbConnect from "@/app/lib/db";
import TheaterModel from "@/app/Model/theater";
import ShowtimeModel from "@/app/Model/showtime";
import { NextResponse } from "next/server";

export async function DELETE(req:Request,{params}:{params:{movieid:string}}){
    const showtime_id=await params?.movieid
    if(!showtime_id) {
        return NextResponse.json({
            message:"Showtime id is no present",
            success:false
        },{
            status:400
        })
    }
    try {
        await dbConnect()
        
        const showtime=await ShowtimeModel.findByIdAndDelete({_id:showtime_id})
        if(!showtime){
            return NextResponse.json({})
        }

        if(showtime.theaters.length>0){
            await TheaterModel.deleteMany({_id:{$in:showtime.theaters}})
        }

        return NextResponse.json({
            message:showtime?.theaters?.length?"Showtime deleted with respected Theaters":"Showtime deleted",
            success:true
        },{
            status:200
        })

    } catch (error) {
        return NextResponse.json({
            message:error || "Server error occur during delete showtime",
            success:false
        },{
            status:500
        })
    }

}