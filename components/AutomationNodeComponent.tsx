import React from 'react';
import type { AutomationNode } from '../types';

interface AutomationNodeComponentProps {
    node: AutomationNode;
    isSelected: boolean;
}

const AutomationNodeComponent: React.FC<AutomationNodeComponentProps> = ({ node, isSelected }) => {
    return (
        <div
            className={`w-48 bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg shadow-md border-2 transition-all ${
                isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-300 dark:border-gray-600'
            }`}
        >
            <div className="flex items-center space-x-2">
                <node.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">{node.name}</h4>
            </div>
        </div>
    );
};

export default AutomationNodeComponent;
