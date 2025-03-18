import mongoose,{Document,Schema} from "mongoose";

export interface ISeat extends Document{
    seatnumber:string,
    status: "available" | "pending" | "booked"
}

export const SeatSchema :Schema<ISeat>= new Schema({
    seatnumber:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ["available", "booked", "pending"],
        default:"available",
        required:true

    }
    
}) 

const SeatModel= (mongoose.models.Seat as mongoose.Model<ISeat>) || (mongoose.model<ISeat>("Seat",SeatSchema))
export default SeatModel