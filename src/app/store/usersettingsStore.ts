import {create} from "zustand"
import {persist,createJSONStorage} from "zustand/middleware"

type userSettingState={
    username:string,
    theme:string,
    language:string,
    autoplayTrailers:boolean,
    ProfileStatus:string
}

type Actions={
    setUserSettings:(username:string,theme:string,language:string,autoplayTrailers:boolean,ProfileStatus:string)=>void
}

const User_Settings_Data_store = create<userSettingState&Actions>()(persist((set)=>({
    username:'',
    theme:'',
    language:'',
    autoplayTrailers:true,
    ProfileStatus:'',
    setUserSettings:(username,theme,language,autoplayTrailers,ProfileStatus)=>set({username,theme,language,autoplayTrailers,ProfileStatus})
}),{
    name:"user_settings_store",
    storage:createJSONStorage(()=>localStorage)
}
))

export default User_Settings_Data_store