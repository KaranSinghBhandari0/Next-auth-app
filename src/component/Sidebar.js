"use client";

import Link from "next/link";
import { useContext } from "react";
import {
    FaHome,
    FaUser,
    FaSignInAlt,
    FaUserPlus,
    FaSignOutAlt,
} from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext";

export default function Sidebar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="h-screen w-64 bg-[#0a0a0a] text-white flex flex-col p-6 shadow-lg">
            <h1 className="text-2xl font-bold mb-8 text-white">MyApp</h1>

            <nav className="flex flex-col gap-4">
                <NavItem icon={<FaHome />} label="Home" dest="/" />
                {user ? (
                    <>
                        <NavItem icon={<FaUser />} label="Profile" dest="/auth/profile" />
                        <button
                            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-[#1a1a1a] px-4 py-2 rounded transition duration-200"
                            onClick={logout}
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavItem icon={<FaSignInAlt />} label="Login" dest="/auth/login" />
                        <NavItem icon={<FaUserPlus />} label="Signup" dest="/auth/signup" />
                    </>
                )}
            </nav>
        </div>
    );
}

function NavItem({ icon, label, dest }) {
    return (
        <Link
            href={dest}
            className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-[#1a1a1a] px-4 py-2 rounded transition duration-200"
        >
            {icon}
            <span className="font-medium">{label}</span>
        </Link>
    );
}
