'use client';

import { useContext, useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { AuthContext } from '@/context/AuthContext';

export default function LoginPage() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await login({email,password});
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-[#1a1a1a] p-8 rounded shadow-md text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                        loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    } transition text-white font-semibold py-2 rounded`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
