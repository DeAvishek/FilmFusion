import {create} from "zustand"
import {persist,createJSONStorage} from "zustand/middleware"

type AdminSetting={
    movieRecommendation:boolean,
    enableUserRatings:boolean,
    homepageBannerMessage:string,
    siteLogoUrl:string,
}

type Actions={
    setAdminSetting:(movieRecommendation:boolean,enableUserRatings:boolean,homepageBannerMessage:string,siteLogoUrl:string)=>void
}

const Admin_setting_store = create<AdminSetting & Actions>()(persist((set)=>({
    movieRecommendation:true,
    enableUserRatings:true,
    homepageBannerMessage:'',
    siteLogoUrl:'',
    setAdminSetting:(movieRecommendation,enableUserRatings,homepageBannerMessage,siteLogoUrl)=>
        set({movieRecommendation,enableUserRatings,homepageBannerMessage,siteLogoUrl})
}),{
    name:"Admin_setting_storage",
    storage:createJSONStorage(()=>localStorage)
},
))
export default Admin_setting_store