

import React from 'react';
// Fix: Removed .ts extension from import path.
import type { User } from '../types.ts';

interface UserAvatarProps {
    user: User;
    size?: 'small' | 'medium' | 'large';
}

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

const sizeClasses = {
    small: 'w-6 h-6 text-xs',
    medium: 'w-10 h-10 text-base',
    large: 'w-12 h-12 text-lg',
};

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 'small' }) => {
    if (user.avatar) {
        return (
            <img 
                src={user.avatar} 
                alt={user.name}
                className={`rounded-full object-cover ${sizeClasses[size]}`}
            />
        );
    }
    
    // Fallback to initials
    const colorClasses = [
        'bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 
        'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'
    ];
    // Simple hash to get a consistent color for a user
    const colorIndex = user.id.charCodeAt(user.id.length - 1) % colorClasses.length;

    return (
        <div 
            className={`rounded-full flex items-center justify-center text-white font-semibold ${sizeClasses[size]} ${colorClasses[colorIndex]}`}
        >
            {getInitials(user.name)}
        </div>
    );
};

export default UserAvatar;