import mongoose,{Schema,Document} from "mongoose";
import { IMovieDescription ,MovieDescSchema} from "./moviedescription";
export interface IMovie extends Document{
    title:string,
    duration:number,
    language:string,
    descriptions: IMovieDescription,
    posterUrl:string,
    trailerUrl?:string,
    releaseDate:Date,
    showtimes:mongoose.Types.ObjectId[],
    rating:number[],
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
    descriptions:{
        type:MovieDescSchema
    },
    posterUrl:{
        type:String,
        required:true,
    },
    trailerUrl:{
        type:String,
        default:null
    },
    releaseDate:{
        type:Date,
        required:true
    },
    showtimes:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:'Showtime'}],
        default:[]
        
    },
    rating:{
        type:[Number],
        default:[2],
        min:1,
        max:5
    }
})

const MovieModel=(mongoose.models.Movie as mongoose.Model<IMovie>) || (mongoose.model<IMovie>("Movie",MovieSchema))
export default MovieModel