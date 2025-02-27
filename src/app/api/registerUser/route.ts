import { UploadImage } from "@/lib/uploadFile";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { User } from "@/models/userModel";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const name = formData.get("name");
        const email = formData.get("email");
        const image = formData.get("image") as File;
        const password = formData.get("password") as string;
        const role = formData.get("role")

        if (!name || !email || !image || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const upload = await UploadImage(image, "Auth");
        const imageUrl = upload.secure_url;
        const hashedPassword = await bcrypt.hash(password, 5);

        const registerData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            role: role ? role : ""
        };

        await User.create(registerData);

        return NextResponse.json(
            { message: "User Registered Successfully", success: true, registerData },
            { status: 201 }
        );

    } catch (error) {
        console.error("Registration error:", error);
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Unexpected Error occurred" },
            { status: 500 }
        );
    }
}