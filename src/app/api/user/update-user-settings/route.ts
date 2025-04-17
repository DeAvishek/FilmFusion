import dbConnect from "@/app/lib/db"
import UserSettingsModel from "@/app/Model/Usersetting"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { AuthOptions } from "../../auth/[...nextauth]/provider"

export async function PATCH(req:Request){
    const session=await getServerSession(AuthOptions)
    if(!session?.user._id){
        return NextResponse.json({message:"User not found..",success:false},{status:400})
    }
    const update = await req.json()
    try {
        await dbConnect()
        await UserSettingsModel.findOneAndUpdate({userID:session.user._id} ,update,{
            new:true,
            upsert:true
        })
        return NextResponse.json({message:"User setting updated" ,success:true},{status:200})
    } catch (error) {
        return NextResponse.json({messgae:error || "Server request declined",success:false},{status:500})
    }
}