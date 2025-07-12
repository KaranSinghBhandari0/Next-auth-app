'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

export default function ProfilePage() {
    const { user, logout } = useContext(AuthContext);

    if (!user) {
        return (
            <div className="text-white text-center mt-20">
                <h2 className="text-2xl">You are not logged in.</h2>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto mt-20 bg-[#1a1a1a] p-8 rounded-lg shadow-md text-white">
            <div className="flex flex-col items-center text-center gap-4">
                <FaUserCircle className="text-6xl text-gray-500" />
                <h2 className="text-2xl font-bold">{user.userName}</h2>
                <p className="text-gray-400">{user.email}</p>

                <button
                    onClick={logout}
                    className="mt-6 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded flex items-center gap-2"
                >
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </div>
    );
}
