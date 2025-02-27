"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import Link from "next/link";
import { ValueContext } from "@/app/context/optionsvalueprovider";
import {gql} from "graphql-tag"
import {useQuery} from "@apollo/client"
import { useState } from "react";

const GET_MOVIES=gql`
query GetMovies{
  movies{
  title
  }
}`
const Navbar = () => {
    const { data: session } = useSession();
    const email = session?.user?.email;
    const {setcityValue}=useContext(ValueContext) 
    const [moviesName,setMoviesName]=useState([])
    const { data } = useQuery(GET_MOVIES);
    useEffect(() => {
        setMoviesName(data.movies)
      }, [data]);
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
            {/* Left - Logo */}
            <Link href="/" className="text-2xl font-bold">
                🎬 MovieApp
            </Link>

            {/* Middle - Search Bar */}
            <div className="flex items-center bg-gray-800 rounded-lg px-3 py-1">
                <Input
                    type="text"
                    placeholder="Search movies..."
                    // value={searchTerm}
                    defaultValue="HareKrishna"
                    // onChange={handleSearch}
                    className="bg-transparent border-none focus:ring-0 text-black placeholder-gray-400 bg-white" 
                />
            </div>
            <select style={{width:"100px", height:"30px"}} defaultValue="city"className="text-black rounded"id="ddlViewBy"
            onChange={(e)=>setcityValue(e.target.value)} > 
                {moviesName.map((option,index)=>(
                    <option key={index}value={option}>{option.title}</option>
                ))}
            </select>

            {/* Right - Auth Buttons */}
            <div>
                {email ? (
                    <div className="flex items-center gap-4">
                        <span className="hidden sm:block">{email}</span>
                        <Button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600">
                            Sign Out
                        </Button>
                    </div>
                ) : (
                    <Button onClick={() => signIn()} className="bg-blue-500 hover:bg-blue-600">
                        Sign In
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
