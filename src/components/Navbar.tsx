"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
    const { data: session } = useSession();
    const email = session?.user?.email;
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
            {/* Left - Logo */}
            <Link href="/" className="text-2xl font-bold">
                🎬 MovieApp
            </Link>

            {/* Middle - Search Bar */}
            <div className="flex items-center bg-gray-800 rounded-lg px-3 py-1">
                <Input
                    type="text"
                    placeholder="Search movies..."
                    // value={searchTerm}
                    defaultValue="HareKrishna"
                    // onChange={handleSearch}
                    className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-400"
                />
            </div>

            {/* Right - Auth Buttons */}
            <div>
                {email ? (
                    <div className="flex items-center gap-4">
                        <span className="hidden sm:block">{email}</span>
                        <Button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600">
                            Sign Out
                        </Button>
                    </div>
                ) : (
                    <Button onClick={() => signIn()} className="bg-blue-500 hover:bg-blue-600">
                        Sign In
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
