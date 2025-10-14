
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import type { ArchitectureNode } from '../types';

// Re-importing icons as they are needed here
const DatabaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M8.25 21h7.5M8.25 3h7.5m-7.5 18h7.5M5.25 6h13.5m-13.5 9h13.5" /></svg> );
const ServerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3V7.5a3 3 0 013-3h13.5a3 3 0 013 3v3.75a3 3 0 01-3 3m-13.5 0h13.5" /></svg> );
const CloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-2.087-5.022 3.75 3.75 0 00-6.65-1.49l-.5 2.5a3.75 3.75 0 00-6.65 1.49v.195a4.5 4.5 0 004.5 4.5h.75" /></svg> );
const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg> );

const NODE_ICONS: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    user: UserIcon,
    frontend: CloudIcon,
    api: ServerIcon,
    database: DatabaseIcon,
};

const statusColors: { [key in ArchitectureNode['status']]: string } = {
    planned: 'border-gray-500',
    development: 'border-yellow-500',
    deployed: 'border-green-500',
    deprecated: 'border-red-500',
};

// Props will be passed by React Flow, including `data` and `selected`
const ArchitectureNodeComponent: React.FC<NodeProps<{ node: ArchitectureNode }>> = ({ data, selected }) => {
    const { node } = data;
    const Icon = NODE_ICONS[node.type] || CloudIcon;

    return (
        <div
            className={`w-36 h-36 bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg shadow-md border-2 transition-all flex flex-col items-center justify-center text-center ${
                selected ? 'border-blue-500 shadow-xl scale-105' : statusColors[node.status]
            }`}
        >
            <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-blue-500" />
            
            <Icon className="w-10 h-10 text-gray-700 dark:text-gray-300 mb-2" />
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate w-full">{node.name}</h4>
            
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-blue-500" />
        </div>
    );
};

export default ArchitectureNodeComponent;
