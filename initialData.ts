import type { Project } from './types.ts';
import { USERS, ALL_INTEGRATIONS } from './constants.tsx';

export const proGectProject: Omit<Project, 'id' | 'members' | 'memberIds' | 'adminId'> = {
    name: 'Pro-Gect Meta-Project',
    description: 'This project tracks the development of the Pro-Gect application itself. It includes the architecture, tasks, and automations used to build this tool.',
    tasks: [
        {
            id: 'meta-task-1',
            title: 'Setup Core Application Shell',
            completed: true,
            status: 'done',
            subtasks: [
                { id: 'sub-1-1', title: 'Initialize React with Vite and TypeScript', completed: true, status: 'done' },
                { id: 'sub-1-2', title: 'Setup Firebase for Authentication and Firestore', completed: true, status: 'done' },
                { id: 'sub-1-3', title: 'Implement basic UI layout (Sidebar, Header)', completed: true, status: 'done' },
            ]
        },
        {
            id: 'meta-task-2',
            title: 'Implement ESLint for Code Quality',
            completed: true,
            status: 'done',
        },
        {
            id: 'meta-task-3',
            title: 'Develop Node-Based Automation System',
            completed: true,
            status: 'done',
            subtasks: [
                { id: 'sub-3-1', title: 'Integrate n8n as a backend service', completed: true, status: 'done' },
                { id: 'sub-3-2', title: 'Integrate Node-RED as a backend service', completed: true, status: 'done' },
                { id: 'sub-3-3', title: 'Create tabbed view in UI to switch between n8n and Node-RED', completed: true, status: 'done' },
            ]
        },
        {
            id: 'meta-task-4',
            title: 'Create API Server for Data Exchange',
            completed: true,
            status: 'done',
            subtasks: [
                { id: 'sub-4-1', title: 'Setup Express.js server with TypeScript', completed: true, status: 'done' },
                { id: 'sub-4-2', title: 'Connect to Firestore using Firebase Admin SDK', completed: true, status: 'done' },
                { id: 'sub-4-3', title: 'Create endpoints for reading projects and tasks', completed: true, status: 'done' },
            ]
        },
        {
            id: 'meta-task-5',
            title: 'Implement Architecture View with React Flow',
            completed: true,
            status: 'done',
            subtasks: [
                { id: 'sub-5-1', title: 'Replace manual SVG with React Flow canvas', completed: true, status: 'done' },
                { id: 'sub-5-2', title: 'Create custom node component', completed: true, status: 'done' },
                { id: 'sub-5-3', title: 'Improve edge mechanics (smoothstep, arrows, deletion)', completed: true, status: 'done' },
            ]
        },
        {
            id: 'meta-task-6',
            title: 'Enhance Automation & API',
            completed: false,
            status: 'in-progress',
            subtasks: [
                { id: 'sub-6-1', title: 'Implement user-based authentication for API', completed: false, status: 'todo' },
                { id: 'sub-6-2', title: 'Create custom n8n/Node-RED nodes for the API', completed: false, status: 'todo' },
            ]
        }
    ],
    budget: {
        total: 5000,
        expenses: [
            { id: 'exp-meta-1', name: 'Vercel Hosting', amount: 20, type: 'subscription' },
            { id: 'exp-meta-2', name: 'Firebase Spark Plan', amount: 0, type: 'subscription' },
            { id: 'exp-meta-3', name: 'n8n Cloud (Future)', amount: 100, type: 'subscription' },
        ]
    },
    scope: {
        inScope: "- Core project management features\n- n8n and Node-RED integration\n- React Flow for architecture visualization\n- Secure API for data access",
        outOfScope: "- Real-time collaboration features (for now)\n- SSO for n8n/Node-RED",
        deliverables: "- A fully functional project management and automation tool."
    },
    goals: {
        specific: 'Integrate powerful, node-based automation tools (n8n, Node-RED) into a project management interface, allowing them to interact with project data via a secure API.',
        measurable: 'Successfully create, read, and update project tasks from both n8n and Node-RED workflows via the API.',
        achievable: 'The core components (React frontend, Firebase, API server, and automation tools) are all established technologies that can be integrated.',
        relevant: 'This provides a highly flexible and powerful automation capability that goes far beyond simple, hard-coded actions.',
        timeBound: 'Core integration to be completed within the current development session.'
    },
    integrations: [
        ALL_INTEGRATIONS.find(i => i.id === 'int-github')!,
        ALL_INTEGRATIONS.find(i => i.id === 'int-vscode')!,
        ALL_INTEGRATIONS.find(i => i.id === 'int-fb-database')!,
    ],
    architecture: {
        nodes: [
            { id: 'arch-user', type: 'user', name: 'Developer', position: { x: 50, y: 250 }, status: 'deployed' },
            { id: 'arch-frontend', type: 'frontend', name: 'React UI', position: { x: 250, y: 150 }, status: 'deployed' },
            { id: 'arch-api', type: 'api', name: 'API Server', position: { x: 500, y: 250 }, status: 'deployed' },
            { id: 'arch-db', type: 'database', name: 'Firestore DB', position: { x: 750, y: 250 }, status: 'deployed' },
            { id: 'arch-n8n', type: 'api', name: 'n8n Backend', position: { x: 250, y: 350 }, status: 'deployed' },
            { id: 'arch-nodered', type: 'api', name: 'Node-RED Backend', position: { x: 250, y: 450 }, status: 'deployed' },
        ],
        edges: [
            { id: 'e-user-front', source: 'arch-user', target: 'arch-frontend' },
            { id: 'e-front-api', source: 'arch-frontend', target: 'arch-api' },
            { id: 'e-api-db', source: 'arch-api', target: 'arch-db' },
            { id: 'e-front-n8n', source: 'arch-frontend', target: 'arch-n8n' },
            { id: 'e-front-nodered', source: 'arch-frontend', target: 'arch-nodered' },
            { id: 'e-n8n-api', source: 'arch-n8n', target: 'arch-api' },
            { id: 'e-nodered-api', source: 'arch-nodered', target: 'arch-api' },
        ],
    },
    automations: [],
    documents: [
        { id: 'doc-meta-1', name: 'API_Design_v1.md', type: 'md', size: 1024 * 15, uploadDate: new Date().toISOString(), url: '#' },
        { id: 'doc-meta-2', name: 'Component_Library.pdf', type: 'pdf', size: 1024 * 800, uploadDate: new Date().toISOString(), url: '#' },
    ],
    platforms: {
        software: ['web'],
        hardware: ['pc']
    }
};

// Keep the old initialProject for compatibility if needed elsewhere, but proGectProject is the new focus.
export const initialProject: Project = {
    id: 'proj-fusion-ai',
    name: 'Fusion AI Dashboard',
    description: 'An integrated dashboard for AI project management, combining tasks, budget, architecture, and automations into a single, cohesive interface.',
    adminId: 'u1',
    members: {
        'u1': 'Admin',
        'u2': 'Admin',
        'u3': 'Admin',
        'u4': 'Admin'
    },
    memberIds: ['u1', 'u2', 'u3', 'u4'],
    tasks: [],
    budget: { total: 75000, expenses: [] },
    scope: { inScope: "", outOfScope: "", deliverables: "" },
    goals: { specific: '', measurable: '', achievable: '', relevant: '', timeBound: '' },
    integrations: [],
    architecture: { nodes: [], edges: [] },
    automations: [],
    documents: [],
    platforms: { software: ['web'], hardware: ['pc'] }
};

export const initialProjects: Project[] = [initialProject];