
import React, { useState } from 'react';
// Fix: Removed .ts extension from import path.
// Fix: The AutomationTemplate type is defined in `../types` and not exported from `../constants`.
import type { Automation, Integration, AutomationNode, AutomationTemplate } from '../types.ts';
import Card from './Card.tsx';
import AutomationEditor from './AutomationEditor.tsx';
import AutomationTemplateModal from './AutomationTemplateModal.tsx';

interface AutomationsProps {
    automations: Automation[];
    projectIntegrations: Integration[];
    onUpdateAutomation: (automationId: string, updatedAutomation: Automation) => void;
    onCreateAutomation: (name: string, template?: Omit<Automation, 'id' | 'name'>) => Automation;
        onDeleteAutomation: (automationId: string) => void;
        onAddTasks: (tasks: Omit<Task, 'id'>[]) => void;
    }
    
    const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    );
    
    const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    );
    
    const Automations: React.FC<AutomationsProps> = ({ automations, projectIntegrations, onUpdateAutomation, onCreateAutomation, onDeleteAutomation, onAddTasks }) => {
        const [editingAutomationId, setEditingAutomationId] = useState<string | null>(null);
        const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    
        const handleCreateFromTemplate = (name: string, template?: AutomationTemplate) => {
            const newAutomation = onCreateAutomation(name, template?.automation);
            setEditingAutomationId(newAutomation.id);
            setIsTemplateModalOpen(false);
        };
        
        const handleDelete = (id: string) => {
            if (window.confirm("Bu otomasyonu silmek istediğinizden emin misiniz?")) {
                onDeleteAutomation(id);
            }
        }
    
        const currentAutomation = automations.find(a => a.id === editingAutomationId);
    
        if (currentAutomation) {
            return (
                <div className="h-full flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{currentAutomation.name}</h1>
                            <p className="text-gray-600 dark:text-gray-400">Otomasyonu düzenliyorsunuz.</p>
                        </div>
                        <button 
                            onClick={() => setEditingAutomationId(null)}
                            className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-lg px-4 py-2 transition-colors"
                        >
                            Listeye Geri Dön
                        </button>
                    </div>
                     <AutomationEditor 
                        key={currentAutomation.id}
                        automation={currentAutomation}
                        projectIntegrations={projectIntegrations}
                        onUpdate={onUpdateAutomation}
                        onAddTasks={onAddTasks}
                    />
            </div>
        );
    }
    
    return (
        <div className="h-full flex flex-col space-y-8">
            <header>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Otomasyonlar</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Bu proje için mevcut iş akışları.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card 
                    className="flex items-center justify-center border-dashed border-2 hover:border-solid hover:bg-blue-500/10 cursor-pointer min-h-[150px] border-gray-400 dark:border-gray-600"
                    glowColor="blue"
                    onClick={() => setIsTemplateModalOpen(true)}
                >
                    <div className="text-center">
                        <PlusIcon className="w-10 h-10 mx-auto text-gray-500 dark:text-gray-400" />
                        <p className="mt-2 font-semibold text-gray-800 dark:text-white">Yeni Otomasyon Oluştur</p>
                    </div>
                </Card>

                {automations.map(auto => (
                    <Card key={auto.id} className="min-h-[150px] flex flex-col justify-between">
                        <div className="p-4">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{auto.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{auto.nodes.length} Düğüm, {auto.edges.length} Bağlantı</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800/30 p-2 flex justify-end space-x-2 rounded-b-2xl">
                            <button 
                                onClick={() => handleDelete(auto.id)}
                                className="text-gray-500 dark:text-gray-400 hover:text-red-500 p-2 rounded-md transition-colors"
                                aria-label="Sil"
                            >
                                <TrashIcon className="w-5 h-5"/>
                            </button>
                            <button 
                                onClick={() => setEditingAutomationId(auto.id)}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md px-4 py-1.5 text-sm transition-colors"
                            >
                                Düzenle
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
            {isTemplateModalOpen && (
                <AutomationTemplateModal
                    onSelect={handleCreateFromTemplate}
                    onCancel={() => setIsTemplateModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Automations;