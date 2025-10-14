
import React from 'react';
// Fix: Corrected module imports by removing file extensions and adjusting paths for components directory.
import type { Project, User, Expense, Page } from '../types.ts';
import { USERS } from '../constants.tsx';
import TaskCard from './TaskCard.tsx';
import BudgetCard from './BudgetCard.tsx';
import ScopeCard from './ScopeCard.tsx';
import SmartGoalsCard from './SmartGoalsCard.tsx';
import ArchitectureCard from './ArchitectureCard.tsx';
import UserManagementCard from './UserManagementCard.tsx';
import IntegrationsCard from './IntegrationsCard.tsx';
import PlatformCard from './PlatformCard.tsx';
import DocumentsCard from './DocumentsCard.tsx';

interface DashboardProps {
    project: Project;
    
    onUpdateProject: (updatedProject: Project) => void;
    dashboardView: string;
    onSetDashboardView: (view: string) => void;
    onAddExpense: (expense: Omit<Expense, 'id'>) => void;
    onRemoveExpense: (expenseId: string) => void;
    onNavigate: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ project, onUpdateProject, dashboardView, onSetDashboardView, onAddExpense, onRemoveExpense, onNavigate }) => {
    
    // Handlers for child components to update project state
    const handleChangeAdmin = (newAdminId: string) => {
        onUpdateProject({ ...project, adminId: newAdminId });
    };

    const handleAddMember = (member: User) => {
        if (!project.members.some(m => m.id === member.id)) {
            onUpdateProject({ ...project, members: [...project.members, member] });
        }
    };

    const handleRemoveMember = (memberId: string) => {
        if (memberId === project.adminId) {
            alert("Proje yöneticisini kaldıramazsınız.");
            return;
        }
        onUpdateProject({ ...project, members: project.members.filter(m => m.id !== memberId) });
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Fix: Removed incorrect props from TaskCard. It is a summary card. */}
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
                    <UserManagementCard 
                        project={project}
                        allUsers={USERS}
                        onChangeAdmin={handleChangeAdmin}
                        onAddMember={handleAddMember}
                        onRemoveMember={handleRemoveMember}
                    />
                    <IntegrationsCard integrations={project.integrations} />
                    <DocumentsCard documents={project.documents} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;