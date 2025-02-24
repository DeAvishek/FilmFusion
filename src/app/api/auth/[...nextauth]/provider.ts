import CredentialsProvider from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github"
import type { NextAuthOptions, User } from "next-auth"
import dbConnect from "@/app/lib/db";
import UserModel from "@/app/Model/user";

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
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user && user._id) {
                token._id = user._id?.toString(),
                token.email = user.email
            }
            // console.log("my token is",token) //todo to remove just for debugging
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user={
                    _id:token._id as string,
                    email:token.email as string
                }
            }
            return session
        },

    },
    pages: {
        signIn: `/sign-in`,
        signOut: '/sign-out',
    }, session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET


}
