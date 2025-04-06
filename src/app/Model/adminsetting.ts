import mongoose,{Schema,Document} from "mongoose";
import { boolean } from "zod";
export interface ISetting extends Document{
    movieRecommendation:boolean,
    autoApproveMovies:boolean,
    allowNewAdminCreation:boolean,
    maxAllowedAdmins:number,
    homepageBannerMessage:string
    enableUserRatings:boolean
    allowSignups:boolean
    siteLogoUrl:string

}
const adminSettingsSchema:Schema<ISetting>= new mongoose.Schema(
    {
      movieRecommendation: {
        type: Boolean,
        default: true,
      },
      autoApproveMovies: {
        type: Boolean,
        default: false,
      },
      allowNewAdminCreation: {
        type: Boolean,
        default: false,
      },
     
      maxAllowedAdmins: {
        type: Number,
        default: 5,
      },
      homepageBannerMessage: {
        type: String,
        default: "",
      },
      enableUserRatings:{
        type: Boolean,
        default:false
      },
      allowSignups:{
        type:Boolean,
        default:true
      },
      siteLogoUrl:{
        type:String,
        default:""
      }

    },
    {
      timestamps: true,
    }
  );
  const SettingModel= (mongoose.models.Booking as mongoose.Model<ISetting> )||(mongoose.model<ISetting>("Setting",adminSettingsSchema))
  export default SettingModel