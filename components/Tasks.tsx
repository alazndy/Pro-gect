
import React, { useState } from 'react';
// Fix: Removed .ts extension from import path.
import type { Project, User, Task } from '../types.ts';
// Fix: Added .tsx extension to import path.
import KanbanBoard from './KanbanBoard.tsx';
// Fix: Added .tsx extension to import path.
import TaskDetailModal from './TaskDetailModal.tsx';
// Fix: Added .tsx extension to import path.
import TaskListView from './TaskListView.tsx';
// Fix: Added .tsx extension to import path.
import GanttChartView from './GanttChartView.tsx';

interface TasksProps {
    project: Project;
    currentUser: User;
    onAddTask: (title: string) => void;
    onAddSubtask: (parentId: string, title: string) => void;
    onAddComment: (taskId: string, content: string) => void;
    onUpdateTask: (taskId: string, updates: Partial<Omit<Task, 'id'>>) => void;
}

const Tasks: React.FC<TasksProps> = (props) => {
    const [view, setView] = useState<'kanban' | 'list' | 'gantt'>('kanban');
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

    const findTask = (taskId: string, tasks: Task[]): Task | null => {
        for (const task of tasks) {
            if (task.id === taskId) return task;
            if (task.subtasks) {
                const found = findTask(taskId, task.subtasks);
                if (found) return found;
            }
        }
        return null;
    }
    const editingTask = editingTaskId ? findTask(editingTaskId, props.project.tasks) : null;

    const handleOpenTaskDetail = (taskId: string) => {
        setEditingTaskId(taskId);
    };

    const handleCloseTaskDetail = () => {
        setEditingTaskId(null);
    };

    const renderView = () => {
        switch (view) {
            case 'list':
                return <TaskListView 
                            tasks={props.project.tasks}
                            onOpenTaskDetail={handleOpenTaskDetail}
                            onUpdateTask={props.onUpdateTask}
                        />;
            case 'kanban':
                return <KanbanBoard 
                            tasks={props.project.tasks} 
                            onUpdateTaskStatus={(taskId, status) => props.onUpdateTask(taskId, { status })}
                            onAddTask={props.onAddTask}
                            onOpenTaskDetail={handleOpenTaskDetail}
                        />;
            case 'gantt':
                return <GanttChartView 
                            tasks={props.project.tasks}
                            onOpenTaskDetail={handleOpenTaskDetail}
                        />;
            default:
                return null;
        }
    };
    
    const ViewButton: React.FC<{ current: typeof view; name: typeof view; label: string }> = ({ current, name, label }) => (
         <button 
            onClick={() => setView(name)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                current === name 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="h-full flex flex-col space-y-4">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Görev Yönetimi</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">{props.project.name} projesinin görevleri.</p>
                </div>
                <div className="flex items-center space-x-2 p-1 bg-gray-200/50 dark:bg-gray-800/50 rounded-lg">
                    <ViewButton current={view} name="kanban" label="Kanban" />
                    <ViewButton current={view} name="list" label="Liste" />
                    <ViewButton current={view} name="gantt" label="Gantt" />
                </div>
            </header>
            <div className="flex-1 overflow-auto">
                {renderView()}
            </div>
            {editingTask && (
                <TaskDetailModal
                    task={editingTask}
                    onClose={handleCloseTaskDetail}
                    onUpdateTask={props.onUpdateTask}
                    onAddComment={props.onAddComment}
                    onAddSubtask={props.onAddSubtask}
                    projectUsers={props.project.members}
                    currentUser={props.currentUser}
                />
            )}
        </div>
    );
};

export default Tasks;