"use client"
import { createContext,useState} from 'react';
import React from 'react'
interface ValueContextType {
  optionsValue: string;
  setoptionsvalue: React.Dispatch<React.SetStateAction<string>>;
}

export const ValueContext=createContext(null)

const ValueSelectionProvider = ({children}: Readonly<{
  
    children: React.ReactNode;
  }>) => {
    const [cityValue,setcityValue]=useState<string |null>('')
  return (
      <ValueContext.Provider value ={{cityValue,setcityValue}} >
      {children}
      </ValueContext.Provider>
  )
}
export default ValueSelectionProvider
