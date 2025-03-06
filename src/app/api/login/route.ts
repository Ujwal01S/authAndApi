import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email, password: inputPassword } = await req.json();
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(inputPassword, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid credentials password" },
                { status: 401 }
            );
        }

        const userWithoutPassword = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image
        };
        return NextResponse.json({ success: true, data: userWithoutPassword }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
        return NextResponse.json({ message: "Unexpected Error occured" }, { status: 500 })
    }
}

export async function GET() {
    try {
        const users = await User.find()
        if (!users) {
            return NextResponse.json({ message: "No Users Yet!" }, { status: 201 });
        }
        return NextResponse.json({ message: "Successfull", users }, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
        return NextResponse.json({ message: "Unexpected Error occred" }, { status: 500 })
    }
}