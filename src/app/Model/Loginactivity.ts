import mongoose,{Document,Schema} from "mongoose";
export interface ILoginActivity extends Document{
    date:Date,
    ip:string
}

export const LoginActivitySchema:Schema<ILoginActivity> = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default:Date.now
  },
  ip: {
    type: String,
    required: true,
  },
})

const LoginActivityModel = mongoose.models.LoginActivity || mongoose.model("LoginActivity", LoginActivitySchema);
export default LoginActivityModel