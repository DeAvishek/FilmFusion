
import dbConnect from "@/app/lib/db";
import SettingModel from "@/app/Model/adminsetting";
import { NextResponse } from "next/server";
export async function PATCH(req:Request) {
    try {
        await dbConnect();
      const update = await req.json()
      const updatedSettings = await SettingModel.findOneAndUpdate({}, update, {
        new: true,
        upsert: true,
      });
      await updatedSettings.save()
      return NextResponse.json({updatedSettings,message:"setting updated"},{
        status:200
      });
    } catch (error) {
      return NextResponse.json({ message: "Failed to update settings" },{status:500});
    }
  }

