import React from 'react';
import { User, Role } from '../types';
import Card from './Card';
import UserAvatar from './UserAvatar';

interface UserManagementCardProps {
    members: { [key: string]: Role };
    allUsers: User[]; // A list of all users in the system to get names and avatars
}

const UserManagementCard: React.FC<UserManagementCardProps> = ({ members, allUsers }) => {
    const getUserById = (userId: string) => allUsers.find(u => u.id === userId);

    return (
        <Card>
            <div className="p-6">
                {/* Title is now handled by the parent Dashboard component */}
                <div className="space-y-3">
                    {Object.keys(members).map(userId => {
                        const user = getUserById(userId);
                        const role = members[userId];
                        return (
                            <div key={userId} className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
                                <div className="flex items-center space-x-4">
                                    {user && <UserAvatar user={user} />}
                                    <span className="font-semibold text-gray-200">{user ? user.name : 'Unknown User'}</span>
                                </div>
                                <span className="text-sm font-medium text-blue-400 bg-blue-900/50 px-2 py-1 rounded-full">{role}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Card>
    );
};

export default UserManagementCard;