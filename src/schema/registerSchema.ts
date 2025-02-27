
import { z } from "zod"


export const registerSchema = z.object({
    name: z.string().min(2, { message: 'Name is required' }),
    email: z.string().min(2, { message: "Email is required" }).email(),
    password: z.string().min(4, { message: "Password is required and should be minimum 4 char" }),
    image: z.instanceof(File, { message: "Image is required" }),
    role: z.string({ required_error: "Role is required" })
})


export type RegisterFormType = z.infer<typeof registerSchema>