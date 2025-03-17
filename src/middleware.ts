import { NextResponse } from "next/server";
import { NextRequest } from "next/server"
import {getToken} from "next-auth/jwt"

export {default} from "next-auth/middleware"
export async function middleware(request:NextRequest){
    const token = await getToken({req:request})
    const url = request.nextUrl
    if(token && (url.pathname.startsWith("/sign-in"))){
        return NextResponse.redirect(new URL("/",request.url))
    }
    if(token==null && (url.pathname.startsWith("/addmovie"))){
        return NextResponse.redirect(new URL("/sign-in",request.url))
    }
    return NextResponse.next()

}
 export const config={
    matcher:["/sign-in","/sign-up","/:path*"]
 }