
import React from 'react';
import type { Project, Task, User } from '../types.ts';
import Card from './Card.tsx';
import UserAvatar from './UserAvatar.tsx';

interface ProjectInfoCardProps {
    project: Project;
    allUsers: User[];
    onSelect: () => void;
}

const countTasksRecursively = (tasks: Task[]): { total: number; completed: number } => {
    let total = 0;
    let completed = 0;
    tasks.forEach(task => {
        total++;
        if (task.completed) completed++;
        if (task.subtasks) {
            const subCounts = countTasksRecursively(task.subtasks);
            total += subCounts.total;
            completed += subCounts.completed;
        }
    });
    return { total, completed };
};

const ProjectInfoCard: React.FC<ProjectInfoCardProps> = ({ project, allUsers, onSelect }) => {
    const { total, completed } = countTasksRecursively(project.tasks);
    const completionPercentage = total > 0 ? (completed / total) * 100 : 0;
    const members = project.memberIds.map(id => allUsers.find(u => u.id === id)).filter(Boolean) as User[];

    return (
        <Card onClick={onSelect} className="flex flex-col justify-between" glowColor="blue">
            <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">{project.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 h-10 overflow-hidden text-ellipsis">{project.description}</p>
                
                <div className="mt-4">
                    <div className="flex justify-between items-baseline mb-1">
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">İlerleme</span>
                        <span className="text-sm font-bold text-gray-800 dark:text-white">{completed}/{total}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                    </div>
                </div>
            </div>
            
            <div className="p-4 bg-gray-100/50 dark:bg-gray-800/50 rounded-b-2xl flex justify-between items-center">
                <div className="flex -space-x-2">
                    {members.slice(0, 3).map(member => (
                        <UserAvatar key={member.id} user={member} size="small" />
                    ))}
                    {members.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-bold text-gray-800 dark:text-white">
                            +{members.length - 3}
                        </div>
                    )}
                </div>
                <span className="text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full">
                    {Math.round(completionPercentage)}% Tamamlandı
                </span>
            </div>
        </Card>
    );
};

export default ProjectInfoCard;