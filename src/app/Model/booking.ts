import mongoose,{Document,Schema} from "mongoose";

interface IBooking extends Document{
    userId:string,
    theaterName:string,
    seats:string[],
    bookedAt:Date,
    totalAmount:number,
    paymentId:string,
    paymentStatus:string
}

const BookingSchema:Schema<IBooking>=new Schema({
    userId:{
        type:String,
        required:true
    },
    theaterName:{
        type:String,
        required:true
    },
    seats:{
        type:[String],
        retuired:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
    paymentId: {
        type: String,
    },
    bookedAt: {
        type: Date,
        default: Date.now,
    },
})

const BookingModel= (mongoose.models.Booking as mongoose.Model<IBooking> )||(mongoose.model<IBooking>("Booking",BookingSchema))
export default BookingModel