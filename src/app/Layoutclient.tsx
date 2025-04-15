"use client"
import User_Settings_Data_store from './store/usersettingsStore'
import React from 'react'

const Clientlayout = ({children}:Readonly<{children:React.ReactNode}>) => {
const theme = User_Settings_Data_store(state=>state.theme)
const themeclass = 
theme==="dark"?"bg-black text-white":theme==="light"?"bg-white text-yellow":"bg-gradient-to-r from-yellow-700 to-blue-700 text-black";
  return (
    <div className={`min-h-screen ${themeclass}`}>
      {children}
    </div>
  )
}

export default Clientlayout
