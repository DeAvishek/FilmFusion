import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github"
import type { NextAuthOptions, User } from "next-auth"
import dbConnect from "@/app/lib/db";
import UserModel from "@/app/Model/user";

export const AuthOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
          }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" }
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials?.email) {
                    throw new Error("Email is required")
                }
                try {
                    await dbConnect()
                    const user = await UserModel.findOne({ email: credentials.email })
                    if (!user) {
                        throw new Error("User not found")
                    }
                    console.log("✅ User authenticated:", user.email); //todo to temove

                    return user as User

                } catch (error) {
                    console.error("Authorization error:", error);
                    throw new Error("Authentication failed");
                }

            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString()
                token.email = user.email
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id as string
                session.user.email = token.email
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
