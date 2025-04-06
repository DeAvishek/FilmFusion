import dbConnect from "@/app/lib/db";
import SettingModel from "@/app/Model/adminsetting";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    try {
        await dbConnect();
        
            let settings = await SettingModel.findOne();
            if (!settings) {
              settings = await SettingModel.create({});
            }
            return NextResponse.json({settings},{status:200});
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch settings"},{status:500});
    }
}