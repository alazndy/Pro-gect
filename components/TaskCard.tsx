
// components/TaskCard.tsx

import React, { useMemo } from 'react';
// Fix: Removed .ts extension from import path.
import type { Task } from '../types.ts';
import Card from './Card.tsx';
import { formatDistanceToNow, isWithinInterval, addDays } from 'date-fns';
import { tr } from 'date-fns/locale';

interface TaskCardProps {
  tasks: Task[];
}

const countTasksRecursively = (tasks: Task[]): { total: number; completed: number } => {
    let total = 0;
    let completed = 0;

    const count = (taskItems: Task[]) => {
        taskItems.forEach(t => {
            total++;
            if (t.completed) completed++;
            if (t.subtasks) count(t.subtasks);
        });
    };
    
    count(tasks);
    return { total, completed };
};

const TaskCard: React.FC<TaskCardProps> = ({ tasks }) => {
    const { total, completed } = useMemo(() => countTasksRecursively(tasks), [tasks]);
    const completionPercentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Görevler</h2>
            <span className="text-sm font-semibold text-blue-500 group-hover:text-blue-400">Tümünü Görüntüle →</span>
        </div>
        
        <div className="space-y-4">
            <div>
                <div className="flex justify-between items-baseline mb-1">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">İlerleme</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{completed} / {total}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                </div>
                <div className="flex justify-between text-sm mt-1 text-gray-500 dark:text-gray-400">
                    <span>{Math.round(completionPercentage)}% tamamlandı</span>
                </div>
            </div>
            
            <div className="pt-2">
                <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">Sıradaki Görevler</h3>
                <ul className="space-y-2">
                    {tasks.filter(t => !t.completed).slice(0, 3).map(task => {
                        const dueDate = task.dueDate ? new Date(task.dueDate) : null;
                        let dueDateInfo = null;
                        if (dueDate) {
                            const now = new Date();
                            const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                            const isOverdue = dueDate < startOfToday;
                            const isSoon = !isOverdue && isWithinInterval(dueDate, { start: now, end: addDays(now, 3) });
                            const textColor = isOverdue ? 'text-red-500' : isSoon ? 'text-yellow-500' : 'text-gray-500 dark:text-gray-400';
                            
                            dueDateInfo = (
                                <span className={`text-xs font-semibold ${textColor}`}>
                                    {formatDistanceToNow(dueDate, { addSuffix: true, locale: tr })}
                                </span>
                            );
                        }

                        return (
                            <li key={task.id} className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 p-2 rounded-md flex justify-between items-center">
                                <span className="truncate pr-2">{task.title}</span>
                                {dueDateInfo}
                            </li>
                        );
                    })}
                    {tasks.filter(t => !t.completed).length === 0 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic">Tüm görevler tamamlandı!</p>
                    )}
                </ul>
            </div>
        </div>

      </div>
    </Card>
  );
};

export default TaskCard;