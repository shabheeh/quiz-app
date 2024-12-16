
import { NextResponse } from "next/server";


export const POST = async (request: Request) => {
    const { email, password } = await request.json()

    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if(email === adminEmail && password === adminPassword) {
        return NextResponse.json({message: 'success logn'}, {status: 200})
    }

    return NextResponse.json({message: 'invalid credentials'}, {status: 401})
}