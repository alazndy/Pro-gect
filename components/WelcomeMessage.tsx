

import React, { useState, useEffect } from 'react';
// Fix: Removed .ts extension from import path.
import type { User } from '../types.ts';

const WelcomeMessage: React.FC = () => {
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        try {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                const user: User = JSON.parse(savedUser);
                setUserName(user.name);
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage for welcome message", error);
        }
    }, []);

    if (userName) {
        return (
            <p className="text-center text-gray-300 mb-8">
                Welcome back, <span className="font-semibold text-white">{userName}</span>!
            </p>
        );
    }

    return (
        <p className="text-center text-gray-400 mb-8">Devam etmek için bir kullanıcı seçin</p>
    );
};

export default WelcomeMessage;