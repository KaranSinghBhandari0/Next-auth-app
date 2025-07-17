'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';

export default function ProfilePage() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="max-w-lg mx-auto mt-20 bg-[#1a1a1a] p-8 rounded-lg shadow-md text-white">
            <div className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                    <Image
                        src={user?.imageUrl || '/no-user.png'}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                        priority
                        height={128}
                        width={128}
                    />
                </div>

                <h2 className="text-2xl font-bold">{user?.userName}</h2>
                <p className="text-gray-400">{user?.email}</p>

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
