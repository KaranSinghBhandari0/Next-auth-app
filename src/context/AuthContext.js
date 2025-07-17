"use client";

import React, { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    const checkAuth = async () => {
        try {
            setCheckingAuth(true);
            const res = await axios.get('/api/auth/check');
            setUser(res.data.user);
        } catch (err) {
            console.error('Auth check failed:', err);
            setUser(null);
        } finally {
            setCheckingAuth(false);
        }
    };

    // login
    const login = async (formData) => {
        try {
            const res = await axios.post('/api/auth/login', formData);
            setUser(res.data.user);
            toast.success(res.data.message);
            router.push('/');
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Server Error");
        }
    }

    // signup
    const signup = async (formData) => {
        try {
            const res = await axios.post('/api/auth/signup', formData);
            setUser(res.data.user);
            toast.success(res.data.message);
            router.push('/');
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Server Error");
        }
    }

    // logout
    const logout = async () => {
        try {
            const res = await axios.get('/api/auth/logout');
            console.log(res.data.user);
            setUser(null);
            toast.success(res.data.message);
            router.push('/auth/login');
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Server Error");
        }
    }

    // update profile
    const updateProfile = async (formData) => {
        try {
            const res = await axios.put('/api/auth/editProfile', formData);
            setUser(res.data.user);
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Server Error");
        }
    }

    return (
        <AuthContext.Provider value={{
            login, signup, logout, checkAuth, updateProfile,
            user, checkingAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
};