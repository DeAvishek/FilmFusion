import mongoose,{Document,Schema} from "mongoose";
import { ISeat, SeatSchema } from "./seats"
export interface ITheater extends Document{
    name:string,
    location:string,
    totalseats:ISeat[]
}
const generateSeats= () : ISeat[]=>{
  return Array.from({length:50},(_,i)=>({
      seatnumber:`A${i+1}`,
      status:"available",
  }));
};
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
        type: [SeatSchema],
        default: generateSeats
    }
})

const TheaterModel= (mongoose.models.Theater as mongoose.Model<ITheater>) || (mongoose.model<ITheater>("Theater",TheaterSchema)) 
export default TheaterModel