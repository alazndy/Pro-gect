
import React, { useCallback } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    Node,
    Edge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    NodeTypes,
    MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import type { Project, ArchitectureEdge as ArchEdgeType } from '../types';
import ArchitectureNodeComponent from './ArchitectureNodeComponent';

interface ArchitectureProps {
    project: Project;
    onUpdateProject: (updatedProject: Project) => void;
}

const nodeTypes: NodeTypes = {
    custom: ArchitectureNodeComponent,
};

const Architecture: React.FC<ArchitectureProps> = ({ project, onUpdateProject }) => {
    const { nodes: archNodes, edges: archEdges } = project.architecture;

    const flowNodes: Node[] = archNodes.map(n => ({
        id: n.id,
        type: 'custom',
        position: n.position,
        data: { node: n },
    }));

    const flowEdges: Edge[] = archEdges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target,
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    }));

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => {
            const updatedFlowNodes = applyNodeChanges(changes, flowNodes);
            const updatedArchNodes = updatedFlowNodes.map(flowNode => ({
                ...flowNode.data.node,
                position: flowNode.position,
            }));
            onUpdateProject({ ...project, architecture: { ...project.architecture, nodes: updatedArchNodes } });
        },
        [flowNodes, onUpdateProject, project]
    );

    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => {
            const updatedEdges = applyEdgeChanges(changes, flowEdges);
            const updatedArchEdges = updatedEdges.map(({ id, source, target }) => ({ id, source, target }));
            onUpdateProject({ ...project, architecture: { ...project.architecture, edges: updatedArchEdges } });
        },
        [flowEdges, onUpdateProject, project]
    );

    const onConnect: OnConnect = useCallback(
        (connection) => {
            const newEdge: Edge = {
                id: `edge-${Date.now()}`,
                ...connection,
                type: 'smoothstep',
                markerEnd: { type: MarkerType.ArrowClosed },
            };
            const updatedEdges = addEdge(newEdge, flowEdges);
            const updatedArchEdges = updatedEdges.map(({ id, source, target }) => ({ id, source, target }));
            onUpdateProject({ ...project, architecture: { ...project.architecture, edges: updatedArchEdges } });
        },
        [flowEdges, onUpdateProject, project]
    );

    return (
        <div className="h-[80vh] w-full">
            <ReactFlow
                nodes={flowNodes}
                edges={flowEdges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default Architecture;
