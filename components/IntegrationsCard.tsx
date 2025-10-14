
import React from 'react';
import type { Integration } from '../types.ts';
import Card from './Card.tsx';
import { ALL_INTEGRATIONS } from '../constants.tsx'; // Import all integrations

interface IntegrationsCardProps {
  integrations: Integration[];
}

const IntegrationsCard: React.FC<IntegrationsCardProps> = ({ integrations }) => {
    // Rehydrate icons on the fly to make the component resilient
    const hydratedIntegrations = integrations.map(dbInt => {
        if (dbInt.icon) return dbInt; // Icon already exists
        const fullIntegration = ALL_INTEGRATIONS.find(constInt => constInt.id === dbInt.id);
        return fullIntegration ? { ...dbInt, icon: fullIntegration.icon } : dbInt;
    });

    return (
        <Card>
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Entegrasyonlar</h2>
                    <span className="text-sm font-semibold text-blue-500 group-hover:text-blue-400">Yönet →</span>
                </div>

                {hydratedIntegrations.length > 0 ? (
                    <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                            {hydratedIntegrations.slice(0, 4).map(integration => {
                                const Icon = integration.icon;
                                // Add a check to ensure Icon is not undefined before rendering
                                if (!Icon) return null; 
                                return (
                                    <a key={integration.id} href={integration.url} target="_blank" rel="noopener noreferrer">
                                        <div className="bg-gray-100 dark:bg-gray-800/50 p-2 rounded-full border-2 border-white dark:border-gray-900/30">
                                            <Icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{hydratedIntegrations.length} bağlı</span>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">Hiçbir entegrasyon bağlı değil.</p>
                )}
            </div>
        </Card>
    );
};

export default IntegrationsCard;