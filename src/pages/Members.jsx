import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import MembersLogin from "../components/members/MembersLogin";
import MembersOtp from "../components/members/MembersOtp";
import { useAuth } from "../context/AuthContext";

const Members = () => {
    const { isAuthenticated, user } = useAuth();
    const [screen, setScreen] = useState("login");
    const [phone, setPhone] = useState("");
    const [userId, setUserId] = useState("");
    const [otpHint, setOtpHint] = useState("");

    // If fully authenticated, redirect automatically
    if (isAuthenticated) {
        if (user?.roles?.includes("ADMIN")) {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/dashboard" replace />;
    }

    const handleOtpSent = (ph, id, hint) => {
        setPhone(ph);
        setUserId(id);
        setOtpHint(hint);
        setScreen("otp");
    };

    return (
        <>
            {screen === "login" && <MembersLogin onOtpSent={handleOtpSent} />}
            {screen === "otp" && (
                <MembersOtp
                    phone={phone}
                    userId={userId}
                    hint={otpHint}
                    onBack={() => setScreen("login")}
                />
            )}
        </>
    );
};

export default Members;
