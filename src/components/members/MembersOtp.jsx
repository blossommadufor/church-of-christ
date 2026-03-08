import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { memberServices } from "../../services/memberServices";
import logo from "../../../public/assets/logo3.png";

const OTP_LENGTH = 4;
const RESEND_SECONDS = 60;
// Simulated OTP — replace with real SMS validation
const SIMULATED_OTP = "1234";

const MembersOtp = ({ phone, userId, onVerified, onBack }) => {
    const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(RESEND_SECONDS);
    const [resending, setResending] = useState(false);
    const inputs = useRef([]);

    useEffect(() => {
        if (countdown <= 0) return;
        const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
        return () => clearTimeout(t);
    }, [countdown]);

    const handleDigit = (val, idx) => {
        if (!/^\d?$/.test(val)) return;
        const next = [...digits];
        next[idx] = val;
        setDigits(next);
        setError("");
        if (val && idx < OTP_LENGTH - 1) inputs.current[idx + 1]?.focus();
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !digits[idx] && idx > 0) {
            inputs.current[idx - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
        if (pasted.length === OTP_LENGTH) {
            setDigits(pasted.split(""));
            inputs.current[OTP_LENGTH - 1]?.focus();
        }
        e.preventDefault();
    };

    const handleVerify = async () => {
        const otp = digits.join("");
        if (otp.length < OTP_LENGTH) {
            setError("Please enter the complete OTP.");
            return;
        }
        setLoading(true);
        try {
            const response = await memberServices.login(otp);
            // Simulate fetching additional member data per UI requirement
            // In a real scenario, this data comes from `response`
            onVerified({
                name: response.firstName || "Member",
                userId,
                phone,
                attended: response.attendance?.length || 0,
                missed: 0,
                lastAttendance: null,
            });
        } catch (err) {
            setError(err.message || "Incorrect OTP. Please try again.");
        } finally {
            setLoading(false);
        }
        // Simulate fetching member data
        onVerified({
            name: "Member",
            userId,
            phone,
            attended: 14,
            missed: 3,
            lastAttendance: null,
        });
    };

    const handleResend = async () => {
        setResending(true);
        setError("");
        setDigits(Array(OTP_LENGTH).fill(""));

        try {
            await memberServices.requestOtp(phone);
            setCountdown(RESEND_SECONDS);
        } catch (err) {
            setError("Failed to resend OTP.");
        } finally {
            setResending(false);
        }
    };

    const maskedPhone = phone.replace(/(\d{3})\d+(\d{3})/, "$1****$2");

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex flex-col items-center mb-10">
                    <img src={logo} alt="Church of Christ Nyanya" className="w-16 mb-4" />
                    <h1 className="text-primary text-2xl font-semibold tracking-wide">Members Portal</h1>
                    <p className="text-gray-500 text-base mt-1">Church of Christ, Nyanya</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg px-8 py-10">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-400 hover:text-primary text-sm font-semibold mb-6 transition"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>

                    <h2 className="text-primary text-xl font-bold mb-1">Verify OTP</h2>
                    <p className="text-gray-500 text-base mb-8">
                        We sent a {OTP_LENGTH}-digit code to{" "}
                        <span className="font-semibold text-primary">{maskedPhone}</span>. Enter it below.
                    </p>

                    {/* OTP boxes */}
                    <div className="flex gap-3 justify-center mb-6" onPaste={handlePaste}>
                        {digits.map((d, i) => (
                            <input
                                key={i}
                                ref={(el) => (inputs.current[i] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={d}
                                onChange={(e) => handleDigit(e.target.value, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                className={`w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl outline-none transition ${d
                                    ? "border-light text-primary"
                                    : "border-gray-200 text-gray-400"
                                    } focus:border-light focus:ring-2 focus:ring-light/20`}
                            />
                        ))}
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-red-500 text-sm font-medium text-center mb-4">{error}</p>
                    )}

                    {/* Verify button */}
                    <button
                        onClick={handleVerify}
                        disabled={loading}
                        className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-light transition-colors duration-200 flex items-center justify-center gap-2 text-base mb-5"
                    >
                        {loading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                Verifying…
                            </>
                        ) : (
                            "Verify & Sign In"
                        )}
                    </button>

                    {/* Resend */}
                    <div className="text-center text-base text-gray-500">
                        {countdown > 0 ? (
                            <span>
                                Resend OTP in{" "}
                                <span className="font-bold text-primary">{countdown}s</span>
                            </span>
                        ) : (
                            <button
                                onClick={handleResend}
                                disabled={resending}
                                className="text-light font-semibold hover:underline transition"
                            >
                                {resending ? "Resending…" : "Resend OTP"}
                            </button>
                        )}
                    </div>
                </div>

                {/* Hint for dev */}
                <p className="text-center text-gray-400 text-xs mt-4 italic">
                    Demo OTP: <span className="font-bold">1234</span>
                </p>
            </div>
        </div>
    );
};

export default MembersOtp;
