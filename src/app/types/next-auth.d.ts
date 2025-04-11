import { DefaultSession }from "next-auth"
declare module "next-auth" {
     interface User{
        _id?:string,
        eamil?:string,
        role?:string,
        username?:string
    }
     interface Session{
        user:{
            _id?:string,
            role?:string,
            username?:string
        }& DefaultSession["user"]
        
    }
}