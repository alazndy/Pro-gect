

import React, { useState } from 'react';
// Fix: Corrected module imports by removing file extensions.
import type { Project, User, Task, Expense, Page } from './types.ts';
import { USERS } from './constants.tsx';
import TaskCard from './components/TaskCard.tsx';
import BudgetCard from './components/BudgetCard.tsx';
import ScopeCard from './components/ScopeCard.tsx';
import SmartGoalsCard from './components/SmartGoalsCard.tsx';
import ArchitectureCard from './components/ArchitectureCard.tsx';
import UserManagementCard from './components/UserManagementCard.tsx';
import IntegrationsCard from './components/IntegrationsCard.tsx';
import PlatformCard from './components/PlatformCard.tsx';
import DocumentsCard from './components/DocumentsCard.tsx';

import InviteUserModal from './components/InviteUserModal.tsx';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface DashboardProps {
    project: Project;
    currentUser: User;
    onUpdateProject: (updatedProject: Project) => void;
    dashboardView: string;
    onSetDashboardView: (view: string) => void;
    onAddExpense: (expense: Omit<Expense, 'id'>) => void;
    onRemoveExpense: (expenseId: string) => void;
    onNavigate: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ project, currentUser, onUpdateProject, dashboardView, onSetDashboardView, onAddExpense, onRemoveExpense, onNavigate }) => {
    const [isInviteModalOpen, setInviteModalOpen] = useState(false);
    const [inviteLoading, setInviteLoading] = useState(false);
    const [inviteError, setInviteError] = useState<string | null>(null);

    const handleInviteUser = async (email: string) => {
        setInviteLoading(true);
        setInviteError(null);
        try {
            const invitationsRef = collection(db, 'invitations');
            await addDoc(invitationsRef, {
                email,
                role: 'Admin',
                projectId: project.id,
                inviterId: currentUser.id,
                status: 'pending',
                createdAt: serverTimestamp(),
            });

            alert(`Invitation sent to ${email}!`);
            setInviteModalOpen(false);
        } catch (error: any) {
            setInviteError(error.message);
            alert(`Error sending invitation: ${error.message}`);
        } finally {
            setInviteLoading(false);
        }
    };

    if (dashboardView !== 'overview') {
        const renderFullView = () => {
            switch(dashboardView) {
                case 'budget':
                    return <BudgetCard budget={project.budget} onAddExpense={onAddExpense} onRemoveExpense={onRemoveExpense} isDetailedView />;
                // Future views can be added here
                default:
                    return <div>Görünüm bulunamadı.</div>;
            }
        };

        return (
            <div className="space-y-4">
                <button
                    onClick={() => onSetDashboardView('overview')}
                    className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-lg px-4 py-2 transition-colors flex items-center space-x-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    <span>Panoya Geri Dön</span>
                </button>
                {renderFullView()}
            </div>
        );
    }


    return (
        <div className="space-y-6">
            <InviteUserModal 
                isOpen={isInviteModalOpen} 
                onClose={() => setInviteModalOpen(false)} 
                onInvite={handleInviteUser} 
                loading={inviteLoading} 
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <TaskCard tasks={project.tasks} />
                    <ScopeCard scope={project.scope} />
                    <div onClick={() => onNavigate('architecture')} className="cursor-pointer">
                        <ArchitectureCard architecture={project.architecture} />
                    </div>
                    <PlatformCard platforms={project.platforms} />
                </div>
                <div className="space-y-6">
                    <div onClick={() => onSetDashboardView('budget')} className="cursor-pointer">
                        <BudgetCard budget={project.budget} />
                    </div>
                    <SmartGoalsCard goals={project.goals} />
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Kullanıcı Yönetimi</h3>
                            <button 
                                onClick={() => setInviteModalOpen(true)}
                                className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Invite User
                            </button>
                        </div>
                        <UserManagementCard 
                            members={project.members}
                            allUsers={USERS} // Still using constant, will need to be replaced with actual user data
                            onInvite={handleInviteUser}
                        />
                    </div>
                    <div onClick={() => onNavigate('integrations')} className="cursor-pointer">
                        <IntegrationsCard integrations={project.integrations} />
                    </div>
                    <DocumentsCard documents={project.documents} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;