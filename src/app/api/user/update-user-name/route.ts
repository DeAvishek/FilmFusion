import dbConnect from "@/app/lib/db";
import UserSettingsModel from "@/app/Model/Usersetting";
import UserModel from "@/app/Model/user";
import {getServerSession} from "next-auth"
import { AuthOptions } from "../../auth/[...nextauth]/provider";
import { NextResponse } from "next/server";
export async function PATCH(req:Request){
    const session = await getServerSession(AuthOptions)
    if(!session?.user._id){
        return NextResponse.json({message:"User not found..please try again later",success:false},{status:400})
    }
    const update= await req.json()
    const user_ID = session?.user?._id
    try {
        await dbConnect()
        await UserSettingsModel.findOneAndUpdate({userID:user_ID},update,{
            new:true,
            upsert:true
        })
        await UserModel.findByIdAndUpdate({_id:user_ID},update)
        return NextResponse.json({message:"User name updated",success:true},{status:200})
    } catch (error) {
        return NextResponse.json({message: error ||"Internal server error..during update username",success:false},{status:500})
    }
}