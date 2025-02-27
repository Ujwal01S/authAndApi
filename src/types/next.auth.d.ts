import { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt";

type User = "admin" | "user"

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string
            role: UserRole;
            name: string;
            email: string;
            image?: string;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWTNew extends JWT {
        id: string;
        name: string;
        email: string;
        role: UserRole;
        image: string
    }
}
