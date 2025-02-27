import { NextAuthOptions, Session } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/schema/loginSchema";
import { baseUrl } from "@/lib/api";


export const options: NextAuthOptions = {
    providers: [
        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (credentials == undefined) return null;
                try {
                    const validatedFields = loginSchema.safeParse(credentials);
                    const response = await fetch(`${baseUrl}/api/login`, {
                        method: "POST",
                        body: JSON.stringify(validatedFields?.data),
                        headers: { 'Content-Type': 'application/json' }
                    })
                    if (!response.ok) {
                        throw await response.json();
                    }
                    const data = await response.json();
                    const userData = {
                        id: data.data.id,
                        name: data.data.name,
                        email: data.data.email,
                        role: data.data.role,
                        image: data.data.image
                    }
                    // console.log("FROM JWT:", data, userData);
                    return userData;
                } catch (error) {
                    console.error("Authorization error:", error);
                    throw new Error(error.message);
                }
            },
        })
    ],
    pages: {
        signIn: "/signIn"
    },
    callbacks: {
        async jwt({ token, user }) {
            // initially token has only the default value name, sub, email, picture 
            token = { ...token, ...user }
            // after spreding user we have all above , image, role, id
            // console.log(token);
            return token
        },
        async session({ token, session }) {
            if (session.user) {
                // session contains user the jwt is 1st triggered which sets session default value and we add rest of values to session user adding session and token
                const newSession = {
                    ...session,
                    user: { ...session.user, ...token }
                }
                // console.log({ newSession });
                // This clg has all of session + image, id, role
                return newSession

            }
            // console.log({ session });
            // the above clg only has name, email, image inside user
            return session
        }
    }

}

export const getUserSession = (): Promise<Session | null> => {
    return getServerSession(options)
}