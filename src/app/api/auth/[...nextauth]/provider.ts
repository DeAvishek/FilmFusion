import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions, User } from "next-auth"
import dbConnect from "@/app/lib/db";
import UserModel from "@/app/Model/user";

//credentials
const clientID=process.env.GITHUB_CLIENT_ID!
const clientSecret=process.env.GITHUB_CLIENT_SECRET!

const google_client_id=process.env.GOOGLE_CLIENT_ID!
const google_client_secret=process.env.GOOGLE_CLIENT_SECRET!
export const AuthOptions: NextAuthOptions = {
    providers: [
      
        CredentialsProvider({
            name: 'Credentials',
            id:'credentials',
            credentials: {
                email: { label: "Email", type: "email" }
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials?.email) {
                    throw new Error("Email is required")
                }
                try {
                    await dbConnect()
                    const userDoc = await UserModel.findOne({ email: credentials.email })
                    if (!userDoc) {
                        throw new Error("User not found")
                    }
                    const user = userDoc.toObject();
                    console.log("✅ User authenticated:", user.email); //todo to temove
                    if(userDoc){
                        return user as User
                    }
                    return null
                    

                } catch (error) {
                    console.error("Authorization error:", error);
                    throw new Error("Authentication failed");
                }

            }
        }),
        GitHubProvider({
            clientId:clientID,
            clientSecret:clientSecret,
            authorization: { params: { scope: "user:email" } }
        }),
        GoogleProvider({
            clientId:google_client_id,
            clientSecret:google_client_secret
        })
        
    ],
    callbacks: {
        async jwt({ token, user,account }) {
            if(user){
                token.email=user?.email

                if(account?.provider!=="credentials"){
                    const exiting_user = await UserModel.findOne({email:user.email})
                    token._id=exiting_user?._id
                    token.role=exiting_user?.role
                    token.username=exiting_user?.username
                    
                }else{
                    token._id=user._id as string
                    token.role=user.role
                    token.username=user.username
                }
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user={
                    _id:token._id as string,
                    email:token.email as string,
                    role:token.role as string,
                    username:token.username as string
                }
            }
            return session
        },
    },
    pages: {
        signIn:'/sign-in',
        signOut: '/sign-out',
    }, session: {
        strategy: "jwt",
        maxAge:24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET


}
