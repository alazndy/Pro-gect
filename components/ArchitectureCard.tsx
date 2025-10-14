
import React from 'react';
import type { Architecture } from '../types.ts';
import Card from './Card.tsx';

interface ArchitectureCardProps {
    architecture: Architecture;
}

const ArchitectureCard: React.FC<ArchitectureCardProps> = ({ architecture }) => {
    const nodeCount = architecture.nodes.length;
    const edgeCount = architecture.edges.length;

    return (
        <Card>
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sistem Mimarisi</h2>
                    <span className="text-sm font-semibold text-blue-500 group-hover:text-blue-400">Diyagramı Görüntüle →</span>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="text-center">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{nodeCount}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Bileşen</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{edgeCount}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Bağlantı</p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ArchitectureCard;