import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faSpinner } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../public/assets/logo3.png";

// TODO: replace with real auth API
const ADMIN_EMAIL = "admin@church.com";
const ADMIN_PASSWORD = "admin123";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) { setError("Please fill in all fields."); return; }

        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200));

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            sessionStorage.setItem("adminAuth", "true");
            navigate("/admin/dashboard");
        } else {
            setError("Invalid email or password. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
                {/* Brand */}
                <div className="flex flex-col items-center mb-10">
                    <a href="/"><img src={logo} alt="logo" className="w-16 mb-4 hover:opacity-80 transition" /></a>
                    <h1 className="text-white text-2xl font-bold tracking-wide">Admin Portal</h1>
                    <p className="text-blue-300 text-base mt-1">Church of Christ, Nyanya</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl px-8 py-10">
                    <h2 className="text-primary text-xl font-bold mb-1">Sign In</h2>
                    <p className="text-gray-500 text-base mb-8">Enter your admin credentials to continue.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1.5">Email Address</label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="email" placeholder="admin@church.com" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-light focus:ring-2 focus:ring-light/20 transition text-base" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1.5">Password</label>
                            <div className="relative">
                                <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="password" placeholder="••••••••" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-light focus:ring-2 focus:ring-light/20 transition text-base" />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm font-medium -mt-1">{error}</p>}

                        <div className="flex justify-end -mt-2">
                            <button type="button" className="text-light text-sm font-semibold hover:underline">
                                Forgot Password?
                            </button>
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-light transition-colors duration-200 flex items-center justify-center gap-2 text-base">
                            {loading ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Signing in…</> : "Sign In"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-blue-300 text-xs mt-6 italic">Demo: admin@church.com / admin123</p>
            </div>
        </div>
    );
};

export default AdminLogin;
