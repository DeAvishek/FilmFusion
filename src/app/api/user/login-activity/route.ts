import UserSettingsModel from "@/app/Model/Usersetting";
import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";
import {UAParser} from 'ua-parser-js' 
import { AuthOptions } from "../../auth/[...nextauth]/provider";
import {getServerSession} from "next-auth/next"
export async function PATCH(req:Request){
    
    const session = await getServerSession(AuthOptions)
    const parser = new UAParser()
    const userAgent = req.headers.get("user-agent")
    const uaResult = parser.setUA(userAgent!)
    const loginActivity={
        device:uaResult.getDevice().model || "Desktop",
        browser:uaResult.getBrowser().name
    }
    if (!session?.user?._id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
        await dbConnect();
        await UserSettingsModel.findOneAndUpdate({userID:session?.user?._id},{loginActivity},{
            new:true,
            upsert:true
        })
        return NextResponse.json({message:"LoginActivity updated" ,success:true },{status:200})
        
    } catch (error) {
        return NextResponse.json({ message: "Failed to update LoginActivity" },{status:500});
    } 
}