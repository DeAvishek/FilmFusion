import { z } from "zod";
export const imdbRatingValidation=z.number()
                           .min(0 ,"Rating shoud be greater started from 0")
                           .max(5 , "Rating Should't exceed 5")