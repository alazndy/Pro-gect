import React from 'react';
import type { ArchitectureNode, ArchitectureEdge } from '../types';

interface ArchitectureSettingsPanelProps {
    selectedNode: ArchitectureNode;
    allNodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
    onUpdateNode: (nodeId: string, updates: Partial<ArchitectureNode>) => void;
    onDeleteNode: (nodeId: string) => void;
    onDeleteEdge: (edgeId: string) => void;
    onClose: () => void;
}

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.201-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
);

const ArchitectureSettingsPanel: React.FC<ArchitectureSettingsPanelProps> = ({ selectedNode, allNodes, edges, onUpdateNode, onDeleteNode, onDeleteEdge, onClose }) => {

    const handleDataChange = (key: string, value: string) => {
        onUpdateNode(selectedNode.id, { data: { ...selectedNode.data, [key]: value } });
    };

    const incomingEdges = edges.filter(e => e.target === selectedNode.id);
    const outgoingEdges = edges.filter(e => e.source === selectedNode.id);

    return (
        <aside className="w-80 bg-white/50 dark:bg-gray-900/30 p-4 border-l border-gray-200 dark:border-white/10 rounded-lg flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ayarlar</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl">&times;</button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Bileşen Adı</label>
                    <input type="text" value={selectedNode.name} onChange={(e) => onUpdateNode(selectedNode.id, { name: e.target.value })} className="mt-1 block w-full bg-gray-200/60 dark:bg-gray-800/60 border border-gray-400 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Durum</label>
                    <select value={selectedNode.status} onChange={(e) => onUpdateNode(selectedNode.id, { status: e.target.value as ArchitectureNode['status'] })} className="mt-1 block w-full bg-gray-200/60 dark:bg-gray-800/60 border border-gray-400 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option value="planned">Planlandı</option>
                        <option value="development">Geliştiriliyor</option>
                        <option value="deployed">Yayında</option>
                        <option value="deprecated">Kullanımdan Kaldırıldı</option>
                    </select>
                </div>

                {selectedNode.data && Object.keys(selectedNode.data).map(key => (
                    <div key={key}>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                        <input type="text" value={selectedNode.data![key]} onChange={(e) => handleDataChange(key, e.target.value)} className="mt-1 block w-full bg-gray-200/60 dark:bg-gray-800/60 border border-gray-400 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                ))}

                <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mt-4 mb-2">Bağlantılar</h4>
                    <div className="text-xs space-y-2">
                        <h5 className="font-medium text-gray-500 dark:text-gray-400">Gelen ({incomingEdges.length})</h5>
                        {incomingEdges.map(edge => {
                            const source = allNodes.find(n => n.id === edge.source);
                            return <div key={edge.id} className="flex justify-between items-center bg-gray-200/50 dark:bg-gray-800/50 p-1.5 rounded-md"><span>&larr; {source?.name || 'Bilinmeyen'}</span><button onClick={() => onDeleteEdge(edge.id)} className="text-gray-400 hover:text-red-500 p-0.5"><TrashIcon className="w-3 h-3"/></button></div>
                        })}
                        <h5 className="font-medium text-gray-500 dark:text-gray-400">Giden ({outgoingEdges.length})</h5>
                        {outgoingEdges.map(edge => {
                            const target = allNodes.find(n => n.id === edge.target);
                            return <div key={edge.id} className="flex justify-between items-center bg-gray-200/50 dark:bg-gray-800/50 p-1.5 rounded-md"><span>&rarr; {target?.name || 'Bilinmeyen'}</span><button onClick={() => onDeleteEdge(edge.id)} className="text-gray-400 hover:text-red-500 p-0.5"><TrashIcon className="w-3 h-3"/></button></div>
                        })}
                    </div>
                </div>

            </div>
             <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button onClick={() => onDeleteNode(selectedNode.id)} className="w-full bg-red-500/20 text-red-400 hover:bg-red-500/40 font-semibold rounded-lg px-4 py-2 transition-colors flex items-center justify-center space-x-2">
                    <TrashIcon className="w-4 h-4"/>
                    <span>Bileşeni Sil</span>
                </button>
            </div>
        </aside>
    );
};

export default ArchitectureSettingsPanel;