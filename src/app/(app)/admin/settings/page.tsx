"use client"
import React ,{useEffect,useState} from 'react'
import { Switch } from "@/components/ui/switch"
import { FormLabel } from '@mui/material'
import {UserPlus} from "lucide-react"
import axios from 'axios'
import { recomendation } from '@/app/functions/recomendation'
const page = () => {
    const [settings, setsettings] = useState({
        movieRecommendation:false,
        autoApproveMovies:false,
        allowNewAdminCreation:false,
        maxAllowedAdmins:0,
        homepageBannerMessage:"",
        enableUserRatings:false,
        allowSignups:false,
        siteLogoUrl:""
    })
     useEffect(()=>{
        const get_settings=async()=>{
            try {
                const response = await axios.get('/api/admin/get-settings')
                if(response.status===200){
                    setsettings(response.data.settings)
                    console.log(setsettings)
                }
            } catch (error) {
                if(axios.isAxiosError(error)){
                    console.log(error.response?.data.error)
                }else{
                    console.log("internal server error")
                }
            }
        }
        get_settings()
     },[])
    return (
        <div className="settings-container p-6 bg-gray-100 rounded-xl shadow-md space-y-4">
            <div className="settings-section text-lg font-semibold bg-white p-4 rounded-md shadow-sm hover:bg-gray-50 transition">
                General Setting

            </div>
            <div className="settings-section text-lg font-semibold bg-white p-4 rounded-md shadow-sm hover:bg-gray-50 transition">
                Movie Management
                <div className="flex items-center space-x-2 mt-5">
                    <FormLabel htmlFor="airplane-mode">Enable/Disable movie recomendation</FormLabel>
                    <Switch className='ml-10'
                    checked={settings.movieRecommendation}
                    onCheckedChange={async ()=>{
                    setsettings((prev)=>({
                        ...prev,
                        movieRecommendation:!settings.movieRecommendation
                    }))
                    await recomendation(settings.movieRecommendation)}}
                    />
                </div>
                <div className="flex items-center space-x-2 mt-5"> 
                    <FormLabel htmlFor="airplane-mode">Auto approved movie</FormLabel>
                    <Switch className='ml-10'/>
                </div>
            </div>
            <div className="settings-section text-lg font-semibold bg-white p-4 rounded-md shadow-sm hover:bg-gray-50 transition ">
                Admin Setting
                <div className="flex items-center space-x-2 mt-5"> 
                    <FormLabel htmlFor="airplane-mode">Allow new admin creation</FormLabel>
                    <Switch className='ml-10'/>
                </div>

                <div className="flex items-center space-x-2 mt-5">
                 <FormLabel htmlFor="airplane-mode">Add admin</FormLabel>
                 <UserPlus  className='hover:cursor-pointer ml-10'/>
                </div>
                
            </div>
        </div>

    )
}

export default page
