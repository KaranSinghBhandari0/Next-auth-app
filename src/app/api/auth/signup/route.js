import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import User from '@/models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { cookieOptions } from '@/utils/helper';

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { userName, email, password } = body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword,
        });

        // Create JWT
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set("token", token, cookieOptions);

        // Exclude password from response
        const { password: _, ...userWithoutPassword } = newUser._doc;

        return NextResponse.json(
            { message: 'Signup successful', user: userWithoutPassword, },
            { status: 200 }
        );
    } catch (error) {
        console.error('Signup Error:', error);
        return NextResponse.json(
            { message: 'Server error', error: error.message },
            { status: 500 }
        );
    }
}
