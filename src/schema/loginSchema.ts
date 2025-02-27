import { z } from "zod";


export const loginSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string({ message: "Password is required" })
})

export type LoginType = z.infer<typeof loginSchema>