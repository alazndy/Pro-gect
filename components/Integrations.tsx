
import React, { useState } from 'react';
import type { Integration, IntegrationCategory } from '../types.ts';
import Card from './Card.tsx';
import IntegrationModal from './IntegrationModal.tsx';

interface IntegrationsProps {
    projectIntegrations: Integration[];
    allIntegrations: IntegrationCategory[];
    onAddIntegration: (integration: Integration) => void;
    onRemoveIntegration: (integrationId: string) => void;
    onUpdateIntegration: (integration: Integration) => void;
}

const IntegrationItem: React.FC<{
    integration: Integration;
    isConnected: boolean;
    onClick: () => void;
}> = ({ integration, isConnected, onClick }) => (
    <Card onClick={onClick} className="flex flex-col items-center justify-center text-center h-48 cursor-pointer" glowColor={isConnected ? 'green' : 'blue'}>
        <integration.icon className="w-16 h-16 mb-4 text-gray-700 dark:text-gray-300" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{integration.name}</h3>
        <p className={`text-sm ${isConnected ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>
            {isConnected ? 'Bağlı' : 'Bağlı Değil'}
        </p>
    </Card>
);

const Integrations: React.FC<IntegrationsProps> = ({ projectIntegrations, allIntegrations, onAddIntegration, onRemoveIntegration, onUpdateIntegration }) => {
    const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (integration: Integration) => {
        setSelectedIntegration(integration);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedIntegration(null);
        setIsModalOpen(false);
    };

    const handleSaveIntegration = (url: string) => {
        if (selectedIntegration) {
            const isConnected = projectIntegrations.some(pi => pi.id === selectedIntegration.id);
            if (isConnected) {
                const existingIntegration = projectIntegrations.find(pi => pi.id === selectedIntegration.id);
                if (existingIntegration && existingIntegration.url !== url) {
                    onUpdateIntegration({ ...existingIntegration, url });
                }
            } else {
                onAddIntegration({ ...selectedIntegration, url });
            }
        }
    };

    const handleDisconnectIntegration = () => {
        if (selectedIntegration) {
            onRemoveIntegration(selectedIntegration.id);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Entegrasyonlar</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Projenizi harici hizmetlere bağlayın ve iş akışlarınızı otomatikleştirin.</p>
            </header>
            <div className="space-y-8">
                {allIntegrations.map(category => (
                    <div key={category.name}>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-300 dark:border-gray-700">{category.name}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {category.integrations.map(int => (
                                <IntegrationItem
                                    key={int.id}
                                    integration={int}
                                    isConnected={projectIntegrations.some(pi => pi.id === int.id)}
                                    onClick={() => handleOpenModal(int)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <IntegrationModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                integration={selectedIntegration}
                isConnected={selectedIntegration ? projectIntegrations.some(pi => pi.id === selectedIntegration.id) : false}
                onSave={handleSaveIntegration}
                onDisconnect={handleDisconnectIntegration}
            />
        </div>
    );
};

export default Integrations;
