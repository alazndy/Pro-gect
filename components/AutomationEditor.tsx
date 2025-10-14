import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Automation, Integration, AutomationNode, Task } from '../types.ts';
import NodePalette from './NodePalette.tsx';
import AutomationNodeComponent from './AutomationNodeComponent.tsx';
import AutomationSettingsPanel from './AutomationSettingsPanel.tsx';
import { ALL_AVAILABLE_NODES } from '../constants.tsx';

interface AutomationEditorProps {
    automation: Automation;
    projectIntegrations: Integration[];
    onUpdate: (automationId: string, updatedAutomation: Automation) => void;
    onAddTasks: (tasks: Omit<Task, 'id'>[]) => void;
}

const AutomationEditor: React.FC<AutomationEditorProps> = ({ automation, projectIntegrations, onUpdate, onAddTasks }) => {
    const [nodes, setNodes] = useState<AutomationNode[]>(automation.nodes);
    const [edges, setEdges] = useState(automation.edges);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const editorRef = useRef<HTMLDivElement>(null);

    const handleUpdate = useCallback(() => {
        onUpdate(automation.id, { ...automation, nodes, edges });
    }, [automation, nodes, edges, onUpdate]);
    
    useEffect(() => {
        handleUpdate();
    }, [nodes, edges, handleUpdate]);


    const handleAddNode = (nodeTemplate: Omit<AutomationNode, 'id' | 'position'>) => {
        const newNode: AutomationNode = {
            ...nodeTemplate,
            id: `node-${Date.now()}`,
            position: { x: 100, y: 100 } // Default position
        };
        setNodes(currentNodes => [...currentNodes, newNode]);
    };

    const handleUpdateNodeData = (nodeId: string, data: any) => {
        setNodes(currentNodes => currentNodes.map(n => n.id === nodeId ? { ...n, data } : n));
    };

    const executeAction = async (node: AutomationNode) => {
        switch (node.name) {
            case 'AI Task Generator':
                const goal = node.data.goal;
                if (goal) {
                    const newTasks: Omit<Task, 'id'>[] = [
                        { title: `Research for '${goal}'`, completed: false, status: 'todo' },
                        { title: `Design for '${goal}'`, completed: false, status: 'todo' },
                        { title: `Implement '${goal}'`, completed: false, status: 'todo' },
                        { title: `Test '${goal}'`, completed: false, status: 'todo' },
                    ];
                    onAddTasks(newTasks);
                    alert(`Generated ${newTasks.length} tasks for goal: ${goal}`);
                }
                break;
            default:
                alert(`Action '${node.name}' is not implemented yet.`);
        }
    };

    const handleExecute = async () => {
        const triggerNode = nodes.find(n => n.type === 'trigger');
        if (!triggerNode) {
            alert("No trigger node found in the automation.");
            return;
        }

        let currentNode = triggerNode;
        while (currentNode) {
            const edge = edges.find(e => e.sourceNodeId === currentNode.id);
            if (!edge) break;

            const nextNode = nodes.find(n => n.id === edge.targetNodeId);
            if (!nextNode) break;

            if (nextNode.type === 'action') {
                await executeAction(nextNode);
            }
            currentNode = nextNode;
        }
    };

    const selectedNode = nodes.find(n => n.id === selectedNodeId);

    // This is a simplified edge rendering. A real implementation would use a library like react-flow.
    const renderedEdges = edges.map(edge => {
        const sourceNode = nodes.find(n => n.id === edge.sourceNodeId);
        const targetNode = nodes.find(n => n.id === edge.targetNodeId);
        if (!sourceNode || !targetNode) return null;

        const x1 = sourceNode.position.x + 192; // 192 is node width
        const y1 = sourceNode.position.y + 24; // 24 is half node height
        const x2 = targetNode.position.x;
        const y2 = targetNode.position.y + 24;
        
        return <path key={edge.id} d={`M ${x1} ${y1} C ${x1 + 50} ${y1}, ${x2 - 50} ${y2}, ${x2} ${y2}`} stroke="#9ca3af" strokeWidth="2" fill="none" />;
    });

    return (
        <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
            <div className="flex justify-end">
                <button 
                    onClick={handleExecute}
                    className="bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg px-4 py-2 transition-colors"
                >
                    Run Automation
                </button>
            </div>
            <div className="flex-1 flex space-x-4 overflow-hidden">
                <NodePalette availableNodes={ALL_AVAILABLE_NODES} onAddNode={handleAddNode} />
                <main className="flex-1 bg-gray-100/50 dark:bg-gray-900/50 rounded-lg relative overflow-auto" ref={editorRef}>
                    <svg className="absolute w-full h-full pointer-events-none">
                        {renderedEdges}
                    </svg>
                    {nodes.map(node => (
                        <div
                            key={node.id}
                            className="absolute cursor-grab"
                            style={{ top: node.position.y, left: node.position.x }}
                            onClick={() => setSelectedNodeId(node.id)}
                        >
                        <AutomationNodeComponent node={node} isSelected={selectedNodeId === node.id} />
                        </div>
                    ))}
                </main>
                {selectedNode && (
                    <AutomationSettingsPanel
                        selectedNode={selectedNode}
                        onUpdateNodeData={handleUpdateNodeData}
                        onClose={() => setSelectedNodeId(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default AutomationEditor;