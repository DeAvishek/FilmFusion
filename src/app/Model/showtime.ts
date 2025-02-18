import mongoose,{Document,Schema} from "mongoose"

export interface IShowtime  extends Document{
    screen:number,
    time:Date,
    seatAvailable:number,
    price:number,
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
    }
})

const ShowtimeModel=(mongoose.models.Showtime as mongoose.Model<IShowtime>) || (mongoose.model<IShowtime>("Showtime",ShowtimeSchema))
export default ShowtimeModel