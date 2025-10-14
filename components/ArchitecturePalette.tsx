import React from 'react';
import type { ArchitectureNode } from '../types';

interface ArchitecturePaletteProps {
    availableNodes: Omit<ArchitectureNode, 'id' | 'position'>[];
    onAddNode: (nodeTemplate: Omit<ArchitectureNode, 'id' | 'position'>) => void;
}

const DatabaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M8.25 21h7.5M8.25 3h7.5m-7.5 18h7.5M5.25 6h13.5m-13.5 9h13.5" /></svg> );
const ServerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3V7.5a3 3 0 013-3h13.5a3 3 0 013 3v3.75a3 3 0 01-3 3m-13.5 0h13.5" /></svg> );
const CloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-2.087-5.022 3.75 3.75 0 00-6.65-1.49l-.5 2.5a3.75 3.75 0 00-6.65 1.49v.195a4.5 4.5 0 004.5 4.5h.75" /></svg> );
const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg> );

const NODE_ICONS: { [key: string]: React.FC<any> } = {
    user: UserIcon,
    frontend: CloudIcon,
    api: ServerIcon,
    database: DatabaseIcon,
};

const ArchitecturePalette: React.FC<ArchitecturePaletteProps> = ({ availableNodes, onAddNode }) => {
    return (
        <aside className="w-64 bg-white/50 dark:bg-gray-900/30 p-4 border-r border-gray-200 dark:border-white/10 rounded-lg overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bileşenler</h3>
            <div className="space-y-2">
                {availableNodes.map((node, index) => {
                    const Icon = NODE_ICONS[node.type];
                    return (
                        <div
                            key={index}
                            onClick={() => onAddNode(node)}
                            className="bg-gray-100 dark:bg-gray-800/50 p-3 rounded-lg flex items-center space-x-3 cursor-pointer transition-all hover:bg-blue-500/10 dark:hover:bg-blue-500/20 hover:shadow-lg"
                        >
                            {Icon && <Icon className="w-6 h-6 text-gray-600 dark:text-gray-300 flex-shrink-0" />}
                            <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{node.name}</span>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
};

export default ArchitecturePalette;