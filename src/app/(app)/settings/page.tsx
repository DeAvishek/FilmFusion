"use client"
import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import {Input} from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
const page = () => {
    const [loading, setloading] = useState(false)
    const [ifNosetting, setifNosetting] = useState("")
    const [userSettings, setuserSettings] = useState({
        username:"",
        theme:"",
        language:"",
        autoplayTrailers:false,
        ProfileStatus:"",
    })
    const [loginActivity, setloginActivity] = useState({
        date:"",
        device:"",
        browser:""
    })
    useEffect(()=>{
        const get_user_settings=async()=>{
            try {
                setloading(true)
                const response = await axios.get('/api/user/get-users-settings')
                const {loginActivity,...settingsWithoutLoginActivity } = response.data.settings
                if(response.status===200){
                    setuserSettings(settingsWithoutLoginActivity)
                    setloginActivity(loginActivity)
                }
            } catch (error) {
                if(axios.isAxiosError(error)){
                    setifNosetting(error.response?.data.error.messgae || "Internal server error..Can't get settings")
                }else{
                    setifNosetting("Internal server error..Can't get settings")
                }
            }finally{
                setloading(false)
            }
            
        }
        get_user_settings()

    },[])
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-2xl shadow-lg border bg-white space-y-6">
    <h1 className="text-2xl font-semibold">User Settings</h1>

    {ifNosetting && (
        <p className="text-red-600 text-sm">{ifNosetting}</p>
    )}

    {loading ? (
        <p>Loading settings...</p>
    ) : (
        <>
            <div className="space-y-4">
                <Input
                    type="text"
                    value={userSettings.username}
                    placeholder="Username"
                />
                <Input
                    type="text"
                    value={userSettings.theme}
                    placeholder="Theme"
                />
                <Input
                    type="text"
                    value={userSettings.language}
                    placeholder="Language"
                />
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Autoplay Trailers</label>
                    <Switch checked={userSettings.autoplayTrailers}  />
                </div>
                <Input
                    type="text"
                    value={userSettings.ProfileStatus}
                    placeholder="Profile Status"
                />
            </div>

            <div className="mt-6 border-t pt-4">
                <h2 className="text-lg font-medium mb-2">Login Activity</h2>
                <p><strong>Date:</strong> {loginActivity.date}</p>
                <p><strong>Device:</strong> {loginActivity.device}</p>
                <p><strong>Browser:</strong> {loginActivity.browser}</p>
            </div>

            <Button className="mt-4" disabled>Save Changes</Button>
        </>
    )}
</div>
  )
}

export default page
