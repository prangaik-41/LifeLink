import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored user on load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock Login Logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    const mockUser = { email, name: email.split('@')[0], photoURL: null };
                    setUser(mockUser);
                    localStorage.setItem('user', JSON.stringify(mockUser));
                    resolve(mockUser);
                } else {
                    reject("Invalid credentials");
                }
            }, 1000);
        });
    };

    const googleLogin = () => {
        // Mock Google Login
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    email: "user@gmail.com",
                    name: "Google User",
                    photoURL: "https://via.placeholder.com/150"
                };
                setUser(mockUser);
                localStorage.setItem('user', JSON.stringify(mockUser));
                resolve(mockUser);
            }, 1000);
        });
    };

    const signup = (email, password, name) => {
        // Mock Signup Logic
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    email,
                    name,
                    photoURL: null,
                    homeLocation: '',
                    preferences: {
                        severe: true,
                        moderate: true,
                        mild: false
                    }
                };
                setUser(mockUser);
                localStorage.setItem('user', JSON.stringify(mockUser));
                resolve(mockUser);
            }, 1000);
        });
    };

    const updateProfile = (updates) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const updatedUser = { ...user, ...updates };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                resolve(updatedUser);
            }, 500);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, googleLogin, signup, logout, loading, updateProfile }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
