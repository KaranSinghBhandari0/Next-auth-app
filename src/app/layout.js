import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import Provider from "@/component/Provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Next.js Auth App",
    description: "AUthentication system to understand Next.js",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`} 
            suppressHydrationWarning={true}>
                <AuthProvider>
                    <Provider>
                        {children}
                    </Provider>
                    <Toaster />
                </AuthProvider>
            </body>
        </html>
    );
}
