import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Automation, AutomationNode, Task } from '../types.ts';
import NodePalette from './NodePalette.tsx';
import AutomationNodeComponent from './AutomationNodeComponent.tsx';
import AutomationSettingsPanel from './AutomationSettingsPanel.tsx';
import { ALL_AVAILABLE_NODES } from '../constants.tsx';
import model from '../gemini.ts'; // Import the Gemini model

interface AutomationEditorProps {
    automation: Automation;
    
    onUpdate: (automationId: string, updatedAutomation: Automation) => void;
    onAddTasks: (tasks: Omit<Task, 'id'>[]) => void;
}

const AutomationEditor: React.FC<AutomationEditorProps> = ({ automation, onUpdate, onAddTasks }) => {
    const [nodes, setNodes] = useState<AutomationNode[]>(automation.nodes);
    const [edges] = useState(automation.edges);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
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

    const handleUpdateNodeData = (nodeId: string, data: { [key: string]: string }) => {
        setNodes(currentNodes => currentNodes.map(n => n.id === nodeId ? { ...n, data } : n));
    };

    const executeAction = async (node: AutomationNode) => {
        setIsLoading(true);
        try {
            switch (node.name) {
                case 'AI Task Generator': {
                    const goal = node.data.goal;
                    if (goal) {
                        const prompt = `Based on the goal "${goal}", generate a list of tasks to achieve it. Return the tasks as a JSON array of objects, where each object has a "title" (string) and "status" (string, e.g., 'todo'). Example: [{"title": "First task", "status": "todo"}, {"title": "Second task", "status": "todo"}]`;
                        
                        const result = await model.generateContent(prompt);
                        const response = await result.response;
                        const text = response.text();
                        
                        // Clean the response to get only the JSON part
                        const jsonString = text.replace(/```json|```/g, '').trim();
                        
                        const newTasks = JSON.parse(jsonString);
                        onAddTasks(newTasks.map((task: { title: string; status: string }) => ({ ...task, completed: false })));
                        alert(`Generated ${newTasks.length} tasks for goal: ${goal}`);
                    } else {
                        alert("Please provide a goal for the AI Task Generator.");
                    }
                    break;
                }
                default:
                    alert(`Action '${node.name}' is not implemented yet.`);
            }
        } catch (error) {
            console.error("Error executing action:", error);
            alert("Failed to execute action. Check the console for details.");
        } finally {
            setIsLoading(false);
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
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg px-4 py-2 transition-colors disabled:opacity-50"
                >
                    {isLoading ? 'Running...' : 'Run Automation'}
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