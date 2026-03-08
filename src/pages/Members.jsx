import React, { useState } from "react";
import MembersLogin from "../components/members/MembersLogin";
import MembersOtp from "../components/members/MembersOtp";
import MembersDashboard from "../components/members/MembersDashboard";

// screen: "login" | "otp" | "dashboard"
const Members = () => {
    const [screen, setScreen] = useState("login");
    const [phone, setPhone] = useState("");
    const [userId, setUserId] = useState("");
    const [otpHint, setOtpHint] = useState("");
    const [member, setMember] = useState(null);

    const handleOtpSent = (ph, id, hint) => {
        setPhone(ph);
        setUserId(id);
        setOtpHint(hint);
        setScreen("otp");
    };

    const handleVerified = (memberData) => {
        setMember(memberData);
        setScreen("dashboard");
    };

    const handleSignOut = () => {
        setMember(null);
        setPhone("");
        setUserId("");
        setScreen("login");
    };

    return (
        <>
            {screen === "login" && <MembersLogin onOtpSent={handleOtpSent} />}
            {screen === "otp" && (
                <MembersOtp
                    phone={phone}
                    userId={userId}
                    hint={otpHint}
                    onVerified={handleVerified}
                    onBack={() => setScreen("login")}
                />
            )}
            {screen === "dashboard" && member && (
                <MembersDashboard member={member} onSignOut={handleSignOut} />
            )}
        </>
    );
};

export default Members;
