'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

export default function SignupPage() {
    const { signup } = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await signup({ userName, email, password });
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-[#1a1a1a] p-8 rounded shadow-md text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-center bg-[#0a0a0a] border border-gray-700 rounded px-3 py-2">
                    <FaUser className="text-gray-400 mr-3" />
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                        required
                    />
                </div>

                <div className="flex items-center bg-[#0a0a0a] border border-gray-700 rounded px-3 py-2">
                    <FaEnvelope className="text-gray-400 mr-3" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                        required
                    />
                </div>

                <div className="flex items-center bg-[#0a0a0a] border border-gray-700 rounded px-3 py-2">
                    <FaLock className="text-gray-400 mr-3" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`${
                        loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    } transition text-white font-semibold py-2 rounded`}
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Creating...
                        </div>
                    ) : (
                        'Create Account'
                    )}
                </button>
            </form>
        </div>
    );
}
