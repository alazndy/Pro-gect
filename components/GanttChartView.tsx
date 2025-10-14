
import React from 'react';
import type { Task } from '../types.ts';
import { differenceInDays, parseISO, format, addDays } from 'date-fns';

interface GanttChartViewProps {
    tasks: Task[];
    onOpenTaskDetail: (taskId: string) => void;
}

// Fix: Define a local type that extends Task with ganttLevel for view-specific logic.
type GanttTask = Task & { ganttLevel: number };

const GanttChartView: React.FC<GanttChartViewProps> = ({ tasks, onOpenTaskDetail }) => {
    const allTasks: GanttTask[] = [];
    const flattenTasks = (taskList: Task[], level = 0) => {
        taskList.forEach(task => {
            allTasks.push({ ...task, ganttLevel: level });
            if (task.subtasks) flattenTasks(task.subtasks, level + 1);
        });
    };
    flattenTasks(tasks);

    const tasksWithDates = allTasks.filter(t => t.startDate && t.dueDate);
    if (tasksWithDates.length === 0) {
        return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Gantt Chart requires tasks with start and due dates.</div>;
    }

    const projectStartDate = tasksWithDates.reduce((earliest, task) => {
        const taskStart = parseISO(task.startDate!);
        return taskStart < earliest ? taskStart : earliest;
    }, parseISO(tasksWithDates[0].startDate!));

    const projectEndDate = tasksWithDates.reduce((latest, task) => {
        const taskEnd = parseISO(task.dueDate!);
        return taskEnd > latest ? taskEnd : latest;
    }, parseISO(tasksWithDates[0].dueDate!));
    
    const totalDays = differenceInDays(projectEndDate, projectStartDate) + 1;
    const dayWidth = 40;

    return (
        <div className="p-4 overflow-auto">
            <div className="inline-block min-w-full align-middle">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    {/* Header */}
                    <div className="grid sticky top-0 z-10" style={{ gridTemplateColumns: `250px repeat(${totalDays}, ${dayWidth}px)` }}>
                        <div className="p-2 font-semibold border-b border-r bg-gray-50 dark:bg-gray-800 dark:border-gray-700">Task Name</div>
                        {Array.from({ length: totalDays }).map((_, i) => {
                            const date = addDays(projectStartDate, i);
                            return <div key={i} className="p-2 border-b dark:border-gray-700 text-center text-xs bg-gray-50 dark:bg-gray-800">{format(date, 'd')}</div>;
                        })}
                    </div>
                    {/* Body */}
                    <div className="relative">
                        {tasksWithDates.map((task) => {
                            const startDate = parseISO(task.startDate!);
                            const endDate = parseISO(task.dueDate!);
                            const startOffset = differenceInDays(startDate, projectStartDate);
                            const duration = differenceInDays(endDate, startDate) + 1;

                            return (
                                <div key={task.id} className="grid items-center" style={{ gridTemplateColumns: `250px 1fr`, height: '40px' }}>
                                    <div 
                                        className="p-2 border-b border-r dark:border-gray-700 truncate" 
                                        style={{ paddingLeft: `${10 + (task.ganttLevel || 0) * 20}px`}}
                                        title={task.title}
                                    >
                                        <span onClick={() => onOpenTaskDetail(task.id)} className="cursor-pointer hover:underline text-sm">{task.title}</span>
                                    </div>
                                    <div className="relative border-b dark:border-gray-700 h-full" style={{ width: `${totalDays * dayWidth}px`}}>
                                        <div 
                                            style={{ left: `${startOffset * dayWidth}px`, width: `${duration * dayWidth}px`}}
                                            className="absolute top-1/2 -translate-y-1/2 h-6 bg-blue-500/70 rounded-md p-1"
                                            title={`${format(startDate, 'd MMM')} - ${format(endDate, 'd MMM')}`}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GanttChartView;