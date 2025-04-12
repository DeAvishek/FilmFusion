import mongoose,{Document,Schema}from "mongoose";

export interface ILoginActivity extends Document{
  date:Date,
  device:string,
  browser:string
}
export interface IUserSetting extends Document{
    userID:mongoose.Types.ObjectId
    username:string,
    theme:string,
    preferredGenre:[string],
    language:string,
    autoplayTrailers:boolean,
    ProfileStatus:string,
    loginActivity:ILoginActivity

}

const UserSettingsSchema:Schema<IUserSetting> = new mongoose.Schema({
    userID  :{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true,
      unique:true
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
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
      type:{
        date:{
          type:Date,
          required:true,
          default:Date.now
        },
        device:{
          type:String,
          required:true
        },
        browser:{
          type:String,
          required:true
        }
      },
      // default:()=>({})
    },
  }, { timestamps: true });
  
  const UserSettingsModel = mongoose.models.UserSettings || mongoose.model("UserSettings", UserSettingsSchema);
  
  export default UserSettingsModel;