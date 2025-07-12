"use client";

import React, { useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import { AuthContext } from "@/context/AuthContext";
import Loader from "./Loader";

export default function Provider({children}) {
    const { checkingAuth, checkAuth } = useContext(AuthContext);

    useEffect(() => {
        checkAuth();
    }, [])

    return (
        <>
            {checkingAuth ? (
                <Loader/>
            ) : (
                <div className="flex">
                    <Sidebar />
                    <main className="p-8 w-full min-h-screen bg-[#121212] text-white">
                        {children}
                    </main>
                </div>
            )}
        </>
    );
}
