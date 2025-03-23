import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import TheaterModel from "@/app/Model/theater";

export async function POST(req: Request, { params }: { params: { movieid: string } }) {
    const reqBody = await req.json();
    const slug = params?.movieid
    if (!slug) {
        console.log("not slug")  //todo to remove
        return NextResponse.json({
            message: "Theater ID is Required",
            success: false
        }, {
            status: 400
        })
    }
    try {
        await dbConnect()
        const theaterObjcet = await TheaterModel.findById({slug});
        if (!theaterObjcet) {
            console.log("not theaterobject")
            return NextResponse.json({
                message: "Theater not found",
                success: false,
            }, { status: 404 });
        }
        for (const seat of reqBody) {
            let intVAlue = Number(seat.slice(1))
            if (theaterObjcet?.totalseats[intVAlue - 1]) {
                theaterObjcet?.totalseats[intVAlue - 1]?.status=="booked"
                // // typeof theaterObjcet?.totalseats[intVAlue-1]?.status==='string'?
                // theaterObjcet?.totalseats[intVAlue-1]?.status as string ="booked"
            }
        }
        await theaterObjcet?.save()
        return NextResponse.json({
            message: "Seats updated successfully",
            success: true,
        },{
            status:200
        });

    } catch (error) {
        console.error("Error updating seats:", error);
        return NextResponse.json({
            message: "Internal server error",
            success: false,
        }, { status: 500 });
    }
}