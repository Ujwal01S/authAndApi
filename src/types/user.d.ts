import { RegisterFormType } from "@/schema/registerSchema";

export type UserType = {
    _id: string;
    image: string | File
} & Omit<RegisterFormType, "image" | "password">