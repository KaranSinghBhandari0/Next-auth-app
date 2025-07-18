import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const protectedRoutes = ["/auth/profile", "/auth/profile/edit", "/api/auth/editProfile"];
const authPages = ["/auth/login", "/auth/signup"];

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    let user = null;

    if(token) {
        try {
            const { payload } = await jwtVerify(token, secret);
            user = payload;
        } catch (err) {
            console.error("JWT verification failed:", err.message);
        }
    }

    // 🔐 Redirect unauthenticated users from protected pages
    if (!user && protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // ⛔ Redirect authenticated users away from authPages
    if (user && authPages.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Create response and attach user in headers
    const requestHeaders = new Headers(req.headers);
    if(user) {
        requestHeaders.set("userId", user.id);
    }

    const res = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    return res;
}
