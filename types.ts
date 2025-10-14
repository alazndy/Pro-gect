import React from 'react';

export type Page = 'projects' | 'dashboard' | 'tasks' | 'goals' | 'integrations' | 'documents' | 'automations' | 'architecture' | 'settings';

export type Role = 'Admin';

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface ProjectMember {
    userId: string;
    role: Role;
}

export interface Invitation {
    id: string;
    email: string;
    projectId: string;
    role: Role;
    status: 'pending' | 'accepted';
    inviterId: string;
}

export interface Integration {
  id: string;
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  url?: string;
}

export interface IntegrationCategory {
  name: string;
  integrations: Integration[];
}

export interface Expense {
    id: string;
    name: string;
    amount: number;
    type: 'subscription' | 'one-time';
}

export interface Budget {
    total: number;
    expenses: Expense[];
}

export interface Scope {
    inScope: string;
    outOfScope: string;
    deliverables: string;
}

export interface SmartGoals {
    specific: string;
    measurable: string;
    achievable: string;
    relevant: string;
    timeBound: string;
}

export interface Comment {
    id: string;
    content: string;
    author: User;
    createdAt: string;
}

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    status: 'todo' | 'in-progress' | 'done';
    description?: string;
    assignee?: User;
    dueDate?: string;
    startDate?: string;
    tags?: string[];
    comments?: Comment[];
    subtasks?: Task[];
}

export interface Document {
    id: string;
    name: string;
    type: 'pdf' | 'docx' | 'xlsx' | 'png' | 'jpg' | 'md';
    size: number; // in bytes
    uploadDate: string;
    url: string;
}

export interface AutomationNode {
    id: string;
    type: 'trigger' | 'action';
    name: string;
    group: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    position: { x: number; y: number };
    data: any;
}

export interface AutomationEdge {
    id: string;
    sourceNodeId: string;
    targetNodeId: string;
}

export interface Automation {
    id:string;
    name: string;
    nodes: AutomationNode[];
    edges: AutomationEdge[];
}

export interface AutomationTemplate {
    name: string;
    description: string;
    automation: Omit<Automation, 'id' | 'name'>;
}

export interface ArchitectureNode {
    id: string;
    type: string;
    name: string;
    position: { x: number, y: number };
    status: 'planned' | 'development' | 'deployed' | 'deprecated';
    data?: any;
}

export interface ArchitectureEdge {
    id: string;
    source: string;
    target: string;
}

export interface Architecture {
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  members: { [key: string]: Role };
  memberIds: string[];
  tasks: Task[];
  budget: Budget;
  scope: Scope;
  goals: SmartGoals;
  integrations: Integration[];
  architecture: Architecture;
  automations: Automation[];
  documents: Document[];
  platforms: {
    software: string[];
    hardware: string[];
  };
  aiAgentInstructions?: string;
  aiAgentOutput?: string;
}