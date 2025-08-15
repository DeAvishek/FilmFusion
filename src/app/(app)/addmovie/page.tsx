"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>("");

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            duration: "",
            language: "",
            posterUrl: "",
            trailerUrl: "",
            releaseDate: ""
        }
    });
    type MovieFormData = {
        title: string;
        duration: string;      // or `number` depending on how you want to store it
        language: string;
        posterUrl: string;
        trailerUrl?: string;   // optional
        releaseDate?: string;  // optional
      };

    const handleAddMovie = async (data:MovieFormData) => {
        console.log("Submitting data:", data);
        try {
            setIsSubmit(true);
            const response = await axios.post("/api/movie/add-movie", data);
            if (response.status === 200) {
                setResponseMessage(response.data.message);
                router.push(`/${data.title}/add-desc-client`);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponseMessage(error?.response?.data.error);
            } else {
                setResponseMessage("An error occurred during the addition of the movie");
            }
        } finally {
            setIsSubmit(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen text-black p-6">
            <div className="w-full max-w-lg p-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg">
                <h1 className="text-3xl font-extrabold text-center text-black mb-6">🎬 Add Movie</h1>

                {responseMessage && (
                    <p className="text-center text-red-500">{responseMessage}</p>
                )}

                <form onSubmit={handleSubmit(handleAddMovie)} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-black">Title</label>
                        <input
                            type="text"
                            {...register("title", { required: "Title is required" })}
                            className="w-full p-3 mt-1 border border-white/30 bg-white/20 text-black placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Enter movie title"
                        />
                        {errors.title && <p className="text-red-300 text-sm">{errors.title.message}</p>}
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-sm font-semibold text-black">Duration (minutes)</label>
                        <input
                            type="number"
                            {...register("duration", { required: "Duration is required" })}
                            className="w-full p-3 mt-1 border border-white/30 bg-white/20 text-black placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Enter duration"
                        />
                        {errors.duration && <p className="text-red-300 text-sm">{errors.duration.message}</p>}
                    </div>

                    {/* Language */}
                    <div>
                        <label className="block text-sm font-semibold text-black">Language</label>
                        <input
                            type="text"
                            {...register("language", { required: "Language is required" })}
                            className="w-full p-3 mt-1 border border-white/30 bg-white/20 text-black placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Enter language"
                        />
                        {errors.language && <p className="text-red-300 text-sm">{errors.language.message}</p>}
                    </div>

                    {/* Poster URL */}
                    <div>
                        <label className="block text-sm font-semibold text-black">Poster URL</label>
                        <input
                            type="text"
                            {...register("posterUrl", { required: "Poster URL is required" })}
                            className="w-full p-3 mt-1 border border-white/30 bg-white/20 text-black placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Enter poster URL"
                        />
                        {errors.posterUrl && <p className="text-red-300 text-sm">{errors.posterUrl.message}</p>}
                    </div>

                    {/* Trailer URL */}
                    <div>
                        <label className="block text-sm font-semibold text-black">Trailer URL</label>
                        <input
                            type="text"
                            {...register("trailerUrl")}
                            className="w-full p-3 mt-1 border border-white/30 bg-white/20 text-black placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="Enter trailer URL (optional)"
                        />
                    </div>

                    {/* Release Date */}
                    <div>
                        <label className="block text-sm font-semibold text-black">Release Date</label>
                        <input
                            type="date"
                            {...register("releaseDate")}
                            className="w-full p-3 mt-1 border border-white/30 bg-white/20 text-black placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 font-semibold text-lg text-black bg-gradient-to-r from-green-400 to-blue-500 rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
                        disabled={isSubmit}
                    >
                        {isSubmit ? "Submitting..." : "Submit 🎥"}
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Page;
