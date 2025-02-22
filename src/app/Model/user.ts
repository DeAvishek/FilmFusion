import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends Document{
    username:string,
    email:string,
    latentVector:number[],
    interactions:{
        movieId:mongoose.Schema.Types.ObjectId,
        rating:number ,//(1-5)
        timestamp:Date
    }[]
}

const UserSchema:Schema<IUser>=new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    latentVector:{
        type:[Number],
        default:[]
    },
    interactions: {
        type: [
            {
                movieId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Movie",
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 5,
                },
                timestamp: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        default: [], // Ensures new users have an empty array instead of undefined
    },
})

const UserModel=(mongoose.models.User as mongoose.Model<IUser> ) || (mongoose.model<IUser>("User",UserSchema))
export default UserModel