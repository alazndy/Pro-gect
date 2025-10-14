
import React, { useMemo } from 'react';
// Fix: Removed file extensions from import paths.
import type { AutomationNode } from '../types.ts';

interface NodePaletteProps {
    availableNodes: Omit<AutomationNode, 'id' | 'position'>[];
    onAddNode: (nodeTemplate: Omit<AutomationNode, 'id' | 'position'>) => void;
}

const NodePalette: React.FC<NodePaletteProps> = ({ availableNodes, onAddNode }) => {
    const groupedNodes = useMemo(() => {
        return availableNodes.reduce((acc, node) => {
            const group = node.group || 'Diğer';
            if (!acc[group]) {
                acc[group] = [];
            }
            acc[group].push(node);
            return acc;
        }, {} as Record<string, Omit<AutomationNode, 'id' | 'position'>[]>);
    }, [availableNodes]);

    const groupOrder = ['General', 'Slack', 'GitHub'];
    const sortedGroupNames = Object.keys(groupedNodes).sort((a, b) => {
        const indexA = groupOrder.indexOf(a);
        const indexB = groupOrder.indexOf(b);
        if (indexA > -1 && indexB > -1) return indexA - indexB;
        if (indexA > -1) return -1;
        if (indexB > -1) return 1;
        return a.localeCompare(b);
    });

    return (
        <aside className="w-64 bg-white/50 dark:bg-gray-900/30 p-4 border-r border-gray-200 dark:border-white/10 rounded-lg overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Düğümler</h3>
            {sortedGroupNames.map(groupName => (
                <div key={groupName}>
                    <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400 mt-4 mb-2 px-1 capitalize">{groupName}</h4>
                    <div className="space-y-2">
                        {groupedNodes[groupName].map((node, index) => (
                            <div
                                key={index}
                                onClick={() => onAddNode(node)}
                                className="bg-gray-100 dark:bg-gray-800/50 p-3 rounded-lg flex items-center space-x-3 cursor-pointer transition-all hover:bg-blue-500/10 dark:hover:bg-blue-500/20 hover:shadow-lg"
                            >
                                <node.icon className="w-6 h-6 text-gray-600 dark:text-gray-300 flex-shrink-0" />
                                <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{node.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </aside>
    );
};

export default NodePalette;