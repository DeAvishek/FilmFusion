"use client"
import React from 'react'
import { Switch } from "@/components/ui/switch"
import { FormLabel } from '@mui/material'
import {ArrowBigDownDashIcon} from "lucide-react"
const page = () => {
    return (
        <div className="settings-container p-6 bg-gray-100 rounded-xl shadow-md space-y-4">
            <div className="settings-section text-lg font-semibold bg-white p-4 rounded-md shadow-sm hover:bg-gray-50 transition">
                General Setting

            </div>
            <div className="settings-section text-lg font-semibold bg-white p-4 rounded-md shadow-sm hover:bg-gray-50 transition">
                Movie Management
                <div className="flex items-center space-x-2 mt-5">
                    <FormLabel htmlFor="airplane-mode">Enable/Disable movie recomendation</FormLabel>
                    <Switch className='ml-10'/>
                </div>
                <div className="flex items-center space-x-2 mt-5"> 
                    <FormLabel htmlFor="airplane-mode">Auto approved movie</FormLabel>
                    <Switch className='ml-10'/>
                </div>
            </div>
            <div className="settings-section text-lg font-semibold bg-white p-4 rounded-md shadow-sm hover:bg-gray-50 transition ">
                Admin Setting
                <div className="flex items-center space-x-2 mt-5">
                 <FormLabel htmlFor="airplane-mode">Add admin</FormLabel>
                 <ArrowBigDownDashIcon/>
                 
                </div>
            </div>
        </div>

    )
}

export default page
