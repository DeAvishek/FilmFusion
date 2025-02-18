import mongoose,{Schema,Document} from "mongoose";

export  interface IMovieDescription extends Document{
    descTitle:string,
    cast:[string],
    genre:[string]
}

export const MovieDescSchema:Schema<IMovieDescription>=new Schema({
    descTitle:{
        type:String,
        required:true
    },
    cast:{
        type:[String],
        required:true
    },
    genre:{
        type:[String],
        required:true
    }
})

const MovieDescModel=(mongoose.models.MovieDesc as mongoose.Model<IMovieDescription>) || (mongoose.model<IMovieDescription>("MovieDesc",MovieDescSchema))
export default MovieDescModel