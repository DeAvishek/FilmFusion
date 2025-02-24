import {z} from "zod"
const emailValidation=z.string()
                      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid email address")

export const signInValidationScheam=z.object({
    email:emailValidation
})