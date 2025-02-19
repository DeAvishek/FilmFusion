import mongoose,{Document,Schema} from "mongoose"
import { TheaterSchema } from "./theater"
import { ITheater } from "./theater"
export interface IShowtime  extends Document{
    screen:number,
    time:Date,
    seatAvailable:number,
    price:number,
    theaters:ITheater[]
}

export const ShowtimeSchema:Schema<IShowtime>=new Schema({
    screen:{
        type:Number,
        required:true
    },
    time:{
        type:Date,
        required:true
    },
    seatAvailable:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    theaters:[
        TheaterSchema
    ]
})

const ShowtimeModel=(mongoose.models.Showtime as mongoose.Model<IShowtime>) || (mongoose.model<IShowtime>("Showtime",ShowtimeSchema))
export default ShowtimeModel