"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { ValueContext } from "@/app/context/optionsvalueprovider";
import { gql } from "graphql-tag"
import { useQuery } from "@apollo/client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"
const options = [
    "kolkata", "mumbai", "pune", "kharagpur"
]

const GET_MOVIES = gql`
query GetMovies{
  movies{
  title
  }
}`
const Navbar = () => {
    const router = useRouter()
    const { register, handleSubmit } = useForm()
    const [inputSearch, setinputSearch] = useState<string | null>("")
    const { data: session } = useSession();
    const email = session?.user?.email;
    const { setcityValue } = useContext(ValueContext)
    const [moviesName, setMoviesName] = useState([])
    const { data } = useQuery(GET_MOVIES);
    const [filteredMovies, setfilteredMovies] = useState<string[]>([]);
    const [searchMovie, setsearchMovie] = useState<{ _id: string } | null>(null)
    useEffect(() => {
        if (data && data?.movies) {
            setMoviesName(data.movies.map((movie: { title: string }) => movie.title)); // Set movie names
        }
    }, [data]);


    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setinputSearch(value)
        if (value?.length) {
            const result = moviesName.filter((keyword, index) => {
                return keyword.toLowerCase().includes(value.toLowerCase())
            })
            setfilteredMovies(result)
        }
        console.log(filteredMovies)

    }
    const handleInput = async () => {
        try {
            const response = await axios.get(`/api/movie/search-movie?search=${inputSearch}`)
            if (response.status === 200) {
                setsearchMovie(response.data.movie)
                router.push(`/${response.data.content._id}/description`)
            }
            else {
                setsearchMovie(null);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data.error)
            }
        }


    }

    const selectInput = (movie: string) => {
        setinputSearch(movie)
        setfilteredMovies([])
    }
    return (
        <>
            <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
                {/* Left - Logo */}
                <Link href="/" className="text-2xl font-bold">
                    🎬 MovieApp
                </Link>

                {/* Middle - Search Bar */}

                <div className="flex items-center flex-row bg-gray-800 rounded-lg px-3 py-1">
                    <form className="flex flex-row gap-2" onSubmit={handleSubmit(handleInput)} >
                        <Input className="text-white"
                            placeholder="search movies..."
                            value={inputSearch}
                            {...register("search")}
                            onChange={handleOnChange}
                        />
                        <Button type="submit">Search</Button>
                    </form>
                </div>
                {filteredMovies.length > 0 && (
                    <div className="flex justify-center items-center mt-4">
                        <div className="w-fit max-w-[500px] bg-gray-100 shadow-lg rounded-lg p-4">
                            <ul className="list-disc text-center">
                                {filteredMovies.map((movie, index) => (
                                    <li key={index} className="text-lg font-semibold cursor-pointer hover:text-blue-500" onClick={() => selectInput(movie)}>{movie}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <select style={{ width: "100px", height: "30px" }} className="text-black rounded" id="ddlViewBy"
                    onChange={(e) => setcityValue(e.target.value)}>
                    <option value="" disabled>Select City</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
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

        </>
    );
};

export default Navbar;
