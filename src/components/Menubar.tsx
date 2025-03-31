"use client"
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar";
  import { useRouter } from "next/navigation";
  export function MenubarDemo() {
    const router=useRouter()
    const handle_genre_based_movie=async(genre:string)=>{
        router.push(`/${genre}/movies`)
    }
    return (
        <>
      <Menubar
        style={{
          position: "fixed",
          bottom: "0",
          left: "20%",
          transform: "translateX(-50%)",
          width: "480px",
          zIndex: 9999,
          marginBottom:"20px"
        }}
        className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-2 rounded-full shadow-2xl border border-white/30 backdrop-blur-md"
      >
        {["Drama", "Comedy", "Thriller", "Action"].map((genre, index) => (
          <MenubarMenu  key={index}>
            <MenubarTrigger onClick={()=>handle_genre_based_movie(genre)} className="text-white px-6 py-2 text-lg font-semibold cursor-pointer " >
              {genre}
            </MenubarTrigger>
          </MenubarMenu>
        ))}
      </Menubar>
      </>
    );
  }
  