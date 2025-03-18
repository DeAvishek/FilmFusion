import mongoose, { Document, Schema } from "mongoose"
import { TheaterSchema } from "./theater"
import { ITheater } from "./theater"

export interface IShowtime extends Document {
    screen: number,
    time: Date,
    price: number,
    theaters: ITheater[]
}

export const ShowtimeSchema: Schema<IShowtime> = new Schema({
    screen: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    theaters: {
        type: [TheaterSchema],
        default: []
    }
})

const ShowtimeModel = (mongoose.models.Showtime as mongoose.Model<IShowtime>) || (mongoose.model<IShowtime>("Showtime", ShowtimeSchema))
export default ShowtimeModel