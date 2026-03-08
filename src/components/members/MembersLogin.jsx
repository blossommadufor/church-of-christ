import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faIdCard, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { memberServices } from "../../services/memberServices";
import logo from "../../../public/assets/logo3.png";

const MembersLogin = ({ onOtpSent }) => {
    const [phone, setPhone] = useState("");
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!phone.trim() || !userId.trim()) {
            setError("Please fill in both fields.");
            return;
        }
        if (!/^\+?[0-9]{10,14}$/.test(phone.replace(/\s/g, ""))) {
            setError("Please enter a valid phone number.");
            return;
        }

        setLoading(true);
        try {
            // Member API requires formatting phone without spaces
            const formattedPhone = phone.replace(/\s/g, "");
            const res = await memberServices.requestOtp(formattedPhone);
            onOtpSent(formattedPhone, userId, res?.data?.OTP);
        } catch (err) {
            setError(err.message || "Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
                {/* Logo + brand */}
                <div className="flex flex-col items-center mb-10">
                    <a href="/">
                        <img src={logo} alt="Church of Christ Nyanya" className="w-16 mb-4 hover:opacity-80 transition" />
                    </a>
                    <h1 className="text-primary text-2xl font-semibold tracking-wide text-center">
                        Members Portal
                    </h1>
                    <p className="text-gray-500 text-base mt-1 text-center">
                        Church of Christ, Nyanya
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg px-8 py-10">
                    <h2 className="text-primary text-xl font-bold mb-1">Sign In</h2>
                    <p className="text-gray-500 text-base mb-8">
                        Enter your phone number and member ID to receive a one-time passcode.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1.5">
                                Phone Number
                            </label>
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="tel"
                                    placeholder="+234 800 000 0000"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-light focus:ring-2 focus:ring-light/20 transition text-base"
                                />
                            </div>
                        </div>

                        {/* User ID */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1.5">
                                Member ID
                            </label>
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faIdCard}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="text"
                                    placeholder="e.g. COC-0042"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-light focus:ring-2 focus:ring-light/20 transition text-base"
                                />
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-red-500 text-sm font-medium -mt-1">{error}</p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-light transition-colors duration-200 flex items-center justify-center gap-2 text-base mt-2"
                        >
                            {loading ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                    Sending OTP…
                                </>
                            ) : (
                                "Continue"
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-gray-400 text-sm mt-6">
                    Need help?{" "}
                    <a href="/contact" className="text-light hover:underline font-semibold">
                        Contact the church
                    </a>
                </p>
            </div>
        </div>
    );
};

export default MembersLogin;
