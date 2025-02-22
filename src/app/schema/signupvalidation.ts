import {z} from 'zod'

export const usernameValidation=z.string()
                        .min(4,"Username minimum 4 charecter")
                        .max(10,"Username with in 10 charecters")
                        .trim()
            
const emailValidation=z.string()
                      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid email address")

                         
//SignupScheam validation
export const SignupSchemaValidation=z.object({
    username:usernameValidation,
    email:emailValidation,

})