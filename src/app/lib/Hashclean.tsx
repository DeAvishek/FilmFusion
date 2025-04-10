"use client"
import { useEffect } from 'react'
const Hashclean = () => {
  useEffect(()=>{
    if (window.location.hash === "#_=_") {
      const cleanUrl = window.location.href.replace(/#_=_/, "");
      window.history.replaceState(null, "", cleanUrl);
    }
  })
  return  null
}

export default Hashclean
