import dbConnect from "@/app/lib/db";
import MovieModel from "@/app/Model/movie";
import { NextResponse } from "next/server";
import UserModel from "@/app/Model/user";
import { getServerSession } from "next-auth/next"
import { AuthOptions } from "@/app/api/auth/[...nextauth]/provider";

export async function POST(req: Request, { params }: { params: { movieid: string } }) {
    const session = await getServerSession(AuthOptions )
    const userId=session?.user._id

    const body = await req.json();
    const rating = body['imdbRating']

    const movieId = params.movieid
    console.log("movie id from movie rating api", movieId)
    if (!movieId) {
        return NextResponse.json({
            message: "Not found",
            success: false
        }, {
            status: 400
        })
    }
    try {
        await dbConnect()
        const movie = await MovieModel.findById(movieId)
        if (!movie) {
            return NextResponse.json({ message: "Content not found", success: true },
                {
                    status: 404
                }
            )
        }

        const user=await UserModel.findById({_id:userId})
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }

        const existingInteraction= user.interactions.find((intreaction)=> intreaction.movieId.toString()===movieId)
        if(existingInteraction){
            existingInteraction.rating=rating
            existingInteraction.timestamp=Date.now()
        }else{
            const interactionObject={
                movieId:movieId,
                rating:rating,
                timestamp:Date.now()
            }
            user.interactions.push(interactionObject)
             
        }
        await user.save()

        const prefixSumRating = movie.rating.length > 0 ? movie.rating.at(-1) : 0
        const newRating = prefixSumRating as number + rating
        movie.rating.push(newRating)
        await movie.save()

        return NextResponse.json({
            message: "Rating submit successfully",
            success: true,
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: error instanceof Error ? error.message : "Rating submit error",
            success: false
        }, {
            status: 500
        })
    }
}