import React, { useState, useEffect, useMemo } from 'react';
import type { Project, User, Expense, Task, Comment, SmartGoals, Integration, Automation, Page } from './types.ts';
import { ALL_INTEGRATIONS, INTEGRATION_CATEGORIES } from './constants.tsx';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import LoginScreen from './components/LoginScreen.tsx';
import Dashboard from './Dashboard.tsx';
import Projects from './components/Projects.tsx';
import Settings from './components/Settings.tsx';
import DynamicGlowBackground from './components/DynamicGlowBackground.tsx';
import Tasks from './components/Tasks.tsx';
import Goals from './components/Goals.tsx';
import Integrations from './components/Integrations.tsx';
import Documents from './components/Documents.tsx';
import Automations from './components/Automations.tsx';
import Architecture from './components/Architecture.tsx';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, query, where, getDocs, collection, updateDoc, arrayUnion, onSnapshot, addDoc } from 'firebase/firestore';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<Page>('projects');
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [dashboardView, setDashboardView] = useState('overview');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
            if (firebaseUser) {
                const userRef = doc(db, 'users', firebaseUser.uid);
                const userSnap = await getDoc(userRef);
                const userEmail = firebaseUser.email!;

                let user: User;
                if (!userSnap.exists()) {
                    user = { id: firebaseUser.uid, name: firebaseUser.displayName || userEmail.split('@')[0], avatarUrl: firebaseUser.photoURL || undefined };
                    await setDoc(userRef, { name: user.name, email: userEmail, avatarUrl: user.avatarUrl });
                } else {
                    user = { id: userSnap.id, ...userSnap.data() } as User;
                }
                setCurrentUser(user);

                const invitationsQuery = query(collection(db, "invitations"), where("email", "==", userEmail), where("status", "==", "pending"));
                const invitationsSnapshot = await getDocs(invitationsQuery);

                for (const invDoc of invitationsSnapshot.docs) {
                    const invitation = invDoc.data();
                    const projectRef = doc(db, "projects", invitation.projectId);
                    await updateDoc(projectRef, { 
                        [`members.${user.id}`]: invitation.role,
                        memberIds: arrayUnion(user.id)
                    });
                    await updateDoc(invDoc.ref, { status: 'accepted' });
                    alert(`You have been added to project: ${invitation.projectId}`)
                }
            } else {
                setCurrentUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!currentUser) {
            setProjects([]);
            return;
        }
        
        const projectsRef = collection(db, 'projects');
        const q = query(projectsRef, where('memberIds', 'array-contains', currentUser.id));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userProjects: Project[] = [];
            querySnapshot.forEach((doc) => {
                const projectData = doc.data() as Project;
                
                if (projectData.integrations) {
                    projectData.integrations = projectData.integrations.map(dbInt => {
                        const fullIntegration = ALL_INTEGRATIONS.find(constInt => constInt.id === dbInt.id);
                        return fullIntegration ? { ...dbInt, icon: fullIntegration.icon } : dbInt;
                    });
                }
                
                userProjects.push({ id: doc.id, ...projectData });
            });
            setProjects(userProjects);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const handleLogout = () => {
        signOut(auth).then(() => {
            setCurrentUser(null);
            setSelectedProjectId(null);
            setCurrentPage('projects');
        });
    };

    const handleSelectProject = (projectId: string) => {
        setSelectedProjectId(projectId);
        setCurrentPage('dashboard');
        setDashboardView('overview');
    };

    const handleUpdateProject = (updatedProject: Project) => {
        setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    };
    
    const handleCreateProject = async (newProjectData: Omit<Project, 'id'>) => {
        if (!currentUser) return;

        const projectToSave = JSON.parse(JSON.stringify(newProjectData));

        projectToSave.tasks = projectToSave.tasks || [];
        projectToSave.architecture = projectToSave.architecture || { nodes: [], edges: [] };
        projectToSave.automations = projectToSave.automations || [];
        projectToSave.documents = projectToSave.documents || [];
        
        if (projectToSave.integrations) {
            projectToSave.integrations = projectToSave.integrations.map((integration: any) => {
                const { icon, ...rest } = integration;
                return rest;
            });
        }

        try {
            const docRef = await addDoc(collection(db, "projects"), projectToSave);
            console.log("Project written with ID: ", docRef.id);
            handleSelectProject(docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error creating project.");
        }
    };

    const selectedProject = useMemo(() => projects.find(p => p.id === selectedProjectId), [projects, selectedProjectId]);

    const completionPercentage = useMemo(() => {
        if (!selectedProject) return 0;
        const countTasks = (tasks: Task[]): { total: number; completed: number } => {
            let total = 0;
            let completed = 0;
            tasks.forEach(task => {
                total++;
                if (task.completed) completed++;
                if (task.subtasks) {
                    const subCounts = countTasks(task.subtasks);
                    total += subCounts.total;
                    completed += subCounts.completed;
                }
            });
            return { total, completed };
        };
        const { total, completed } = countTasks(selectedProject.tasks);
        return total > 0 ? (completed / total) * 100 : 0;
    }, [selectedProject]);

    const onAddExpense = (expense: Omit<Expense, 'id'>) => {
        if (!selectedProject) return;
        const newExpense = { ...expense, id: `exp-${Date.now()}` };
        const updatedProject = {
            ...selectedProject,
            budget: { ...selectedProject.budget, expenses: [...selectedProject.budget.expenses, newExpense] },
        };
        handleUpdateProject(updatedProject);
    };
    
    const onRemoveExpense = (expenseId: string) => {
        if (!selectedProject) return;
        const updatedProject = {
            ...selectedProject,
            budget: { ...selectedProject.budget, expenses: selectedProject.budget.expenses.filter(e => e.id !== expenseId) },
        };
        handleUpdateProject(updatedProject);
    };

    const onUpdateGoals = (updatedGoals: SmartGoals) => {
        if (!selectedProject) return;
        handleUpdateProject({ ...selectedProject, goals: updatedGoals });
    };

    const onAddIntegration = (integration: Integration) => {
        if (!selectedProject || selectedProject.integrations.some(i => i.id === integration.id)) return;
        handleUpdateProject({ ...selectedProject, integrations: [...selectedProject.integrations, integration] });
    };

    const onRemoveIntegration = (integrationId: string) => {
        if (!selectedProject) return;
        handleUpdateProject({ ...selectedProject, integrations: selectedProject.integrations.filter(i => i.id !== integrationId) });
    };

    const onUpdateIntegration = (updatedIntegration: Integration) => {
        if (!selectedProject) return;
        const updatedIntegrations = selectedProject.integrations.map(i => 
            i.id === updatedIntegration.id ? updatedIntegration : i
        );
        handleUpdateProject({ ...selectedProject, integrations: updatedIntegrations });
    };

    const updateTasks = (tasks: Task[], updater: (task: Task) => Task): Task[] => {
        return tasks.map(task => {
            const updatedTask = updater(task);
            if (task.subtasks) {
                return { ...updatedTask, subtasks: updateTasks(task.subtasks, updater) };
            }
            return updatedTask;
        });
    };

    const onUpdateTask = (taskId: string, updates: Partial<Omit<Task, 'id'>>) => {
        if (!selectedProject) return;
        const updater = (task: Task): Task => {
            if (task.id === taskId) {
                return { ...task, ...updates };
            }
            return task;
        };
        handleUpdateProject({ ...selectedProject, tasks: updateTasks(selectedProject.tasks, updater) });
    };

    const onAddTask = (title: string, status: Task['status'] = 'todo') => {
        if (!selectedProject || !currentUser) return;
        const newTask: Task = {
            id: `task-${Date.now()}`,
            title,
            completed: false,
            status,
            assignee: currentUser,
            comments: [],
            subtasks: []
        };
        handleUpdateProject({ ...selectedProject, tasks: [...selectedProject.tasks, newTask] });
    };

    const onAddSubtask = (parentId: string, title: string) => {
        if (!selectedProject) return;
        const updater = (task: Task): Task => {
            if (task.id === parentId) {
                const newSubtask: Task = { id: `task-${Date.now()}`, title, completed: false, status: 'todo', assignee: currentUser, comments: [], subtasks: [] };
                return { ...task, subtasks: [...(task.subtasks || []), newSubtask] };
            }
            return task;
        };
        handleUpdateProject({ ...selectedProject, tasks: updateTasks(selectedProject.tasks, updater) });
    };

    const onAddComment = (taskId: string, content: string) => {
        if (!selectedProject || !currentUser) return;
        const updater = (task: Task): Task => {
            if (task.id === taskId) {
                const newComment: Comment = { id: `comment-${Date.now()}`, content, author: currentUser, createdAt: new Date().toISOString() };
                return { ...task, comments: [...(task.comments || []), newComment] };
            }
            return task;
        };
        handleUpdateProject({ ...selectedProject, tasks: updateTasks(selectedProject.tasks, updater) });
    };

    const onAddTasks = (newTasks: Omit<Task, 'id'>[]) => {
        if (!selectedProject || !currentUser) return;
        const tasksToAdd = newTasks.map(task => ({
            ...task,
            id: `task-${Date.now()}-${Math.random()}`,
            assignee: currentUser,
            comments: [],
            subtasks: []
        }));
        handleUpdateProject({ ...selectedProject, tasks: [...selectedProject.tasks, ...tasksToAdd] });
    };

    const renderContent = () => {
        if (!selectedProject) {
            return <Projects projects={projects} currentUser={currentUser!} onSelectProject={handleSelectProject} onCreateProject={handleCreateProject} />;
        }
        switch (currentPage) {
            case 'dashboard': return <Dashboard 
                                        project={selectedProject} 
                                        currentUser={currentUser!}
                                        onUpdateProject={handleUpdateProject}
                                        dashboardView={dashboardView}
                                        onSetDashboardView={setDashboardView}
                                        onAddExpense={onAddExpense}
                                        onRemoveExpense={onRemoveExpense}
                                        onNavigate={setCurrentPage}
                                      />;
            case 'tasks': return <Tasks 
                                    project={selectedProject} 
                                    currentUser={currentUser!}
                                    onAddTask={(title) => onAddTask(title)}
                                    onAddSubtask={onAddSubtask}
                                    onAddComment={onAddComment}
                                    onUpdateTask={onUpdateTask}
                                 />;
            case 'goals': return <Goals goals={selectedProject.goals} onUpdateGoals={onUpdateGoals} />;
            case 'integrations': return <Integrations 
                                            projectIntegrations={selectedProject.integrations}
                                            allIntegrations={INTEGRATION_CATEGORIES}
                                            onAddIntegration={onAddIntegration}
                                            onRemoveIntegration={onRemoveIntegration}
                                            onUpdateIntegration={onUpdateIntegration}
                                        />;
            case 'documents': return <Documents 
                                        documents={selectedProject.documents} 
                                        onAddDocument={(doc) => handleUpdateProject({...selectedProject, documents: [...selectedProject.documents, {...doc, id: `doc-${Date.now()}`, url:'#'}]})}
                                        onDeleteDocument={(docId) => handleUpdateProject({...selectedProject, documents: selectedProject.documents.filter(d => d.id !== docId)})}
                                     />
            case 'automations': return <Automations />
            case 'architecture': return <Architecture project={selectedProject} onUpdateProject={handleUpdateProject} />;
            case 'settings': return <Settings user={currentUser!} currentTheme={theme} onThemeChange={setTheme} />;
            case 'projects':
            default: return <Projects projects={projects} currentUser={currentUser!} onSelectProject={handleSelectProject} onCreateProject={handleCreateProject} />;
        }
    };
    
    if (!currentUser) {
        return (
            <div className="bg-gray-900 text-white min-h-screen font-sans">
                <DynamicGlowBackground completionPercentage={0} />
                <LoginScreen />
            </div>
        );
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen font-sans transition-colors duration-300">
            <DynamicGlowBackground completionPercentage={completionPercentage} />
            <div className="flex">
                <Sidebar 
                    currentPage={currentPage} 
                    onNavigate={setCurrentPage}
                    onLogout={handleLogout}
                    hasProject={!!selectedProject}
                />
                <div className="flex-1 flex flex-col h-screen">
                    <main className="flex-1 p-8 overflow-y-auto">
                        <Header title={selectedProject ? selectedProject.name : "Projeler"} user={currentUser} />
                        <div className="mt-8 h-full">
                            {renderContent()}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;