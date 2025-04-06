import axios from "axios"
const recomendation=async(movieRecommendation:boolean)=>{
    try {
        const response = await axios.put('/api/admin/settings-admin' ,{movieRecommendation:!movieRecommendation})

    } catch (error) {
        
    }
}