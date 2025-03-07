import { z } from "zod";

export const movieValidationSchema = z.object({
    title: z.string().min(1, "Title should have at least 1 character"),
    duration: z.string().min(1, "Duration is required"),
    language: z.string().min(1, "Language is required"),
    posterUrl: z.string().min(1, "Poster URL is required"),
    trailerUrl: z.string().min(1, "Trailer URL is required"),
    releaseDate: z.coerce.date()
});
