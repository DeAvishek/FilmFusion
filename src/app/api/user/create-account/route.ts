import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import UserModel from "@/app/Model/user";
export async function POST(req: Request) {
    const { username, email } = await req.json()
   
    const {searchParams} = new URL(req.url)
    const role_of_user = searchParams.get("role") as string
    
    try {
        await dbConnect()
        const existUser = await UserModel.findOne({ email: email })
        if (existUser) {
            return NextResponse.json({
                messgae: "User with email exists",
                success: false
            }, {
                status: 400  
            })
        }
        const newUser = new UserModel({
            username: username,
            email: email,
            role:role_of_user
        })

        await newUser.save()
        return NextResponse.json({
            message: "User created successfully",
            success: true,
        },{
            status:201
        })
    } catch (error: unknown) {
        return NextResponse.json({
            message: error instanceof Error ? error.message : "Sign up error",
            success: false
        }, {
            status: 500
        })
    }
} 