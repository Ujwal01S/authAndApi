import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    try {
        await User.findByIdAndDelete(id)
        return NextResponse.json({ status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
        return NextResponse.json({ message: "Unexpected Error occred" }, { status: 500 })
    }
}