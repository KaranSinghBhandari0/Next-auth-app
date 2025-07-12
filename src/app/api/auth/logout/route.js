import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const cookieStore = await cookies();
        cookieStore.set("token", '');
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
}
