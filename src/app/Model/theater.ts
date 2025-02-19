import mongoose,{Document,Schema} from "mongoose";

export interface ITheater extends Document{
    name:string,
    location:string,
    totalseats:number
}

export const TheaterSchema:Schema<ITheater> =new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    totalseats:{
        type:Number,
        required:true
    }
})

const TheaterModel= (mongoose.models.Theater as mongoose.Model<ITheater>) || (mongoose.model<ITheater>("Theater",TheaterSchema)) 
export default TheaterModel