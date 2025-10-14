
import React, { useState } from 'react';
import type { Task, User } from '../types.ts';
import Card from './Card.tsx';
import UserAvatar from './UserAvatar.tsx';
import Tag from './Tag.tsx';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface TaskDetailModalProps {
    task: Task;
    onClose: () => void;
    onUpdateTask: (taskId: string, updates: Partial<Omit<Task, 'id'>>) => void;
    onAddComment: (taskId: string, content: string) => void;
    onAddSubtask: (parentId: string, title: string) => void;
    projectUsers: User[];
    currentUser: User;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
    task,
    onClose,
    onUpdateTask,
    onAddComment,
    onAddSubtask,
    projectUsers,
    currentUser,
}) => {
    const [newComment, setNewComment] = useState('');
    const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(task.id, newComment.trim());
            setNewComment('');
        }
    };
    
    const handleSubtaskSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newSubtaskTitle.trim()) {
            onAddSubtask(task.id, newSubtaskTitle.trim());
            setNewSubtaskTitle('');
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <Card className="w-full max-w-3xl max-h-[90vh] flex flex-col" glowColor="blue" onClick={(e) => e.stopPropagation()}>
                <header className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
                    <div>
                        <input
                            type="text"
                            value={task.title}
                            onChange={(e) => onUpdateTask(task.id, { title: e.target.value })}
                            className="text-2xl font-bold bg-transparent text-gray-900 dark:text-white w-full focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 rounded-md px-2 -ml-2"
                        />
                         {task.tags && <div className="mt-2 flex flex-wrap gap-2">{task.tags.map(t => <Tag key={t} tag={t}/>)}</div>}
                    </div>
                    <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">&times;</button>
                </header>
                <div className="flex-1 p-6 overflow-y-auto grid grid-cols-3 gap-6">
                    <main className="col-span-2 space-y-6">
                         <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Açıklama</h3>
                            <textarea
                                value={task.description || ''}
                                onChange={e => onUpdateTask(task.id, { description: e.target.value })}
                                rows={4}
                                placeholder="Açıklama ekle..."
                                className="w-full bg-gray-100 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm"
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Alt Görevler ({task.subtasks?.length || 0})</h3>
                             <div className="space-y-2">
                                {task.subtasks?.map(subtask => (
                                    <div key={subtask.id} className="flex items-center bg-gray-100 dark:bg-gray-800/50 p-2 rounded-md">
                                        <input type="checkbox" checked={subtask.completed} onChange={() => onUpdateTask(subtask.id, { completed: !subtask.completed })} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2" />
                                        <span className={`flex-1 text-sm ${subtask.completed ? 'line-through text-gray-500' : ''}`}>{subtask.title}</span>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={handleSubtaskSubmit} className="flex items-center space-x-2 mt-2">
                                <input type="text" value={newSubtaskTitle} onChange={e => setNewSubtaskTitle(e.target.value)} placeholder="Yeni alt görev ekle..." className="flex-1 bg-gray-100 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm" />
                                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md px-3 py-1.5 text-sm">Ekle</button>
                            </form>
                        </div>
                         <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Yorumlar</h3>
                             <div className="space-y-4">
                                {task.comments?.map(comment => (
                                    <div key={comment.id} className="flex items-start space-x-3">
                                        <UserAvatar user={comment.author} size="medium" />
                                        <div>
                                            <div className="bg-gray-100 dark:bg-gray-800/50 p-3 rounded-lg rounded-tl-none">
                                                <p className="text-sm">{comment.content}</p>
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 px-1">{comment.author.name}, {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: tr })}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={handleCommentSubmit} className="flex items-start space-x-3 mt-4">
                                <UserAvatar user={currentUser} size="medium"/>
                                <textarea value={newComment} onChange={e => setNewComment(e.target.value)} rows={2} placeholder="Yorum yaz..." className="flex-1 bg-gray-100 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm"></textarea>
                                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md px-3 py-1.5 text-sm">Gönder</button>
                            </form>
                        </div>
                    </main>
                    <aside className="col-span-1 space-y-4">
                         <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Durum</label>
                            <select value={task.status} onChange={e => onUpdateTask(task.id, { status: e.target.value as Task['status'] })} className="w-full mt-1 bg-gray-100 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1.5 text-sm">
                                <option value="todo">Yapılacak</option>
                                <option value="in-progress">Devam Ediyor</option>
                                <option value="done">Tamamlandı</option>
                            </select>
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Atanan</label>
                             <select value={task.assignee?.id || ''} onChange={e => onUpdateTask(task.id, { assignee: projectUsers.find(u => u.id === e.target.value) })} className="w-full mt-1 bg-gray-100 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1.5 text-sm">
                                <option value="">Atanmamış</option>
                                {projectUsers.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                            </select>
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Başlangıç Tarihi</label>
                            <input type="date" value={task.startDate?.split('T')[0] || ''} onChange={e => onUpdateTask(task.id, { startDate: e.target.value })} className="w-full mt-1 bg-gray-100 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1.5 text-sm" />
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Bitiş Tarihi</label>
                            <input type="date" value={task.dueDate?.split('T')[0] || ''} onChange={e => onUpdateTask(task.id, { dueDate: e.target.value })} className="w-full mt-1 bg-gray-100 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1.5 text-sm" />
                        </div>
                    </aside>
                </div>
            </Card>
        </div>
    );
};

export default TaskDetailModal;