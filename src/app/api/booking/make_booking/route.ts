import dbConnect from "@/app/lib/db";
import BookingModel from "@/app/Model/booking";
import {getServerSession} from "next-auth"
import { AuthOptions } from "../../auth/[...nextauth]/provider";
import { NextResponse } from "next/server";
export async function POST(req:Request){
    const session = await getServerSession(AuthOptions)
    const userID=session?.user._id
    if(!userID){
        return NextResponse.json({
            message:"No user Available",
            success:false
        },{
            status:400
        })
    }
    try {
        await dbConnect()
        const newBooking=new BookingModel({
            userId:userID,
            theaterName:"tilok" ,//todo
            seats:['h1'],   //todo
            totalAmount:1000, //todo
            paymentStatus:"" ,// todo
            paymentId:"",
        })
        await newBooking.save()
        return NextResponse.json({
            message:"Your ticked is booked you may experience your movie adventure..",
            success:true
        },{
            status:201
        })
    } catch (error) {
        return NextResponse.json({
            message: error instanceof Error ? error.message : "Booking error...",
            success: false
        }, {
            status: 500
        })
    }
}