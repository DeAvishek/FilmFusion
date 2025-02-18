import mongoose,{Schema,Document} from "mongoose";
import { IShowtime } from "./showtime";
import { IMovieDescription } from "./moviedescription";
import { MovieDescSchema } from "./moviedescription";
import { ShowtimeSchema } from "./showtime";
export interface IMovie extends Document{
    title:string,
    duration:number,
    language:string,
    descriptions: [IMovieDescription],
    posterUrl:string,
    trailerUrl?:string,
    releaseDate:Date,
    showtimes:[IShowtime]

}
export const MovieSchema:Schema<IMovie>=new Schema({
    title:{
        required:true,
        type:String
    },
    duration:{
        type:Number,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    descriptions:[
        MovieDescSchema
    ],
    posterUrl:{
        type:String,
        required:true,
    },
    trailerUrl:{
        type:String,
    },
    releaseDate:{
        type:Date,
        required:true
    },
    showtimes:[
        ShowtimeSchema
    ]
})

const MovieModel=(mongoose.models.Movie as mongoose.Model<IMovie>) || (mongoose.model<IMovie>("Movie",MovieSchema))
export default MovieModel