import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminServices } from '../services/adminServices';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [member, setMember] = useState(null);
    const [token, setToken] = useState(null);
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initialize from localStorage
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        const storedMember = localStorage.getItem('member');
        
        if (storedToken && storedUser && storedMember) {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                setMember(JSON.parse(storedMember));
            } catch (e) {
                console.error("Failed to parse auth data from localStorage", e);
            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const fetchAllMembers = async () => {
            if (user && (user?.roles?.includes('ADMIN') || user?.permissions?.includes('DO_ALL'))) {
                try {
                    const res = await adminServices.getAllMembers();
                    // Assuming res.data.users contains the actual members list based on AdminMembers schema
                    const items = res?.data?.users || res?.data?.data || res?.data?.members || res?.data || res;
                    setMembers(Array.isArray(items) ? items : []);
                } catch (err) {
                    console.error("Failed to fetch global members", err);
                }
            }
        };
        fetchAllMembers();
    }, [user, token]);

    const login = (loginData) => {
        // Expected loginData format: { token: '...', user: {...}, member: {...} }
        setToken(loginData.token);
        setUser(loginData.user);
        setMember(loginData.member);
        
        localStorage.setItem('token', loginData.token);
        localStorage.setItem('user', JSON.stringify(loginData.user));
        localStorage.setItem('member', JSON.stringify(loginData.member));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setMember(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('member');
    };

    return (
        <AuthContext.Provider value={{
            user,
            member,
            members,
            token,
            login,
            logout,
            isLoading,
            isAuthenticated: !!token
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
