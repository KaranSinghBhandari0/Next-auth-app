import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '@/models/userModel';
import { connectDB } from '@/lib/connectDB';
import cloudinary from '@/lib/cloudConfig';
import { cookieOptions } from '@/utils/helper';

// signup
export const signup = async (req) => {
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

// login
export const login = async (req) => {
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

// logout
export const logout = async (req) => {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("token");
        return NextResponse.json(
            { message: 'Logged out successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { message: 'Failed to logout', error: error.message },
            { status: 500 }
        );
    }
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });
    res.status(200).json({ message: "logout successfull" });
}

// check Auth
export const checkAuth = async (req) => {
    try {
        const userId = req.headers.get('userId');

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (err) {
        console.error('Auth check error:', err.message);
        return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }
}

// edit profile
export const editProfile = async (req) => {
    try {
        await connectDB();

        const formData = await req.formData();

        const userId = req.headers.get('userId');
        const userName = formData.get('userName').trim();

        const user = await User.findById(userId).select("-password");;
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        if (userName == '') {
            return NextResponse.json(
                { message: "User name cannot be empty" },
                { status: 400 }
            );
        }

        const image = formData.get('image');
        if (image) {
            const buffer = Buffer.from(await image.arrayBuffer());

            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
                stream.end(buffer);
            });

            if (user.cloudinary_id) {
                await cloudinary.uploader.destroy(user.cloudinary_id);
            }

            user.imageUrl = result.secure_url;
            user.cloudinary_id = result.public_id;
        }

        user.userName = userName;
        await user.save();

        return NextResponse.json(
            { message: "Profile Updated", user },
            { status: 200 }
        );
    } catch (error) {
        console.error("PUT Error:", error);
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}