import React from 'react';
import type { AutomationNode } from '../types';


interface AutomationSettingsPanelProps {
    selectedNode: AutomationNode | null;
    onUpdateNodeData: (nodeId: string, data: { [key: string]: string }) => void;
    onClose: () => void;
}

const AutomationSettingsPanel: React.FC<AutomationSettingsPanelProps> = ({ selectedNode, onUpdateNodeData, onClose }) => {
    if (!selectedNode) {
        return null;
    }

    const handleDataChange = (key: string, value: string) => {
        onUpdateNodeData(selectedNode.id, { ...selectedNode.data, [key]: value });
    };

    return (
        <aside className="w-80 bg-white/50 dark:bg-gray-900/30 p-4 border-l border-gray-200 dark:border-white/10 rounded-lg flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Settings: {selectedNode.name}</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">&times;</button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4">
                {selectedNode.data && Object.keys(selectedNode.data).map(key => (
                    <div key={key}>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">{key}</label>
                        <input
                            type="text"
                            value={selectedNode.data![key]}
                            onChange={(e) => handleDataChange(key, e.target.value)}
                            className="mt-1 block w-full bg-gray-200/60 dark:bg-gray-800/60 border border-gray-400 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                ))}
                 {(!selectedNode.data || Object.keys(selectedNode.data).length === 0) && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">This node has no configurable settings.</p>
                 )}
            </div>
        </aside>
    );
};

export default AutomationSettingsPanel;
