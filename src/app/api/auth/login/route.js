import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import User from '@/models/userModel';
import { cookieOptions } from '@/utils/helper';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { email, password } = body;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 400 });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json({ message: "Invalid password" }, { status: 400 });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        const cookieStore = await cookies();
        cookieStore.set("token", token, cookieOptions);
        const { password: _, ...userWithoutPassword } = user._doc;

        return NextResponse.json(
            { message: "Login successful", user: userWithoutPassword },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
