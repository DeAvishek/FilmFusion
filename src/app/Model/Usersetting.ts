import mongoose,{Document,Schema}from "mongoose";
import { ILoginActivity } from "./Loginactivity";
import { LoginActivitySchema } from "./Loginactivity";

interface IUserSetting extends Document{
    username:string,
    deleteAccount:boolean,
    theme:string,
    preferredGenre:[string],
    language:string,
    autoplayTrailers:boolean,
    ProfileStatus:string,
    loginActivity:ILoginActivity[]

}
const UserSettingsSchema:Schema<IUserSetting> = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      minlength: 3,
    },
    deleteAccount: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
    preferredGenre: {
      type: [String],
      required:false,
      default:[]
    },
    language: {
      type: String,
      enum: ["english", "hindi", "spanish", "french", "german"],
      default: "english",
    },
    autoplayTrailers: {
      type: Boolean,
      default: true,
    },
    ProfileStatus: {
      type: String,
      enum:["private","public"],
      default: "public",
    },
    loginActivity: {
      type: [LoginActivitySchema],
      default: [],
    },
  }, { timestamps: true });
  
  const UserSettingsModel = mongoose.models.UserSettings || mongoose.model("UserSettings", UserSettingsSchema);
  
  export default UserSettingsModel;