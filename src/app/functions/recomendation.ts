import axios from "axios"
export const recomendation=async(movieRecommendation:boolean)=>{
    try {
        const response = await axios.patch('/api/admin/settings-admin' ,
                                        {movieRecommendation:!movieRecommendation})
        if (response.status===200){
            console.log(response.data.message)
        }
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.error)
        }else{
            console.log("internal server error")
        }
    }
}


export const adminCreation=async(allowNewAdminCreation:boolean)=>{
    try {
        await axios.patch('/api/admin/settings-admin',{allowNewAdminCreation:!allowNewAdminCreation})
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.error)
        }else{
            console.log("internal server error")
        }
    }
}

export const updateMaxAdmins=async(maxAllowedAdmins:number)=>{
    try {
        await axios.patch('/api/admin/settings-admin',{maxAllowedAdmins:maxAllowedAdmins})
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.error)
        }else{
            console.log("internal server error")
        }
    }
}