

import React from 'react';
import type { Task } from '../types.ts';
import UserAvatar from './UserAvatar.tsx';
// Fix: Added .tsx extension to import path.
import Tag from './Tag.tsx';

interface KanbanTaskCardProps {
    task: Task;
    onOpenTaskDetail: (taskId: string) => void;
}

const KanbanTaskCard: React.FC<KanbanTaskCardProps> = ({ task, onOpenTaskDetail }) => (
    <div 
        onClick={() => onOpenTaskDetail(task.id)}
        className="bg-white/80 dark:bg-gray-800/50 p-3 rounded-lg shadow cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-blue-500 transition-all mb-3"
    >
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{task.title}</h4>
        {task.tags && task.tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
                {task.tags.map(tag => <Tag key={tag} tag={tag} />)}
            </div>
        )}
        <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">
                {task.subtasks?.length || 0} sub-tasks
            </span>
            {task.assignee && <UserAvatar user={task.assignee} size="small" />}
        </div>
    </div>
);

interface KanbanColumnProps {
    title: string;
    tasks: Task[];
    onOpenTaskDetail: (taskId: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks, onOpenTaskDetail }) => {
    return (
        <div className="bg-gray-100 dark:bg-gray-900/50 rounded-lg p-3 w-80 flex-shrink-0 flex flex-col">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4 px-1">{title} ({tasks.length})</h3>
            <div className="flex-1 overflow-y-auto pr-1">
                {tasks.map(task => (
                    <KanbanTaskCard key={task.id} task={task} onOpenTaskDetail={onOpenTaskDetail} />
                ))}
            </div>
        </div>
    );
};

interface KanbanBoardProps {
    tasks: Task[];
    onUpdateTaskStatus: (taskId: string, status: Task['status']) => void;
    onAddTask: (title: string) => void;
    onOpenTaskDetail: (taskId: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onOpenTaskDetail }) => {
    const columns: { status: Task['status']; title: string }[] = [
        { status: 'todo', title: 'Yapılacaklar' },
        { status: 'in-progress', title: 'Devam Ediyor' },
        { status: 'done', title: 'Tamamlandı' },
    ];

    const getTasksByStatus = (status: Task['status']) => tasks.filter(t => t.status === status);

    return (
        <div className="flex space-x-4 p-4 h-full">
            {columns.map(col => (
                <KanbanColumn 
                    key={col.status}
                    title={col.title}
                    tasks={getTasksByStatus(col.status)}
                    onOpenTaskDetail={onOpenTaskDetail}
                />
            ))}
        </div>
    );
};

export default KanbanBoard;