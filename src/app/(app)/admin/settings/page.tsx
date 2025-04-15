"use client"
import React, { useEffect, useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { FormLabel } from '@mui/material'
import { UserPlus } from "lucide-react"
import axios from 'axios'
import { recomendation } from '@/app/functions/recomendation'
import { adminCreation } from '@/app/functions/recomendation'
import { updateMaxAdmins } from '@/app/functions/recomendation'
import { updateUserRaringStatus } from '@/app/functions/recomendation'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { updateCreateAccountStatus } from "@/app/functions/recomendation"
import Admin_setting_store from '@/app/store/admin_settings_Store'
import { FolderEdit } from "lucide-react"
const page = () => {
    const [settings, setsettings] = useState({
        movieRecommendation: false, //+
        autoApproveMovies: false,
        allowNewAdminCreation: false,  //+
        maxAllowedAdmins: 0,    //+
        homepageBannerMessage: "",
        enableUserRatings: false, //+
        allowSignups: true,  // +
        siteLogoUrl: ""  //+
    })
    const router = useRouter()
    const set_admin_setting = Admin_setting_store(state => state.setAdminSetting)
    const [afterUpdate, setafterUpdate] = useState<boolean>(false)

    useEffect(() => {
        const get_settings = async () => {
            try {
                const response = await axios.get('/api/admin/get-settings')
                if (response.status === 200) {
                    setsettings(response.data.settings)
                    set_admin_setting(response.data.settings.movieRecommendation,
                        response.data.settings.enableUserRatings,
                        response.data.settings.homepageBannerMessage,
                        response.data.settings.siteLogoUrl)
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error.response?.data.error)
                } else {
                    console.log("internal server error")
                }
            }
        }
        get_settings()
    }, [afterUpdate])
    return (
        <div className="settings-container p-6 bg-gray-100 rounded-2xl shadow-lg space-y-6 max-w-4xl mx-auto mt-10">
            {/* General setting */}
            <div className="settings-section text-xl font-bold bg-white text-black p-5 rounded-xl shadow transition hover:bg-gray-50 border border-gray-200">
                General Settings
                <div className="flex items-center justify-between mt-5">
                    <FormLabel htmlFor="auto-approved" className="text-base font-medium">
                        {settings.allowSignups ? "Disable" : "Enable"} Create New Accounts
                    </FormLabel>
                    <Switch id="auto-approved"
                        checked={settings.allowSignups}
                        className={settings.allowSignups
                            ? "ml-10 data-[state=checked]:bg-blue-600"
                            : "ml-10 data-[state=unchecked]:bg-red-600"}
                        onCheckedChange={async () => {
                            setsettings((prev) => ({
                                ...prev,
                                allowSignups: !settings.allowSignups
                            }))
                            await updateCreateAccountStatus(settings.allowSignups)
                            setafterUpdate(prev=>!prev)
                        }}
                    />
                </div>
                <div className="text-xl font-bold  p-5 rounded-xl  ">
                    <FormLabel htmlFor="auto-approved" className="text-base font-medium">Site logo URL</FormLabel>
                    <div className='flex gap-2'>
                        <Input
                            defaultValue={settings.siteLogoUrl || "not available"}
                            type='text'
                            className='border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm'
                        />
                        <FolderEdit className='mt-1 hover:cursor-pointer'/>
                    </div>
                </div>
            </div>

            {/* Movie Management */}
            <div className="settings-section text-xl font-bold bg-white text-black p-5 rounded-xl shadow transition hover:bg-gray-50 border border-gray-200">
                Movie Management
                <div className="flex items-center justify-between mt-5">
                    <FormLabel htmlFor="movie-recommendation" className="text-base font-medium">
                        {settings.movieRecommendation ? "Disable" : "Enable"} Movie Recommendation
                    </FormLabel>
                    <Switch
                        id="movie-recommendation"
                        className={settings.movieRecommendation
                            ? "ml-10 data-[state=checked]:bg-blue-600"
                            : "ml-10 data-[state=unchecked]:bg-red-600"}
                        checked={settings.movieRecommendation}
                        onCheckedChange={async () => {
                            setsettings((prev) => ({
                                ...prev,
                                movieRecommendation: !settings.movieRecommendation,
                            }));
                            await recomendation(settings.movieRecommendation);
                            setafterUpdate(prev=>!prev)
                        }}
                    />
                </div>

                <div className="flex items-center justify-between mt-5">
                    <FormLabel htmlFor="auto-approved" className="text-base font-medium">Auto Approve Movie</FormLabel>
                    <Switch id="auto-approved" className="ml-10" />
                </div>

                <div className="flex items-center justify-between mt-5">
                    <FormLabel htmlFor="user-rating" className="text-base font-medium">
                        {settings.enableUserRatings ? "Disable" : "Enable"} User Ratings
                    </FormLabel>
                    <Switch
                        id="user-rating"
                        className={settings.enableUserRatings
                            ? "ml-10 data-[state=checked]:bg-blue-600"
                            : "ml-10 data-[state=unchecked]:bg-red-600"}
                        checked={settings.enableUserRatings}
                        onCheckedChange={async () => {
                            setsettings((prev) => ({
                                ...prev,
                                enableUserRatings: !settings.enableUserRatings,
                            }));
                            await updateUserRaringStatus(settings.enableUserRatings);
                            setafterUpdate(prev=>!prev)
                        }}
                    />
                </div>
            </div>

            {/* Admin Setting */}
            <div className="settings-section text-xl text-black font-bold bg-white p-5 rounded-xl shadow transition hover:bg-gray-50 border border-gray-200">
                Admin Settings

                <div className="flex items-center justify-between mt-5">
                    <FormLabel htmlFor="admin-creation" className="text-base font-medium">
                        {settings.allowNewAdminCreation ? "Disable" : "Enable"} New Admin Creation
                    </FormLabel>
                    <Switch
                        id="admin-creation"
                        className={settings.allowNewAdminCreation
                            ? "ml-10 data-[state=checked]:bg-blue-600"
                            : "ml-10 data-[state=unchecked]:bg-red-600"}
                        checked={settings.allowNewAdminCreation}
                        onCheckedChange={async () => {
                            setsettings((prev) => ({
                                ...prev,
                                allowNewAdminCreation: !settings.allowNewAdminCreation,
                            }));
                            await adminCreation(settings.allowNewAdminCreation);
                            setafterUpdate(prev=>!prev)
                        }}
                    />
                </div>

                {settings.allowNewAdminCreation && (
                    <div className="flex items-center justify-between mt-5">
                        <FormLabel className="text-base font-medium">Add Admin</FormLabel>
                        <UserPlus
                            className="ml-10 hover:cursor-pointer text-blue-600 hover:text-blue-800 transition"
                            onClick={() => router.push('/sign-up?role=admin')}
                        />
                    </div>
                )}

                <div className="flex items-center justify-between mt-5 gap-4">
                    <FormLabel className="text-base font-medium">Maximum Allowed Admins</FormLabel>
                    <span className="font-semibold">{settings.maxAllowedAdmins}</span>
                    <Input
                        className="w-[80px] border-gray-300"
                        type="number"
                        min="1"
                        max="5"
                        onChange={(e) => {
                            setsettings((prev) => ({
                                ...prev,
                                maxAllowedAdmins: Number(e.target.value),
                            }));
                        }}
                    />
                    <Button
                        onClick={async () => {
                            await updateMaxAdmins(settings.maxAllowedAdmins)
                            setafterUpdate(prev=>!prev)}
                        }
                        variant="outline"
                        className="hover:bg-sky-500 transition"
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>


    )
}

export default page
