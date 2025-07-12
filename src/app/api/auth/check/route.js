import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from '@/models/userModel';
import { connectDB } from '@/lib/connectDB';

export async function GET() {
    try {
        await connectDB();

        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 401 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (err) {
        console.error('Auth check error:', err.message);
        return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }
}
