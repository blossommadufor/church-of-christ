import React from "react";
import { useAuth } from "../../context/AuthContext";
import MembersDashboard from "./MembersDashboard";

const MembersDashboardWrapper = () => {
    const { member, logout } = useAuth();

    return (
        <MembersDashboard 
            member={member} 
            onSignOut={logout} 
        />
    );
};

export default MembersDashboardWrapper;
