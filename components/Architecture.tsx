import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Project, ArchitectureNode, ArchitectureEdge } from '../types';
import ArchitecturePalette from './ArchitecturePalette';
import ArchitectureNodeComponent from './ArchitectureNodeComponent';
import ArchitectureSettingsPanel from './ArchitectureSettingsPanel';

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

const AVAILABLE_NODES: Omit<ArchitectureNode, 'id' | 'position'>[] = [
    { type: 'user', name: 'User', status: 'planned', data: { description: 'Represents a user of the system.' } },
    { type: 'frontend', name: 'Frontend App', status: 'planned', data: { technology: 'React', hosting: 'Vercel' } },
    { type: 'api', name: 'API / Backend', status: 'planned', data: { technology: 'Node.js', provider: 'AWS Lambda' } },
    { type: 'database', name: 'Database', status: 'planned', data: { type: 'PostgreSQL', provider: 'RDS' } },
];

interface ArchitectureProps {
    project: Project;
    onUpdateProject: (updatedProject: Project) => void;
}

const Architecture: React.FC<ArchitectureProps> = ({ project, onUpdateProject }) => {
    const [nodes, setNodes] = useState<ArchitectureNode[]>(project.architecture.nodes);
    const [edges, setEdges] = useState<ArchitectureEdge[]>(project.architecture.edges);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [draggingInfo, setDraggingInfo] = useState<{ id: string; offset: { x: number; y: number } } | null>(null);
    const [connectingInfo, setConnectingInfo] = useState<{ sourceId: string; handlePos: { x: number; y: number } } | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        onUpdateProject({ ...project, architecture: { nodes, edges } });
    }, [nodes, edges]);

    const handleAddNode = (nodeTemplate: Omit<ArchitectureNode, 'id' | 'position'>) => {
        const newNode: ArchitectureNode = {
            ...nodeTemplate,
            id: `arch-node-${Date.now()}`,
            position: { x: 100, y: 100 }
        };
        setNodes(currentNodes => [...currentNodes, newNode]);
    };

    const handleUpdateNode = (nodeId: string, updates: Partial<ArchitectureNode>) => {
        setNodes(currentNodes => currentNodes.map(n => n.id === nodeId ? { ...n, ...updates } : n));
    };

    const handleDeleteNode = (nodeId: string) => {
        setNodes(nodes.filter(n => n.id !== nodeId));
        setEdges(edges.filter(e => e.source !== nodeId && e.target !== nodeId));
        setSelectedNodeId(null);
    }
    
    const handleDeleteEdge = (edgeId: string) => {
        setEdges(edges.filter(e => e.id !== edgeId));
    }

    const handleMouseDownOnNode = (e: React.MouseEvent, nodeId: string) => {
        if (e.button !== 0) return;
        const node = nodes.find(n => n.id === nodeId);
        if (node && editorRef.current) {
            const editorRect = editorRef.current.getBoundingClientRect();
            setDraggingInfo({
                id: nodeId,
                offset: {
                    x: e.clientX - node.position.x - editorRect.left,
                    y: e.clientY - node.position.y - editorRect.top,
                }
            });
        }
    };
    
    const handleMouseDownOnHandle = (e: React.MouseEvent, sourceId: string, handlePos: {x: number, y: number}) => {
        e.stopPropagation();
        setConnectingInfo({ sourceId, handlePos });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (editorRef.current) {
            const editorRect = editorRef.current.getBoundingClientRect();
            setMousePosition({ x: e.clientX - editorRect.left, y: e.clientY - editorRect.top });
        }
        
        if (draggingInfo) {
            setNodes(currentNodes =>
                currentNodes.map(n =>
                    n.id === draggingInfo.id
                        ? { ...n, position: { x: mousePosition.x - draggingInfo.offset.x, y: mousePosition.y - draggingInfo.offset.y } }
                        : n
                )
            );
        }
    };

    const handleMouseUp = () => {
        setDraggingInfo(null);
        setConnectingInfo(null);
    };
    
    const handleMouseUpOnHandle = (e: React.MouseEvent, targetId: string) => {
        e.stopPropagation();
        if (connectingInfo && connectingInfo.sourceId !== targetId) {
            const newEdge: ArchitectureEdge = {
                id: `edge-${Date.now()}`,
                source: connectingInfo.sourceId,
                target: targetId,
            };
            setEdges(currentEdges => [...currentEdges, newEdge]);
        }
        setConnectingInfo(null);
    };

    const selectedNode = nodes.find(n => n.id === selectedNodeId);

    const handleExport = () => {
        const dataStr = JSON.stringify({ nodes, edges }, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = 'architecture.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
    
    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const result = e.target?.result;
                if (typeof result !== 'string') throw new Error("File is not text");
                const { nodes: importedNodes, edges: importedEdges } = JSON.parse(result);
                if (Array.isArray(importedNodes) && Array.isArray(importedEdges)) {
                    setNodes(importedNodes);
                    setEdges(importedEdges);
                    setSelectedNodeId(null);
                } else {
                    alert("Invalid JSON structure.");
                }
            } catch (error) {
                alert("Failed to parse JSON file.");
            }
        };
        reader.readAsText(file);
        event.target.value = ''; // Reset file input
    };

    return (
        <div className="h-full flex flex-col space-y-4">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Sistem Mimarisi</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Projenizin altyapısını ve servislerini görselleştirin ve yönetin.</p>
                </div>
                <div className="flex space-x-2">
                    <input type="file" ref={fileInputRef} onChange={handleImport} accept=".json" className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-lg px-4 py-2 transition-colors">Import JSON</button>
                    <button onClick={handleExport} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 transition-colors">Export JSON</button>
                </div>
            </header>
            <div className="flex-1 flex space-x-4 overflow-hidden">
                <ArchitecturePalette availableNodes={AVAILABLE_NODES} onAddNode={handleAddNode} />
                <main className="flex-1 bg-gray-100/50 dark:bg-gray-900/50 rounded-lg relative overflow-hidden" ref={editorRef} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
                    <svg className="absolute w-full h-full pointer-events-none">
                        {edges.map(edge => {
                            const sourceNode = nodes.find(n => n.id === edge.source);
                            const targetNode = nodes.find(n => n.id === edge.target);
                            if (!sourceNode || !targetNode) return null;
                            const x1 = sourceNode.position.x + 72, y1 = sourceNode.position.y + 72;
                            const x2 = targetNode.position.x + 72, y2 = targetNode.position.y + 72;
                            return <line key={edge.id} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)" />;
                        })}
                        {connectingInfo && (
                            <line x1={connectingInfo.handlePos.x} y1={connectingInfo.handlePos.y} x2={mousePosition.x} y2={mousePosition.y} stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
                        )}
                        <defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" /></marker></defs>
                    </svg>
                    {nodes.map(node => (
                       <ArchitectureNodeComponent
                            key={node.id}
                            node={node}
                            isSelected={selectedNodeId === node.id}
                            icon={NODE_ICONS[node.type]}
                            onNodeMouseDown={(e) => handleMouseDownOnNode(e, node.id)}
                            onNodeClick={() => setSelectedNodeId(node.id)}
                            onHandleMouseDown={handleMouseDownOnHandle}
                            onHandleMouseUp={(e) => handleMouseUpOnHandle(e, node.id)}
                       />
                    ))}
                </main>
                {selectedNode && (
                    <ArchitectureSettingsPanel
                        selectedNode={selectedNode}
                        allNodes={nodes}
                        edges={edges}
                        onUpdateNode={handleUpdateNode}
                        onDeleteNode={handleDeleteNode}
                        onDeleteEdge={handleDeleteEdge}
                        onClose={() => setSelectedNodeId(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default Architecture;