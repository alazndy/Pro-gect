

import React from 'react';
// Fix: Removed .ts extension from import path.
import type { User } from '../types.ts';
import UserAvatar from './UserAvatar.tsx';

interface HeaderProps {
    title: string;
    user: User;
}

const BellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ title, user }) => {
    return (
        <header className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">{title}</h1>
            <div className="flex items-center space-x-6">
                 <button className="relative text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition">
                    <BellIcon className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </button>
                <div className="flex items-center space-x-3">
                    <UserAvatar user={user} size="medium" />
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Proje Yöneticisi</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;