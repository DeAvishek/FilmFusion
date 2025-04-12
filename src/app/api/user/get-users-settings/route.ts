import dbConnect from "@/app/lib/db";
import UserSettingsModel from "@/app/Model/Usersetting";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/provider";
import {getServerSession} from "next-auth"
export async function GET(req:Request) {
    const session = await getServerSession(AuthOptions) 
    if(!session?.user){
        return NextResponse.json({message:"Bad request User not found",success:false},{status:400})
    }

    try {
        await dbConnect()
        const userSettings = await UserSettingsModel.findOne({userID:session.user._id})
        return NextResponse.json({settings:userSettings,success:true},{status:200})
    } catch (error) {
        return NextResponse.json({messgae:"Not getting users settings"},{status:500})
    }
}