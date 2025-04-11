// components/AccountSidebar.tsx
"use client";
import { LogOut, User, Bookmark, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

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
                    <p className="text-sm text-gray-400">Film Fusion</p>
                </div>
            </div>

            {/* Navigation (non-link options) */}
            <nav className="space-y-4 text-sm">
                <SidebarItem icon={<User size={16} />} label="Profile" />
                <SidebarItem icon={<Bookmark size={16} />} label="Watchlist" />
                <SidebarItem icon={<Settings size={16} />} label="Settings" />
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
