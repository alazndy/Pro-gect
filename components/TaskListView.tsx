
import React from 'react';
import type { Task } from '../types.ts';
import UserAvatar from './UserAvatar.tsx';

interface TaskListViewProps {
    tasks: Task[];
    onOpenTaskDetail: (taskId: string) => void;
    onUpdateTask: (taskId: string, updates: Partial<Omit<Task, 'id'>>) => void;
}

const TaskRow: React.FC<{ task: Task; level: number; onOpenTaskDetail: (taskId: string) => void; onUpdateTask: (taskId: string, updates: Partial<Omit<Task, 'id'>>) => void; }> = ({ task, level, onOpenTaskDetail, onUpdateTask }) => (
    <>
        <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30">
            <td className="px-6 py-4">
                <div className="flex items-center" style={{ paddingLeft: `${level * 24}px` }}>
                    <input type="checkbox" checked={task.completed} onChange={() => onUpdateTask(task.id, { completed: !task.completed })} className="mr-3 h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700"/>
                    <span onClick={() => onOpenTaskDetail(task.id)} className={`cursor-pointer hover:underline ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                        {task.title}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 capitalize">
                    {task.status.replace('-', ' ')}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    {task.assignee ? <UserAvatar user={task.assignee} size="small" /> : <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />}
                    <span>{task.assignee?.name || 'Unassigned'}</span>
                </div>
            </td>
            <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
        </tr>
        {task.subtasks?.map(subtask => <TaskRow key={subtask.id} task={subtask} level={level + 1} onOpenTaskDetail={onOpenTaskDetail} onUpdateTask={onUpdateTask} />)}
    </>
);

const TaskListView: React.FC<TaskListViewProps> = ({ tasks, onOpenTaskDetail, onUpdateTask }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-100 dark:bg-gray-800/50 text-xs text-gray-700 dark:text-gray-400 uppercase tracking-wider">
                    <tr>
                        <th scope="col" className="px-6 py-3">Task Name</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Assignee</th>
                        <th scope="col" className="px-6 py-3">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => <TaskRow key={task.id} task={task} level={0} onOpenTaskDetail={onOpenTaskDetail} onUpdateTask={onUpdateTask} />)}
                </tbody>
            </table>
        </div>
    );
};

export default TaskListView;