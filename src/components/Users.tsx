'use client'
import React from 'react'

type user_prop = {
  username: string,
  email: string
}
 
const Users = ({ username, email }: user_prop) => {
  return (
    <div className="p-6 rounded-2xl shadow-xl bg-white/10 backdrop-blur-md border border-white/20 max-w-sm mx-auto mt-10 hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-semibold text-white drop-shadow-glow mb-2">
        {username}
      </h2>
      <p className="text-lg text-blue-200 drop-shadow-glow">{email}</p>
    </div>
  )
}

export default Users
