import { z } from "zod";
const titleValidatin=z.string().min(1,"Title should have at least 1 character")
const durationValidation=z.string().min(1,"Duration is required")
const languageValidation=z.string().min(1, "Language is required")
const posterValdation=z.string().min(1, "Poster URL is required")
const trailerUrlValidation= z.string().min(1, "Trailer URL is required")
const releaseDateValidation = z.coerce.date()

export const movieValidationSchema = z.object({
    title: titleValidatin,
    duration: durationValidation,
    language: languageValidation,
    posterUrl: posterValdation,
    trailerUrl: trailerUrlValidation,
    releaseDate: releaseDateValidation
});

