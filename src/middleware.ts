import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


const isAddEventRoute = (pathname: string) => {
    return pathname === "/addEvent"
}

const redirectTo = (url: string, request: NextRequest) => {
    // console.log("REdirect:", request.url); request.url is current url
    return NextResponse.redirect(new URL(url, request.url))
}

export async function middleware(request: NextRequest) {
    const session = await getToken({ req: request })

    const { pathname } = request.nextUrl
    if (isAddEventRoute(pathname)) {
        if (session?.role === "user") {
            return redirectTo("/", request)
        }
    }
    return null
}



export const config = {
    matcher: [
        '/',
        "/register",
        "/signIn",
        "/addEvent"
    ]
}