"use client"
import React ,{useEffect,useState} from 'react'
import { Switch } from "@/components/ui/switch"
import { FormLabel } from '@mui/material'
import {UserPlus} from "lucide-react"
import axios from 'axios'
import { recomendation } from '@/app/functions/recomendation'
import { adminCreation } from '@/app/functions/recomendation'
import {updateMaxAdmins}  from '@/app/functions/recomendation'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
const page = () => {
    const [settings, setsettings] = useState({
        movieRecommendation:false, //+
        autoApproveMovies:false,  
        allowNewAdminCreation:false,  //+
        maxAllowedAdmins:0,    //+
        homepageBannerMessage:"",
        enableUserRatings:false,
        allowSignups:false,
        siteLogoUrl:""
    })
    const router = useRouter()

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
            {/* General setting */}
            <div className="settings-section text-lg font-semibold bg-white p-4 rounded-md shadow-sm hover:bg-gray-50 transition">
                General Setting

            </div>
            {/* Movie Management */}
            <div className="settings-section text-lg font-semibold bg-white p-4 rounded-md shadow-sm hover:bg-gray-50 transition">
                Movie Management
                <div className="flex items-center space-x-2 mt-5">
                    <FormLabel htmlFor="airplane-mode">{settings.movieRecommendation?"Disable":"Enable"} Movie Recomendation</FormLabel>
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
                    <FormLabel htmlFor="airplane-mode">{settings.allowNewAdminCreation?"Disable":"Enable"} new admin creation</FormLabel>
                    <Switch className='ml-10' 
                    checked={settings.allowNewAdminCreation}
                    onCheckedChange={async()=>{
                        setsettings((prev)=>({
                            ...prev,
                            allowNewAdminCreation:!settings.allowNewAdminCreation
                        }))
                        await  adminCreation(settings.allowNewAdminCreation)
                    }}
                    />
                </div>
                {/* Add admin */}
                {settings.allowNewAdminCreation && <div className="flex items-center space-x-2 mt-5">
                 <FormLabel htmlFor="airplane-mode">Add admin</FormLabel>
                 <UserPlus  className='hover:cursor-pointer ml-10' onClick={()=>router.push('/sign-up?role=admin')}/>
                </div>}

                {/* MaxAllowedAdmin */}
                <div className='flex items-center space-x-2 mt-5'>
                    <FormLabel>Maximum allowed admins</FormLabel>
                    <span>{settings.maxAllowedAdmins}</span>
                    <Input 
                     className="w-[60px]"
                    type='number' 
                    min='1' 
                    max='5'
                    onChange={(e)=>{
                        setsettings((prev)=>({
                            ...prev,
                            maxAllowedAdmins:Number(e.target.value)
                        }))
                    }}
                    />
                    <Button onClick={async()=> await updateMaxAdmins(settings.maxAllowedAdmins)} variant='outline' className='hoever:bg-sky-500'>Save change</Button>
                </div>
            </div>
        </div>

    )
}

export default page
