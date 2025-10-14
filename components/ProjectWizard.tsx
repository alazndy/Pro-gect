import React, { useState } from 'react';

import type { Project, User, SmartGoals, Scope, Integration, IntegrationCategory, Role } from '../types.ts';
import { SOFTWARE_PLATFORMS, HARDWARE_PLATFORMS } from '../constants.tsx';
import UserAvatar from './UserAvatar.tsx';

interface ProjectWizardProps {
    currentUser: User;
    allUsers: User[];
    allIntegrations: IntegrationCategory[];
    onCancel: () => void;
    onComplete: (newProjectData: Omit<Project, 'id' | 'tasks' | 'architecture' | 'automations' | 'documents' >) => void;
}

const steps = [
    { id: 1, name: 'Detaylar', icon: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg> },
    { id: 2, name: 'Takım', icon: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.952a4.5 4.5 0 01-9 0m9 0a4.5 4.5 0 00-9 0m9 0h.008v.008h-.008v-.008zm-9 0h.008v.008H9v-.008zm7.5-9a4.5 4.5 0 019 0m-9 0a4.5 4.5 0 009 0m-9 0h.008v.008h-.008V9.72z" /></svg> },
    { id: 3, name: 'Kapsam', icon: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { id: 4, name: 'Hedefler', icon: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 100-13.5h9a9.75 9.75 0 100 13.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75h.008v.008H12v-.008z" /></svg> },
    { id: 5, name: 'Bütçe', icon: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 015.25 6v.75m0 0v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75V7.5m1.5-1.5h.75a.75.75 0 01.75.75v.75m0 0v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75V7.5m-6 3V7.5m0 0A.75.75 0 013 6h.75M3.75 9v6m0 0a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75V9m0 0h.75A.75.75 0 013.75 9z" /></svg> },
    { id: 6, name: 'Entegrasyonlar', icon: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg> },
    { id: 7, name: 'Platformlar', icon: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg> },
    { id: 8, name: 'AI Agent', icon: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V8.25a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 8.25v10.5A2.25 2.25 0 006.75 21z" /></svg> },
    { id: 9, name: 'Gözden Geçir', icon: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
];

const WizardStep: React.FC<{ Icon: React.FC<React.SVGProps<SVGSVGElement>>, label: string, active: boolean, completed: boolean, onClick: () => void }> = ({ Icon, label, active, completed, onClick }) => (
    <div onClick={onClick} className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${active ? 'bg-blue-500/20 scale-105' : 'hover:bg-white/10'}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${active ? 'border-blue-400 text-blue-300' : completed ? 'border-green-500 text-green-400' : 'border-gray-600 text-gray-500'}`}>
            <Icon className="w-6 h-6" />
        </div>
        <span className={`font-semibold text-lg ${active ? 'text-white' : completed ? 'text-gray-300' : 'text-gray-500'}`}>{label}</span>
    </div>
);

const FormTextarea: React.FC<{ label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, placeholder?: string, rows?: number }> = ({ label, value, onChange, placeholder, rows = 3 }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow shadow-lg"
        />
    </div>
);

const ProjectWizard: React.FC<ProjectWizardProps> = ({ currentUser, allUsers, allIntegrations, onCancel, onComplete }) => {
    const [step, setStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        adminId: currentUser.id,
        members: { [currentUser.id]: 'Admin' as Role },
        memberIds: [currentUser.id],
        scope: { inScope: '', outOfScope: '', deliverables: '' },
        goals: { specific: '', measurable: '', achievable: '', relevant: '', timeBound: '' },
        budget: { total: 0 },
        integrations: [] as Integration[],
        platforms: { software: [] as string[], hardware: [] as string[] },
        aiAgentInstructions: '',
        aiAgentOutput: '',
    });
    const [nameError, setNameError] = useState('');

    const handleDataChange = (field: keyof typeof projectData, value: unknown) => {
        if (field === 'name') {
            if (!value.trim()) setNameError('Proje adı gerekli.');
            else setNameError('');
        }
        setProjectData(prev => ({ ...prev, [field]: value }));
    };
    
    const handleScopeChange = (field: keyof Scope, value: string) => {
        setProjectData(prev => ({ ...prev, scope: { ...prev.scope, [field]: value } }));
    };
    
    const handleGoalsChange = (field: keyof SmartGoals, value: string) => {
        setProjectData(prev => ({ ...prev, goals: { ...prev.goals, [field]: value } }));
    };

    const handleMemberToggle = (user: User) => {
        setProjectData(prev => {
            const newMembers = { ...prev.members };
            const newMemberIds = [...prev.memberIds];
            
            if (newMembers[user.id]) {
                delete newMembers[user.id];
                const index = newMemberIds.indexOf(user.id);
                if (index > -1) {
                    newMemberIds.splice(index, 1);
                }
            } else {
                newMembers[user.id] = 'Admin';
                newMemberIds.push(user.id);
            }

            const newAdminId = newMemberIds.includes(prev.adminId) ? prev.adminId : currentUser.id;
            return { ...prev, members: newMembers, memberIds: newMemberIds, adminId: newAdminId };
        });
    };

    const handleIntegrationToggle = (integration: Integration) => {
        setProjectData(prev => {
            const isIntegrated = prev.integrations.some(i => i.id === integration.id);
            const newIntegrations = isIntegrated
                ? prev.integrations.filter(i => i.id !== integration.id)
                : [...prev.integrations, integration];
            return { ...prev, integrations: newIntegrations };
        });
    };
    
    const handlePlatformToggle = (type: 'software' | 'hardware', platform: string) => {
        setProjectData(prev => {
            const currentPlatforms = prev.platforms[type];
            const isSelected = currentPlatforms.includes(platform);
            const newPlatforms = isSelected
                ? currentPlatforms.filter(p => p !== platform)
                : [...currentPlatforms, platform];
            return { ...prev, platforms: { ...prev.platforms, [type]: newPlatforms } };
        });
    };

    const handleDownloadTemplate = () => {
        const availableIntegrations = allIntegrations.flatMap(c => c.integrations).map(i => i.name);
        const template = {
            name: "Proje Adı",
            description: "Proje açıklaması.",
            scope: {
                inScope: "- Kapsam dahilindeki maddeler",
                outOfScope: "- Kapsam dışındaki maddeler",
                deliverables: "- Teslim edilecekler"
            },
            goals: {
                specific: "Belirli hedefler",
                measurable: "Ölçülebilir hedefler",
                achievable: "Ulaşılabilir hedefler",
                relevant: "İlgili hedefler",
                timeBound: "Zamanla sınırlı hedefler"
            },
            budget: {
                total: 10000
            },
            integrations: [],
            platforms: {
                software: [],
                hardware: []
            },
            aiAgentInstructions: `Please fill out the project details above based on our discussion.\nAvailable integrations: ${availableIntegrations.join(', ')}\nAvailable software platforms: ${SOFTWARE_PLATFORMS.join(', ')}\nAvailable hardware platforms: ${HARDWARE_PLATFORMS.join(', ')}`,
            aiAgentOutput: ""
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(template, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "project_template.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleJsonImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string);
                    
                    const importedIntegrations: Integration[] = [];
                    if (json.integrations && Array.isArray(json.integrations)) {
                        const allIntegrationsList = allIntegrations.flatMap(c => c.integrations);
                        json.integrations.forEach((integrationName: string) => {
                            const integration = allIntegrationsList.find(i => i.name === integrationName);
                            if (integration) {
                                importedIntegrations.push(integration);
                            }
                        });
                    }

                    setProjectData(prev => ({
                        ...prev,
                        name: json.name || prev.name,
                        description: json.description || prev.description,
                        scope: json.scope || prev.scope,
                        goals: json.goals || prev.goals,
                        budget: json.budget || prev.budget,
                        integrations: importedIntegrations,
                        platforms: json.platforms || prev.platforms,
                        aiAgentInstructions: json.aiAgentInstructions || prev.aiAgentInstructions,
                        aiAgentOutput: json.aiAgentOutput || prev.aiAgentOutput,
                    }));
                } catch (error) {
                    console.error("Error parsing JSON file: ", error);
                    alert("Invalid JSON file.");
                }
            };
            reader.readAsText(file);
        }
    };

    const handleNext = () => {
        if (step === 1 && !projectData.name.trim()) {
            setNameError('Proje adı gerekli.');
            return;
        }
        if (!completedSteps.includes(step)) {
            setCompletedSteps([...completedSteps, step]);
        }
        if (step < steps.length) setStep(s => s + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(s => s - 1);
    };
    
    const handleStepClick = (stepId: number) => {
        if (completedSteps.includes(stepId) || stepId < step) {
            setStep(stepId);
        }
    }

    const handleComplete = () => {
        if (projectData.name.trim()) {
            onComplete({
                name: projectData.name,
                description: projectData.description,
                adminId: projectData.adminId,
                members: projectData.members,
                memberIds: projectData.memberIds,
                scope: projectData.scope,
                goals: projectData.goals,
                budget: { total: projectData.budget.total, expenses: [] },
                integrations: projectData.integrations,
                platforms: projectData.platforms,
                aiAgentInstructions: projectData.aiAgentInstructions,
                aiAgentOutput: projectData.aiAgentOutput,
            });
        } else {
            setStep(1);
            setNameError('Proje adı gerekli.');
        }
    };
    
    const PlatformSelector: React.FC<{ title: string; platforms: string[]; selected: string[]; onToggle: (platform: string) => void }> = ({ title, platforms, selected, onToggle }) => (
        <div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">{title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {platforms.map(platform => (
                    <label key={platform} className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg cursor-pointer hover:bg-blue-500/10 transition-colors">
                        <input type="checkbox"
                            checked={selected.includes(platform)}
                            onChange={() => onToggle(platform)}
                            className="form-checkbox h-5 w-5 text-blue-400 bg-gray-800 border-gray-600 rounded-full focus:ring-blue-500 focus:ring-offset-gray-900"
                        />
                        <span className="capitalize text-sm font-semibold">{platform}</span>
                    </label>
                ))}
            </div>
        </div>
    );

    const renderStepContent = () => {
        // Simple fade transition
        return <div className="animate-fade-in">
            {(() => {
                switch (step) {
                    case 1: // Details
                        return <div className="space-y-6">
                            <div>
                                <label htmlFor="projectName" className="block text-xl font-medium text-gray-200">Proje Adı</label>
                                <input
                                    type="text" id="projectName" value={projectData.name}
                                    onChange={(e) => handleDataChange('name', e.target.value)}
                                    placeholder="Örn: Fusion AI Dashboard"
                                    className={`mt-2 w-full bg-white/5 border-2 ${nameError ? 'border-red-500/50' : 'border-white/20'} rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-lg`}
                                />
                                {nameError && <p className="text-red-400 text-sm mt-2">{nameError}</p>}
                            </div>
                            <div>
                                <label htmlFor="projectDesc" className="block text-xl font-medium text-gray-200">Proje Açıklaması</label>
                                <textarea id="projectDesc" value={projectData.description}
                                    onChange={(e) => handleDataChange('description', e.target.value)}
                                    rows={5}
                                    placeholder="Projenin ana hedeflerini ve amacını kısaca açıklayın."
                                    className="mt-2 w-full bg-white/5 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-lg"
                                />
                            </div>
                        </div>;

                    case 2: { // Team
                        const availableToSelect = allUsers.filter(u => u.id !== currentUser.id);
                        return <div className="space-y-4">
                            <div>
                                <label className="block text-xl font-medium text-gray-200 mb-3">Takım Üyelerini Seç</label>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                    {[currentUser, ...availableToSelect].map(user => (
                                        <div key={user.id} onClick={() => user.id !== currentUser.id && handleMemberToggle(user)}
                                            className={`flex items-center justify-between p-3 rounded-xl transition-colors ${user.id === currentUser.id ? 'bg-white/10' : 'bg-white/5 hover:bg-blue-500/10 cursor-pointer'}`}>
                                            <div className="flex items-center space-x-4">
                                                <UserAvatar user={user} size="large"/>
                                                <span className="font-semibold text-lg">{user.name} {user.id === currentUser.id && '(Siz)'}</span>
                                            </div>
                                            <input type="checkbox" readOnly checked={!!projectData.members[user.id]}
                                                className="form-checkbox h-6 w-6 text-blue-400 bg-gray-800 border-gray-600 rounded-md focus:ring-blue-500 focus:ring-offset-gray-900 cursor-pointer" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="adminSelect" className="block text-xl font-medium text-gray-200 mb-3">Proje Yöneticisi</label>
                                <select id="adminSelect" value={projectData.adminId} onChange={e => handleDataChange('adminId', e.target.value)}
                                    className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-lg">
                                    {projectData.memberIds.map(userId => {
                                        const user = allUsers.find(u => u.id === userId);
                                        return user ? <option key={user.id} value={user.id} className="bg-gray-800 text-white">{user.name}</option> : null;
                                    })}
                                </select>
                            </div>
                        </div>;
                    }
                    case 3: // Scope
                        return <div className="space-y-4">
                            <FormTextarea label="Kapsam Dahili (In-Scope)" value={projectData.scope.inScope} onChange={(e) => handleScopeChange('inScope', e.target.value)} placeholder="- Gerçek zamanlı veri görselleştirme" />
                            <FormTextarea label="Kapsam Dışı (Out-of-Scope)" value={projectData.scope.outOfScope} onChange={(e) => handleScopeChange('outOfScope', e.target.value)} placeholder="- Mobil uygulama desteği" />
                            <FormTextarea label="Teslimatlar (Deliverables)" value={projectData.scope.deliverables} onChange={(e) => handleScopeChange('deliverables', e.target.value)} placeholder="- Tamamen işlevsel web uygulaması" />
                        </div>;
                    case 4: // SMART Goals
                        return <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                            <FormTextarea label="Specific (Belirli)" value={projectData.goals.specific} onChange={(e) => handleGoalsChange('specific', e.target.value)} />
                            <FormTextarea label="Measurable (Ölçülebilir)" value={projectData.goals.measurable} onChange={(e) => handleGoalsChange('measurable', e.target.value)} />
                            <FormTextarea label="Achievable (Ulaşılabilir)" value={projectData.goals.achievable} onChange={(e) => handleGoalsChange('achievable', e.target.value)} />
                            <FormTextarea label="Relevant (İlgili)" value={projectData.goals.relevant} onChange={(e) => handleGoalsChange('relevant', e.target.value)} />
                            <FormTextarea label="Time-bound (Zamanla Sınırlı)" value={projectData.goals.timeBound} onChange={(e) => handleGoalsChange('timeBound', e.target.value)} />
                        </div>;
                    case 5: // Budget
                        return <div>
                            <label htmlFor="totalBudget" className="block text-xl font-medium text-gray-200">Toplam Proje Bütçesi</label>
                            <div className="relative mt-2">
                                <input type="number" id="totalBudget" value={projectData.budget.total}
                                    onChange={(e) => handleDataChange('budget', { total: Number(e.target.value) })}
                                    className="w-full bg-white/5 border-2 border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-lg"
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">TRY</span>
                            </div>
                        </div>;
                    case 6: // Integrations
                        return <div className="space-y-6 max-h-80 overflow-y-auto pr-2">
                            <label className="block text-xl font-medium text-gray-200 mb-3">Proje Entegrasyonları</label>
                            {allIntegrations.map(category => (
                                <div key={category.name}>
                                    <h3 className="font-semibold text-gray-300 mb-2 text-lg">{category.name}</h3>
                                    <div className="space-y-2">
                                        {category.integrations.map(integration => (
                                            <div key={integration.id} onClick={() => handleIntegrationToggle(integration)}
                                                className={`flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-blue-500/10 cursor-pointer transition-colors`}>
                                                <div className="flex items-center space-x-4">
                                                    <integration.icon className="w-7 h-7 text-white"/>
                                                    <span className="font-semibold text-md">{integration.name}</span>
                                                </div>
                                                <input type="checkbox" readOnly checked={projectData.integrations.some(i => i.id === integration.id)}
                                                    className="form-checkbox h-6 w-6 text-blue-400 bg-gray-800 border-gray-600 rounded-md focus:ring-blue-500 focus:ring-offset-gray-900 cursor-pointer" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>;
                    case 7: // Platforms
                        return <div className="space-y-6 max-h-80 overflow-y-auto pr-2">
                            <PlatformSelector
                                title="Yazılım Platformları"
                                platforms={SOFTWARE_PLATFORMS}
                                selected={projectData.platforms.software}
                                onToggle={(p) => handlePlatformToggle('software', p)}
                            />
                            <PlatformSelector
                                title="Donanım Platformları"
                                platforms={HARDWARE_PLATFORMS}
                                selected={projectData.platforms.hardware}
                                onToggle={(p) => handlePlatformToggle('hardware', p)}
                            />
                        </div>;
                    case 8: // AI Agent
                        return <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-medium text-gray-200">AI Agent Kurulumu</h3>
                                <button onClick={handleDownloadTemplate} className="bg-green-500/20 text-green-300 font-semibold rounded-lg px-4 py-2 text-sm hover:bg-green-500/30 transition-colors">
                                    Download Template
                                </button>
                            </div>
                            <div>
                                <label htmlFor="jsonImport" className="block text-sm font-medium text-gray-400 mb-2">Veya doldurulmuş bir şablonu içe aktarın:</label>
                                <input type="file" id="jsonImport" accept=".json" onChange={handleJsonImport} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-300 hover:file:bg-blue-500/20 cursor-pointer" />
                            </div>
                            <FormTextarea label="AI Agent Talimatları" value={projectData.aiAgentInstructions} onChange={(e) => handleDataChange('aiAgentInstructions', e.target.value)} rows={6} />
                            <FormTextarea label="AI Agent Çıktısı" value={projectData.aiAgentOutput} onChange={(e) => handleDataChange('aiAgentOutput', e.target.value)} rows={6} />
                        </div>;
                    case 9: // Review
                        return <div className="space-y-4 text-base max-h-80 overflow-y-auto pr-2 text-gray-300">
                            <h3 className="text-2xl font-semibold border-b-2 border-white/20 pb-2 mb-4 text-white">Proje Özeti</h3>
                            <p><strong className="text-gray-400">Ad:</strong> {projectData.name}</p>
                            <p><strong className="text-gray-400">Açıklama:</strong> {projectData.description || 'N/A'}</p>
                            <p><strong className="text-gray-400">Bütçe:</strong> {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(projectData.budget.total)}</p>
                            <p><strong className="text-gray-400">Yönetici:</strong> {allUsers.find(u => u.id === projectData.adminId)?.name}</p>
                            <div><strong className="text-gray-400">Üyeler:</strong> 
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {projectData.memberIds.map(userId => {
                                        const user = allUsers.find(u => u.id === userId);
                                        return user ? <span key={user.id} className="bg-white/10 px-3 py-1 rounded-full text-sm font-semibold">{user.name}</span> : null;
                                    })}
                                </div>
                            </div>
                            <div><strong className="text-gray-400">Entegrasyonlar:</strong> 
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {projectData.integrations.length > 0 ? projectData.integrations.map(i => <span key={i.id} className="bg-white/10 px-3 py-1 rounded-full text-sm font-semibold">{i.name}</span>) : 'Yok'}
                                </div>
                            </div>
                            <div><strong className="text-gray-400">Platformlar:</strong> 
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {projectData.platforms.software.length === 0 && projectData.platforms.hardware.length === 0 && 'Yok'}
                                    {projectData.platforms.software.map(p => <span key={p} className="bg-green-900/50 text-green-300 px-3 py-1 rounded-full text-sm font-semibold capitalize">{p}</span>)}
                                    {projectData.platforms.hardware.map(p => <span key={p} className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-sm font-semibold capitalize">{p}</span>)}
                                </div>
                            </div>
                        </div>;
                    default: return null;
                }
            })()}
        </div>;
    };

    const progress = (step / steps.length) * 100;

    return (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="w-full max-w-5xl bg-gray-800/50 rounded-2xl shadow-2xl shadow-blue-500/20 border border-white/20 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
                <div className="grid grid-cols-12">
                    <div className="col-span-3 bg-black/20 p-6 border-r border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-8">Proje Oluştur</h2>
                        <div className="space-y-2">
                            {steps.map(s => <WizardStep key={s.id} Icon={s.icon} label={s.name} active={step === s.id} completed={completedSteps.includes(s.id)} onClick={() => handleStepClick(s.id)} />)}
                        </div>
                    </div>
                    <div className="col-span-9 p-8">
                        <div className="min-h-[400px]">
                            {renderStepContent()}
                        </div>
                        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                            <button 
                                onClick={onCancel}
                                className="bg-transparent border border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-white font-semibold rounded-lg px-6 py-2 transition-colors"
                            >
                                İptal
                            </button>
                            <div className="flex space-x-4">
                                {step > 1 && (
                                    <button onClick={handleBack} className="bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg px-6 py-2 transition-colors">
                                        Geri
                                    </button>
                                )}
                                {step < steps.length ? (
                                    <button onClick={handleNext} className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-bold rounded-lg px-8 py-2 transition-all shadow-lg shadow-blue-500/20 transform hover:scale-105">
                                        İleri
                                    </button>
                                ) : (
                                    <button onClick={handleComplete} className="bg-gradient-to-r from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500 text-white font-bold rounded-lg px-8 py-2 transition-all shadow-lg shadow-green-500/20 transform hover:scale-105">
                                        Proje Oluştur
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectWizard;