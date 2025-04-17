import dbConnect from "@/app/lib/db";
import UserModel from "@/app/Model/user";
import { NextResponse } from "next/server";
import BookingModel from "@/app/Model/booking";
import MovieModel from "@/app/Model/movie";
export async function GET(){
    try {
        await dbConnect()
        const no_of_users = await UserModel.collection.countDocuments()
        const no_of_movies =await MovieModel.collection.countDocuments()
        const no_of_booking = await BookingModel.collection.countDocuments()
        const revenue = await BookingModel.aggregate([
            {
              $group:{
                _id:null,
                revenue: {$sum:"$totalAmount"}
              }
            }
        ])
        return NextResponse.json({
            userCount:no_of_users,
            moviesCount:no_of_movies,
            bookingsCount:no_of_booking,
            revenue:revenue,
            success:true
        },{
            status:200
        })
    } catch (error) {
        return NextResponse.json({message:error,success:false},{status:500})
    }
}