import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    // Initialize from localStorage to persist login across refreshes
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email, password) => {
        // Mock login logic
        const dummyUser = {
            id: '1',
            name: 'Rafia Niamat',
            email: email,
            role: 'Admin',
            avatar: 'https://ui-avatars.com/api/?name=Rafia+Niamat&background=random'
        };
        setUser(dummyUser);
        localStorage.setItem('user', JSON.stringify(dummyUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
