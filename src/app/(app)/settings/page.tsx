"use client"
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {Edit} from "lucide-react"
import User_Settings_Data_store from '@/app/store/usersettingsStore'

const Page = () => {
    const [enableupdateUsername, setenableupdateUsername] = useState<boolean>(false)
    const [updatedUsername, setupdatedUsername] = useState("")
    const [loading, setloading] = useState(false)
    const [ifNosetting, setifNosetting] = useState("")
    const [userSettings, setuserSettings] = useState({
        username: "",
        theme: "",
        language: "",
        autoplayTrailers: false,
        ProfileStatus: "",
    })
    const [loginActivity, setloginActivity] = useState({
        date: "",
        device: "",
        browser: ""
    })

    const set_user_settings_to_store = User_Settings_Data_store(state=>state.setUserSettings)
    const get_user_settings = async () => {
        try {
            setloading(true)
            const response = await axios.get('/api/user/get-users-settings')
            const { loginActivity, ...settingsWithoutLoginActivity } = response.data.settings
            if (response.status === 200) {
                setuserSettings(settingsWithoutLoginActivity)
                setloginActivity(loginActivity)
                set_user_settings_to_store(
                    settingsWithoutLoginActivity.username,
                    settingsWithoutLoginActivity.theme,
                    settingsWithoutLoginActivity.language,
                    settingsWithoutLoginActivity.autoplayTrailers,
                    settingsWithoutLoginActivity.ProfileStatus
                )
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setifNosetting(error.response?.data.error.messgae || "Internal server error..Can't get settings")
            } else {
                setifNosetting("Internal server error..Can't get settings")
            }
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        get_user_settings()
    }, [])
    const update_username=async(newUsername:string)=>{
        try {
             await axios.patch('/api/user/update-user-name',{username:newUsername})
             await get_user_settings()
            
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.log(error.response?.data.error.message || "Internal server error..during update username")
            }else{
                console.log("Internal server error..during update username")
            }
        }finally{
            setenableupdateUsername(false)
        }
    }
    return (
        <div className="max-w-xl mx-auto mt-10 p-8 rounded-3xl shadow-2xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-white space-y-8 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">✨ User Settings</h1>

            {ifNosetting && (
                <p className="text-red-600 text-sm italic">{ifNosetting}</p>
            )}

            {loading ? (
                <p className="text-gray-600 animate-pulse">Loading settings...</p>
            ) : (
                <>
                    <div className="space-y-6">
                        <div className='flex flex-row'>
                        <Input
                            type="text"
                            defaultValue={userSettings.username}
                            onChange={(e) => setupdatedUsername(e.target.value)}
                            placeholder="Username"
                            className="border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm"
                            disabled={!enableupdateUsername}
                        />
                        <Edit className='mt-1 hover:cursor-pointer' onClick={()=>setenableupdateUsername(true)}/>
                        </div>

                         {enableupdateUsername && <Button onClick={()=>update_username(updatedUsername)}>Save change</Button>}
                        {/* Theme */}
                        <h2 className="text-lg font-semibold text-gray-700">🎨 Theme</h2>
                        <RadioGroup className="space-y-2" value={userSettings.theme}
                            onValueChange={async (value) => {
                                setuserSettings((prev) => ({
                                    ...prev,
                                    theme: value
                                }))
                                await axios.patch('/api/user/update-user-settings', { theme: value })
                                await get_user_settings()
                            }}
                        >
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="system" id="option-one" />
                                <Label htmlFor="option-one" className="text-gray-600">System</Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="light" id="option-two" />
                                <Label htmlFor="option-two" className="text-gray-600">Light</Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="dark" id="option-three" />
                                <Label htmlFor="option-three" className="text-gray-600">Dark</Label>
                            </div>
                        </RadioGroup>

                        {/* Profile Status */}
                        <h2 className="text-lg font-semibold text-gray-700">🔒 Profile</h2>
                        <RadioGroup className="space-y-2" value={userSettings.ProfileStatus}
                            onValueChange={async(value) => {
                                setuserSettings((prev) => ({
                                    ...prev,
                                    ProfileStatus: value
                                }))
                                await axios.patch('/api/user/update-user-settings',{ProfileStatus:value})
                                await get_user_settings()

                            }}
                        >
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="private" id="profile-private" />
                                <Label htmlFor="profile-private" className="text-gray-600">Private</Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="public" id="profile-public" />
                                <Label htmlFor="profile-public" className="text-gray-600">Public</Label>
                            </div>
                        </RadioGroup>

                        {/* Switch */}
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <label className="text-sm font-medium text-gray-700">Autoplay Trailers</label>
                            <Switch
                                checked={userSettings.autoplayTrailers}
                                onCheckedChange={async () => {
                                    setuserSettings((prev) => ({
                                        ...prev,
                                        autoplayTrailers: !userSettings.autoplayTrailers
                                    }))
                                    await axios.patch('/api/user/update-user-settings',{autoplayTrailers:!userSettings.autoplayTrailers})
                                    await get_user_settings()
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-8 border-t pt-6 text-blue-500 bg-bule-700">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">🕵️‍♂️ Login Activity</h2>
                        <p className="text-sm text-gray-600"><strong>Date:</strong> {loginActivity.date}</p>
                        <p className="text-sm text-gray-600"><strong>Device:</strong> {loginActivity.device}</p>
                        <p className="text-sm text-gray-600"><strong>Browser:</strong> {loginActivity.browser}</p>
                    </div>
                    <div>
                        <Button variant='destructive'>Delete Acoount</Button>
                    </div>
                </>
            )}
        </div>

    )
}

export default Page
