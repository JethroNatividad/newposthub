import jsonwebtoken from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import axios from '../lib/axios'
export default async function middleware(req) {

    // get token from cookie
    const token = req.cookies.token

    // verify the token
    const jwt = token ? jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET) : null

    // allow all api requests to pass through
    const { pathname, origin } = req.nextUrl

    if (pathname === "/login" && jwt) {
        return NextResponse.redirect(origin + "/")
    }

    if (pathname.includes("api") || jwt) {
        console.log("continue")
        return NextResponse.next()
    }

    if (!jwt && pathname !== "/login") {
        console.log("NO JWT")
        return NextResponse.redirect(origin + "/login")
    }
}
