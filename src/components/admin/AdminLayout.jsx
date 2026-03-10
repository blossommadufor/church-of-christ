import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGauge, faUsers, faSignOut, faBars, faXmark, faCalendarCheck, faComments
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../public/assets/logo3.png";

const navItems = [
    { to: "/admin/dashboard", icon: faGauge, label: "Dashboard" },
    { to: "/admin/members", icon: faUsers, label: "Members" },
    { to: "/admin/attendance", icon: faCalendarCheck, label: "Attendance" },
    { to: "/admin/questions", icon: faComments, label: "Questions" },
];

const AdminLayout = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSignOut = () => {
        sessionStorage.removeItem("adminAuth");
        navigate("/admin/login");
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Brand */}
            <div className="px-6 py-6 border-b border-white/10">
                <a href="/" className="flex items-center gap-3 hover:opacity-80 transition">
                    <img src={logo} alt="logo" className="w-10" />
                    <div>
                        <p className="text-white font-bold text-base leading-none">Admin Portal</p>
                        <p className="text-blue-300 text-xs mt-0.5">Church of Christ, Nyanya</p>
                    </div>
                </a>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${isActive
                                ? "bg-light text-white shadow-md"
                                : "text-blue-200 hover:bg-white/10 hover:text-white"
                            }`
                        }
                    >
                        <FontAwesomeIcon icon={item.icon} className="w-5" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* Sign out */}
            <div className="px-3 pb-6">
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-200 hover:bg-white/10 hover:text-white font-semibold transition text-base"
                >
                    <FontAwesomeIcon icon={faSignOut} className="w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-primary flex-shrink-0">
                <SidebarContent />
            </aside>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    <div className="w-64 bg-primary flex flex-col">
                        <div className="flex justify-end p-4">
                            <button onClick={() => setSidebarOpen(false)} className="text-white">
                                <FontAwesomeIcon icon={faXmark} className="text-xl" />
                            </button>
                        </div>
                        <SidebarContent />
                    </div>
                    <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
                </div>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar (mobile) */}
                <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shadow-sm">
                    <button onClick={() => setSidebarOpen(true)} className="text-primary">
                        <FontAwesomeIcon icon={faBars} className="text-xl" />
                    </button>
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="logo" className="w-8" />
                        <span className="text-primary font-bold text-base">Admin Portal</span>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
