'use client';

import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function EditProfilePage() {
    const { user, updateProfile } = useContext(AuthContext);
    const router = useRouter();

    const [userName, setUserName] = useState(user?.userName || '-');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('userId', user._id);
        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        await updateProfile(formData);
        setLoading(false);
    };

    const profileImage = previewUrl || user?.imageUrl || '/no-user.png';

    return (
        <div className="max-w-lg mx-auto mt-20 bg-[#1a1a1a] p-8 rounded-lg shadow-md text-white">
            <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>

            <div className="flex flex-col items-center gap-4 mb-6">
                <Image
                    src={profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                    priority
                    height={128}
                    width={128}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="text-sm text-gray-300"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-sm text-gray-400">Username</label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-2 rounded bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter your username"
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 ${loading ? 'cursor-not-allowed' : ''} `}
            >
                {loading ? 'Saving...' : 'Save Changes'}
            </button>

            <button
                onClick={() => router.push('/auth/profile')}
                className="mt-4 text-sm text-gray-400 hover:underline text-center block w-full"
            >
                Cancel
            </button>
        </div>
    );
}
