import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminGuard = () => {
    const isAuth = sessionStorage.getItem("adminAuth") === "true";
    return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminGuard;
