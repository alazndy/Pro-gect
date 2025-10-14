

import React, { useState } from 'react';
import type { Project, User } from '../types.ts';
import { USERS, INTEGRATION_CATEGORIES } from '../constants.tsx';
import Card from './Card.tsx';
import ProjectWizard from './ProjectWizard.tsx';
// Fix: Added .tsx extension to import path.
import ProjectInfoCard from './ProjectInfoCard.tsx';

interface ProjectsProps {
    projects: Project[];
    currentUser: User;
    onSelectProject: (projectId: string) => void;
    onCreateProject: (newProjectData: Omit<Project, 'id'>) => void;
}

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const Projects: React.FC<ProjectsProps> = ({ projects, currentUser, onSelectProject, onCreateProject }) => {
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    const handleCompleteWizard = (newProjectData: Omit<Project, 'id' | 'tasks' | 'architecture' | 'automations' | 'documents' >) => {
        onCreateProject({
            ...newProjectData,
            tasks: [],
            architecture: { nodes: [], edges: [] },
            automations: [],
            documents: []
        });
        setIsWizardOpen(false);
    }

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Projeler</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Mevcut projeleri yönetin veya yeni bir tane oluşturun.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <Card 
                    className="flex items-center justify-center border-dashed border-2 hover:border-solid hover:bg-blue-500/10 cursor-pointer min-h-[250px] border-gray-400 dark:border-gray-600"
                    glowColor="blue"
                    onClick={() => setIsWizardOpen(true)}
                >
                    <div className="text-center">
                        <PlusIcon className="w-10 h-10 mx-auto text-gray-500 dark:text-gray-400" />
                        <p className="mt-2 font-semibold text-gray-800 dark:text-white">Yeni Proje Oluştur</p>
                    </div>
                </Card>
                {projects.map(project => (
                    <ProjectInfoCard 
                        key={project.id} 
                        project={project} 
                        allUsers={USERS}
                        onSelect={() => onSelectProject(project.id)} 
                    />
                ))}
            </div>

            {isWizardOpen && (
                <ProjectWizard 
                    currentUser={currentUser}
                    allUsers={USERS}
                    allIntegrations={INTEGRATION_CATEGORIES}
                    onCancel={() => setIsWizardOpen(false)}
                    onComplete={handleCompleteWizard}
                />
            )}
        </div>
    );
};

export default Projects;