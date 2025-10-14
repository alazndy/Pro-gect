
import type { Project } from './types.ts';
import { USERS, ALL_INTEGRATIONS } from './constants.tsx';

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
    tasks: [
        {
            id: 'task-1',
            title: 'Setup project structure',
            completed: true,
            status: 'done',
            assignee: USERS[1],
            description: 'Initialize the monorepo, configure build tools, and set up CI/CD pipeline.',
            startDate: '2023-10-01T09:00:00Z',
            dueDate: '2023-10-03T17:00:00Z',
            tags: ['setup', 'devops'],
            comments: [
                { id: 'c1', author: USERS[1], content: 'Initial setup complete.', createdAt: '2023-10-02T14:00:00Z' }
            ],
            subtasks: [
                { id: 'sub-1-1', title: 'Initialize Git repo', completed: true, status: 'done', },
                { id: 'sub-1-2', title: 'Configure ESLint and Prettier', completed: true, status: 'done', },
            ]
        },
        {
            id: 'task-2',
            title: 'Design UI/UX mockups',
            completed: true,
            status: 'done',
            assignee: USERS[2],
            description: 'Create high-fidelity mockups for all main screens in Figma.',
            startDate: '2023-10-04T09:00:00Z',
            dueDate: '2023-10-10T17:00:00Z',
            tags: ['design', 'ui/ux'],
            comments: [],
            subtasks: []
        },
        {
            id: 'task-3',
            title: 'Develop Dashboard component',
            completed: false,
            status: 'in-progress',
            assignee: USERS[0],
            description: 'Build the main dashboard view with all summary cards.',
            startDate: '2023-10-11T09:00:00Z',
            dueDate: '2023-10-18T17:00:00Z',
            tags: ['frontend', 'react'],
            comments: [],
            subtasks: [
                 { id: 'sub-3-1', title: 'Create TaskCard component', completed: true, status: 'done', },
                 { id: 'sub-3-2', title: 'Create BudgetCard component', completed: false, status: 'in-progress', },
            ]
        },
        {
            id: 'task-4',
            title: 'API integration for tasks',
            completed: false,
            status: 'todo',
            assignee: USERS[3],
            description: 'Connect the task management UI to the backend API.',
            startDate: '2023-10-19T09:00:00Z',
            dueDate: '2023-10-25T17:00:00Z',
            tags: ['backend', 'api'],
            comments: [],
            subtasks: []
        }
    ],
    budget: {
        total: 75000,
        expenses: [
            { id: 'exp1', name: 'Figma Subscription', amount: 150, type: 'subscription' },
            { id: 'exp2', name: 'VSCode Server Hosting', amount: 250, type: 'subscription' },
            { id: 'exp3', name: 'User testing participant fees', amount: 1000, type: 'one-time' },
        ]
    },
    scope: {
        inScope: "- Real-time project dashboard\n- Task management with subtasks\n- Budget tracking\n- System architecture visualization",
        outOfScope: "- Mobile application\n- User-level permissions beyond admin/member\n- Direct code editing capabilities",
        deliverables: "- Fully functional web application\n- Source code repository\n- Deployment scripts"
    },
    goals: {
        specific: 'Launch a functional MVP of the Fusion AI Dashboard with core features (dashboard, tasks, budget, architecture).',
        measurable: 'Achieve 100% completion of all tasks tagged as "MVP". Onboard at least 3 internal teams for beta testing.',
        achievable: 'With a team of 4 dedicated members and a 3-month timeline, the core features are well-defined and can be implemented.',
        relevant: 'This project directly addresses the need for a unified project management tool, improving team efficiency and visibility.',
        timeBound: 'The MVP should be ready for internal beta testing by the end of the quarter.'
    },
    integrations: [
        ALL_INTEGRATIONS.find(i => i.id === 'int-slack')!,
        ALL_INTEGRATIONS.find(i => i.id === 'int-github')!,
        ALL_INTEGRATIONS.find(i => i.id === 'int-figma')!,
    ],
    architecture: {
        nodes: [
            { id: 'arch-user', type: 'user', name: 'Web User', position: { x: 50, y: 150 }, status: 'deployed', data: { description: 'Uses the web application' } },
            { id: 'arch-frontend', type: 'frontend', name: 'React SPA', position: { x: 250, y: 150 }, status: 'deployed', data: { technology: 'React, Vite', hosting: 'Vercel' } },
            { id: 'arch-api', type: 'api', name: 'Node.js API', position: { x: 500, y: 150 }, status: 'development', data: { technology: 'Node.js, Express', provider: 'AWS Lambda' } },
            { id: 'arch-db', type: 'database', name: 'PostgreSQL DB', position: { x: 750, y: 150 }, status: 'planned', data: { type: 'PostgreSQL', provider: 'AWS RDS' } },
        ],
        edges: [
            { id: 'e-user-front', source: 'arch-user', target: 'arch-frontend' },
            { id: 'e-front-api', source: 'arch-frontend', target: 'arch-api' },
            { id: 'e-api-db', source: 'arch-api', target: 'arch-db' },
        ],
    },
    automations: [],
    documents: [
        { id: 'doc1', name: 'Project Brief.pdf', type: 'pdf', size: 1024 * 300, uploadDate: '2023-10-01T10:00:00Z', url: '#' },
        { id: 'doc2', name: 'UI Mockups.png', type: 'png', size: 1024 * 1200, uploadDate: '2023-10-10T16:00:00Z', url: '#' },
    ],
    platforms: {
        software: ['web', 'windows', 'mac'],
        hardware: ['pc']
    }
};

export const initialProjects: Project[] = [initialProject];