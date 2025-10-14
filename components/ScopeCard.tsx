

import React from 'react';
import Card from './Card.tsx';
// Fix: Removed .ts extension from import path.
import type { Scope } from '../types.ts';

interface ScopeCardProps {
    scope: Scope;
}

const ScopeCard: React.FC<ScopeCardProps> = ({ scope }) => {
    const renderList = (text: string) => (
        <ul className="list-disc list-inside space-y-1">
            {text.split('\n').map((item, index) => item.trim() && <li key={index}>{item.replace(/^- /, '')}</li>)}
        </ul>
    );

    return (
        <Card glowColor="blue">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Proje Kapsamı</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Kapsam Dahili (In-Scope)</h3>
                        <div className="text-sm text-gray-600 dark:text-gray-300 prose dark:prose-invert">
                            {renderList(scope.inScope)}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">Kapsam Dışı (Out-of-Scope)</h3>
                        <div className="text-sm text-gray-600 dark:text-gray-300 prose dark:prose-invert">
                            {renderList(scope.outOfScope)}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Teslimatlar (Deliverables)</h3>
                        <div className="text-sm text-gray-600 dark:text-gray-300 prose dark:prose-invert">
                           {renderList(scope.deliverables)}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ScopeCard;