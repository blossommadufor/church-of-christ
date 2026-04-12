import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthGuard = () => {
    const { isAuthenticated, isLoading, user } = useAuth();
    const location = useLocation();

    if (isLoading) return null;

    if (!isAuthenticated) return <Navigate to="/members" replace />;

    if (location.pathname.startsWith("/admin") && !user?.roles?.includes("ADMIN")) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default AuthGuard;
