"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { gql } from "graphql-tag";
import { useQuery } from "@apollo/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Toastalert from "./Toastalert";
import {Move3DIcon,UserCog} from "lucide-react"

const GET_MOVIES = gql`
query GetMovies{
  movies{
  title
  }
}`;

const Navbar = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const [inputSearch, setinputSearch] = useState<string | null>("");
    const { data: session } = useSession();
    const email = session?.user?.email;
    const [moviesName, setMoviesName] = useState<string[]>([]);
    const [filteredMovies, setfilteredMovies] = useState<string[]>([]);
    const [isSignout, setisSignout] = useState<boolean>(false);
    const { data } = useQuery(GET_MOVIES);

    useEffect(() => {
        if (data && data?.movies) {
            setMoviesName(data.movies.map((movie: { title: string }) => movie.title));
        }
    }, [data]);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setinputSearch(value);
        if (value?.length) {
            const result = moviesName.filter((keyword) =>
                (keyword as string).toLowerCase().includes(value.toLowerCase())
            );
            setfilteredMovies(result);
        } else {
            setfilteredMovies([]);
        }
    };

    const handleInput = async () => {
        try {
            
            const response = await axios.get(`/api/movie/search-movie?search=${inputSearch}`);
            if (response.status === 200) {
                router.push(`/${response.data.content._id}/description`);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data.error);
            }
        }
    };

    const selectInput = (movie: string) => {
        setinputSearch(movie);
        setfilteredMovies([]);
    };

    const handlSignout = () => {
        signOut();
        setisSignout(true);
    };

    return (
        <>
            <nav className="flex items-center justify-between px-6 py-4 bg-gray-300 text-black relative">
                {!email && <Toastalert alert_message="Sign out Successfully" />}
                <Link href="/" className="text-2xl font-bold">🎬 FilmFusion</Link>
                <div className="flex items-center flex-row rounded-lg px-3 py-1 relative w-full max-w-md">
                    <form className="flex flex-row gap-2 w-full" onSubmit={handleSubmit(handleInput)}>
                        <Input className="text-black w-full" placeholder="Search movies..." {...register("search")} value={inputSearch!} onChange={handleOnChange} />
                        <Button type="submit">Search</Button>
                    </form>
                    {filteredMovies.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-gray-100 shadow-lg rounded-lg p-4 mt-1 max-h-60 overflow-y-auto z-10">
                            <ul>
                                {filteredMovies.map((movie, index) => (
                                    <li key={index} className="text-lg font-semibold cursor-pointer hover:text-blue-500" onClick={() => selectInput(movie)}>{movie}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {session?.user?.role === "admin" && (<Button className="bg-yellow-500 w-20 h-10"><Link href="/admin">< UserCog onClick={() => router.push("/admin")} size={40}/> </Link></Button>)}
                <div>
                    {session?.user ? (
                        <div className="flex items-center gap-4">
                            <Button onClick={handlSignout} className="bg-red-500 hover:bg-red-600">Sign Out</Button>
                        </div>
                    ) : (
                        <Button onClick={() => signIn()} className="bg-blue-500 hover:bg-blue-600">Sign In</Button>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
