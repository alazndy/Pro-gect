import React from 'react';
import type { ArchitectureNode } from '../types';

interface ArchitectureNodeComponentProps {
    node: ArchitectureNode;
    isSelected: boolean;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    onNodeMouseDown: (e: React.MouseEvent) => void;
    onNodeClick: (e: React.MouseEvent) => void;
    onHandleMouseDown: (e: React.MouseEvent, sourceId: string, handlePos: { x: number; y: number }) => void;
    onHandleMouseUp: (e: React.MouseEvent, targetId: string) => void;
}

const statusColors: { [key in ArchitectureNode['status']]: string } = {
    planned: 'border-gray-500',
    development: 'border-yellow-500',
    deployed: 'border-green-500',
    deprecated: 'border-red-500',
};

const Handle: React.FC<{
    position: { top?: string; left?: string; right?: string; bottom?: string; };
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseUp: (e: React.MouseEvent) => void;
}> = ({ position, onMouseDown, onMouseUp }) => (
    <div
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        className="absolute w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
        style={position}
    />
);


const ArchitectureNodeComponent: React.FC<ArchitectureNodeComponentProps> = ({
    node, isSelected, icon: Icon, onNodeMouseDown, onNodeClick, onHandleMouseDown, onHandleMouseUp
}) => {
    
    const getHandlePosition = (pos: 'top' | 'right' | 'bottom' | 'left') => {
        const nodeSize = 144; // w-36, h-36
        switch(pos) {
            case 'top': return { x: node.position.x + nodeSize / 2, y: node.position.y };
            case 'right': return { x: node.position.x + nodeSize, y: node.position.y + nodeSize / 2 };
            case 'bottom': return { x: node.position.x + nodeSize / 2, y: node.position.y + nodeSize };
            case 'left': return { x: node.position.x, y: node.position.y + nodeSize / 2 };
        }
    }

    return (
        <div
            onMouseDown={onNodeMouseDown}
            onClick={onNodeClick}
            style={{ top: node.position.y, left: node.position.x }}
            className={`absolute w-36 h-36 bg-white/70 dark:bg-gray-800/70 p-4 rounded-lg shadow-md border-2 transition-all flex flex-col items-center justify-center text-center cursor-grab ${
                isSelected ? 'border-blue-500 shadow-xl scale-105' : statusColors[node.status]
            }`}
        >
            <Icon className="w-10 h-10 text-gray-700 dark:text-gray-300 mb-2" />
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate w-full">{node.name}</h4>
            
            {isSelected && (
                <>
                    <Handle position={{ top: '0px', left: '50%' }} onMouseDown={(e) => onHandleMouseDown(e, node.id, getHandlePosition('top'))} onMouseUp={(e) => onHandleMouseUp(e, node.id)} />
                    <Handle position={{ top: '50%', right: '-14px' }} onMouseDown={(e) => onHandleMouseDown(e, node.id, getHandlePosition('right'))} onMouseUp={(e) => onHandleMouseUp(e, node.id)} />
                    <Handle position={{ bottom: '-14px', left: '50%' }} onMouseDown={(e) => onHandleMouseDown(e, node.id, getHandlePosition('bottom'))} onMouseUp={(e) => onHandleMouseUp(e, node.id)} />
                    <Handle position={{ top: '50%', left: '0px' }} onMouseDown={(e) => onHandleMouseDown(e, node.id, getHandlePosition('left'))} onMouseUp={(e) => onHandleMouseUp(e, node.id)} />
                </>
            )}
        </div>
    );
};

export default ArchitectureNodeComponent;