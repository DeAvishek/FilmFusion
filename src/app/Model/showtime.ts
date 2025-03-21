import mongoose, { Document, Schema } from "mongoose"

export interface IShowtime extends Document {
    screen: number,
    time: Date,
    price: number,
    theaters: mongoose.Types.ObjectId[]
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
        type: [{type:Schema.Types.ObjectId ,ref:'Theater'}],
        default: []
    }
})

const ShowtimeModel = (mongoose.models.Showtime as mongoose.Model<IShowtime>) || (mongoose.model<IShowtime>("Showtime", ShowtimeSchema))
export default ShowtimeModel