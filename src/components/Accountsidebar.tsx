"use client";
import { LogOut, User, Bookmark, Settings, UserCog } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AccountSidebar = () => {
    const { data: session } = useSession();

    return (
        <div className="w-64 bg-[#121212] text-white p-6 space-y-6 shadow-lg rounded-lg">
            {/* User Info */}
            <div className="flex items-center gap-4">
                <div>
                    <p className="text-lg font-semibold">
                        Welcome, <span className="text-green-500">{session?.user?.username}</span>
                    </p>
                    <p className="text-sm text-gray-400">Filmfusion</p>
                </div>
            </div>

            {/* Navigation (non-link options) */}
            <nav className="space-y-4 text-sm ">
                <SidebarItem icon={<User size={16} />} label="Profile" />
                <SidebarItem icon={<Bookmark size={16} />} label="Watchlist" />
                <Link href='/settings' className="mt-4"><SidebarItem icon={<Settings size={16} />} label="Settings" /></Link>
                {session?.user.role==="admin" && <Link  href="/admin" className="space-y-4">
                    <SidebarItem icon={<UserCog size={16} />} label="Admin Setting" />
                </Link>}
            </nav>

            {/* Sign Out Button */}
            <div className="pt-8 border-t border-gray-700">
                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 text-red-500 hover:text-red-400 transition"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
};

const SidebarItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <div className="flex items-center gap-3 text-white hover:text-blue-400 cursor-pointer transition">
        {icon}
        <span>{label}</span>
    </div>
);

export default AccountSidebar;
