
import React from 'react';
// Fix: Removed .ts extension from import path.
import type { Integration } from '../types.ts';
import Card from './Card.tsx';

interface IntegrationsCardProps {
  integrations: Integration[];
}

const IntegrationsCard: React.FC<IntegrationsCardProps> = ({ integrations }) => {
    return (
        <Card>
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Entegrasyonlar</h2>
                    <span className="text-sm font-semibold text-blue-500 group-hover:text-blue-400">Yönet →</span>
                </div>

                {integrations.length > 0 ? (
                    <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                            {integrations.slice(0, 4).map(integration => (
                                <a key={integration.id} href={integration.url} target="_blank" rel="noopener noreferrer">
                                    <div className="bg-gray-100 dark:bg-gray-800/50 p-2 rounded-full border-2 border-white dark:border-gray-900/30">
                                        <integration.icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                                    </div>
                                </a>
                            ))}
                        </div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{integrations.length} bağlı</span>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">Hiçbir entegrasyon bağlı değil.</p>
                )}
            </div>
        </Card>
    );
};

export default IntegrationsCard;