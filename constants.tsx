
import React from 'react';
import type { User, Integration, IntegrationCategory, AutomationTemplate, AutomationNode } from './types.ts';

export const USERS: User[] = [
    { id: 'u1', name: 'Elara Vance', avatar: 'https://i.pravatar.cc/150?u=u1' },
    { id: 'u2', name: 'Kaelen Corr', avatar: 'https://i.pravatar.cc/150?u=u2' },
    { id: 'u3', name: 'Seraphina Moon', avatar: 'https://i.pravatar.cc/150?u=u3' },
    { id: 'u4', name: 'Ronan Blackwood', avatar: 'https://i.pravatar.cc/150?u=u4' },
];

// Icons for Integrations and Automation Nodes
const GitHubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
);
const SlackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 122.8 122.8" {...props}><path fill="#E01E5A" d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm-1.3 12.9c7.1 0 12.9-5.8 12.9-12.9s-5.8-12.9-12.9-12.9v25.8z" /><path fill="#E01E5A" d="M38.7 25.8C31.6 25.8 25.8 31.6 25.8 38.7s5.8 12.9 12.9 12.9V25.8z" /><path fill="#36C5F0" d="M44.6 25.8c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v12.9H44.6V25.8zm1.3-12.9c-7.1 0-12.9 5.8-12.9 12.9s5.8 12.9 12.9 12.9h25.8c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9H45.9z" /><path fill="#2EB67D" d="M97 44.6c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V31.8h25.8v12.8zm-12.9-1.3c7.1 0 12.9-5.8 12.9-12.9s-5.8-12.9-12.9-12.9H71.2c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9h12.9z" /><path fill="#ECB22E" d="M77.6 97c7.1 0 12.9-5.8 12.9-12.9s-5.8-12.9-12.9-12.9H64.7v25.8H77.6zm11.6-24.5c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v25.8c0-7.1-5.8-12.9-12.9-12.9s-12.9 5.8-12.9 12.9v-25.8z" /></svg>
);
const JiraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12.031 21.333l-9.333-9.333a.667.667 0 010-.943l9.333-9.333a.667.667 0 01.943 0l9.333 9.333a.667.667 0 010 .943l-9.333 9.333a.667.667 0 01-.943 0zM11.56 3.093l-8.42 8.42 8.42 8.42 5.05-5.05-8.42-8.42-5.05 5.05z" fill="#2684FF"></path></svg>
);
const SparkleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707M12 21v-1m0-16a1 1 0 00-1 1v1a1 1 0 002 0V5a1 1 0 00-1-1zm0 16a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1z" />
    </svg>
);
const FigmaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 12a3 3 0 11-6 0 3 3 0 016 0z" fill="#F24E1E"></path><path d="M9 3H6a3 3 0 00-3 3v3a3 3 0 003 3h3a3 3 0 100-6z" fill="#FF7262"></path><path d="M15 9h3a3 3 0 003-3V6a3 3 0 00-3-3h-3a3 3 0 100 6z" fill="#A259FF"></path><path d="M15 15h3a3 3 0 013 3v3a3 3 0 01-3 3h-3a3 3 0 110-6z" fill="#1ABCFE"></path><path d="M9 21a3 3 0 01-3-3v-3a3 3 0 116 0v3a3 3 0 01-3 3z" fill="#0ACF83"></path></svg>
);
const TimeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);
const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);
const GoogleStitchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 2L6 6v12l6 4 6-4V6L12 2zm0 2.31L16.94 8 12 11.69 7.06 8 12 4.31zM7.5 16.31V9.44l4.5 2.59v6.87l-4.5-2.59zm9 0l-4.5 2.59v-6.87l4.5-2.59v6.87z" fill="#4285F4"></path></svg>
);
const GoogleDriveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M3.44 14.33l4.32-7.48L12 18.51l-4.24-7.66-4.32 7.48z" fill="#009D58"/><path d="M12 18.5l4.32-7.48L20.56 14.33H12v4.17z" fill="#0066DA"/><path d="M16.24 6.85l-4.24 7.66 4.24 7.66h4.32l-4.32-7.66z" fill="#FFC107"/><path d="M12 2L3.44 14.33h8.56L12 2z" fill="#2684FC"/><path d="M12 2l8.56 12.33h-8.56L12 2z" fill="#FFD040"/></svg>
);
const VSCodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M17.5 2.5l-12 3.5v12l12 3.5 3.5-1.5v-16l-3.5-1.5zM17 5.5l-10 3v5l10 3V5.5zM7 8.5l4.5-1.5v9L7 14.5v-6z" fill="#007ACC"></path></svg>
);
const FirebaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M4.17 21.33l1.46-8.79L12 2l6.37 10.54 1.46 8.79H4.17z" fill="#FFCA28"/><path d="M12 2l-6.37 10.54L4.17 21.33h15.66L18.37 12.54 12 2z" fill="#FFA000"/><path d="M4.17 21.33l7.83-19.33L12 12.54 4.17 21.33z" fill="#FFC107"/></svg>
);
const Fusion360Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path fillRule="evenodd" clipRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zM8.5 7.5h7v3h-7v-3zm0 6h7v3h-7v-3z" fill="#FF8F00"></path></svg>
);
const BlenderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14 7 7 0 010-14zm-5.05 2.95a7 7 0 0010.1 0l-5.05 8.74-5.05-8.74z" fill="#F5792A"></path></svg>
);
const LMMSIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 3v10.55a4 4 0 102 3.45V6h5V3h-7z" fill="#4CAF50"></path></svg>
);
const AudacityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 2a10 10 0 00-7.07 17.07l-1.42 1.42A12 12 0 1112 0C5.37 0 0 5.37 0 12h2a10 10 0 0110-10v2zM4 14v-4h2v4H4zm4 4v-8h2v8H8zm4 2v-12h2v12h-2zm4-2v-8h2v8h-2zm4-4v-4h2v4h-2z" fill="#0000DD"></path></svg>
);
const IllustratorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M3 2h18v20H3V2zm2 2v16h14V4H5zm3 3h2.5l-1 5h-1.5l-1-5H9zm4.5 0h2v10h-2V7z" fill="#FF7F18"></path></svg>
);
const PhotoshopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M3 2h18v20H3V2zm2 2v16h14V4H5zm2 2h6a3 3 0 010 6H9v4h7v2H7V6zm2 2v2h4a1 1 0 000-2H9z" fill="#31C5F4"></path></svg>
);
const AndroidStudioIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M5.1 18.9c-1.2-1.2-1.9-2.8-1.9-4.5s.7-3.3 1.9-4.5l1.4 1.4c-.9.9-1.3 2-1.3 3.1s.4 2.2 1.3 3.1l-1.4 1.4zm13.8 0l-1.4-1.4c.9-.9 1.3-2 1.3-3.1s-.4-2.2-1.3-3.1l1.4-1.4c1.2 1.2 1.9 2.8 1.9 4.5s-.7 3.3-1.9 4.5zM8 4h8v2H8V4zm-2 2h12v12H6V6zm2 2v8h8V8H8z" fill="#3DDC84"></path></svg>
);
const MatlabIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M2 2h20v20H2V2zm2 2v16h16V4H4zm2 2h4v8.66a5 5 0 008 0V6h-4v4h-4V6z" fill="#0076A8"></path></svg>
);
const JupyterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><circle cx="12" cy="12" r="10" fill="#F37626"/><circle cx="12" cy="5" r="2" fill="white"/><circle cx="18.39" cy="15.5" r="2" fill="white"/><circle cx="5.61" cy="15.5" r="2" fill="white"/></svg>
);

const communicationIntegrations: Integration[] = [
    { id: 'int-slack', name: 'Slack', icon: SlackIcon },
];

const developmentIntegrations: Integration[] = [
    { id: 'int-github', name: 'GitHub', icon: GitHubIcon },
    { id: 'int-jira', name: 'Jira', icon: JiraIcon },
    { id: 'int-vscode', name: 'Visual Studio Code', icon: VSCodeIcon },
    { id: 'int-androidstudio', name: 'Android Studio', icon: AndroidStudioIcon },
];

const designIntegrations: Integration[] = [
    { id: 'int-figma', name: 'Figma', icon: FigmaIcon },
    { id: 'int-illustrator', name: 'Illustrator', icon: IllustratorIcon },
    { id: 'int-photoshop', name: 'Photoshop', icon: PhotoshopIcon },
];

const backendCloudIntegrations: Integration[] = [
    { id: 'int-stitch', name: 'Google Stitch', icon: GoogleStitchIcon },
    { id: 'int-fb-console', name: 'Firebase Console', icon: FirebaseIcon },
    { id: 'int-fb-storage', name: 'Firebase Storage', icon: FirebaseIcon },
    { id: 'int-fb-database', name: 'Firebase Database', icon: FirebaseIcon },
];

const cloudStorageIntegrations: Integration[] = [
    { id: 'int-gdrive', name: 'Google Drive', icon: GoogleDriveIcon },
];

const cad3dIntegrations: Integration[] = [
    { id: 'int-fusion360', name: 'Fusion 360', icon: Fusion360Icon },
    { id: 'int-blender', name: 'Blender', icon: BlenderIcon },
];

const audioIntegrations: Integration[] = [
    { id: 'int-lmms', name: 'LMMS', icon: LMMSIcon },
    { id: 'int-audacity', name: 'Audacity', icon: AudacityIcon },
];

const dataEngineeringIntegrations: Integration[] = [
    { id: 'int-matlab', name: 'Matlab', icon: MatlabIcon },
    { id: 'int-jupyter', name: 'Jupyter', icon: JupyterIcon },
];


export const INTEGRATION_CATEGORIES: IntegrationCategory[] = [
    { name: 'Communication', integrations: communicationIntegrations },
    { name: 'Development', integrations: developmentIntegrations },
    { name: 'Backend & Cloud', integrations: backendCloudIntegrations },
    { name: 'Cloud Storage', integrations: cloudStorageIntegrations },
    { name: 'Design', integrations: designIntegrations },
    { name: '3D & CAD', integrations: cad3dIntegrations },
    { name: 'Audio Production', integrations: audioIntegrations },
    { name: 'Data & Engineering', integrations: dataEngineeringIntegrations },
];

export const ALL_INTEGRATIONS: Integration[] = [
    ...communicationIntegrations,
    ...developmentIntegrations,
    ...designIntegrations,
    ...backendCloudIntegrations,
    ...cloudStorageIntegrations,
    ...cad3dIntegrations,
    ...audioIntegrations,
    ...dataEngineeringIntegrations,
];

// Available Nodes for Automations
export const TRIGGER_NODES: Omit<AutomationNode, 'id' | 'position'>[] = [
    { type: 'trigger', name: 'Manual Trigger', group: 'General', icon: PlayIcon, data: {} },
    { type: 'trigger', name: 'Scheduled Trigger', group: 'General', icon: TimeIcon, data: { cron: '0 9 * * 1-5' } },
    { type: 'trigger', name: 'GitHub Push', group: 'GitHub', icon: GitHubIcon, data: { repo: '', branch: 'main' } },
];
export const ACTION_NODES: Omit<AutomationNode, 'id' | 'position'>[] = [
    { type: 'action', name: 'Send Slack Message', group: 'Slack', icon: SlackIcon, data: { channel: '#general', message: 'Hello World' } },
    { type: 'action', name: 'Create GitHub Issue', group: 'GitHub', icon: GitHubIcon, data: { repo: '', title: '', body: '' } },
    { type: 'action', name: 'AI Task Generator', group: 'AI', icon: SparkleIcon, data: { goal: '' } },
];
export const ALL_AVAILABLE_NODES: Omit<AutomationNode, 'id' | 'position'>[] = [...TRIGGER_NODES, ...ACTION_NODES];


export const AUTOMATION_TEMPLATES: AutomationTemplate[] = [
    {
        name: "Daily Stand-up Reminder",
        description: "Sends a reminder to a Slack channel every weekday at 9 AM.",
        automation: {
            nodes: [
                { id: 'n1', type: 'trigger', name: 'Scheduled Trigger', group: 'General', icon: TimeIcon, position: { x: 50, y: 100 }, data: { cron: '0 9 * * 1-5' } },
                { id: 'n2', type: 'action', name: 'Send Slack Message', group: 'Slack', icon: SlackIcon, position: { x: 350, y: 100 }, data: { channel: '#standup', message: "Time for the daily stand-up! Please post your updates." } },
            ],
            edges: [{ id: 'e1-2', sourceNodeId: 'n1', targetNodeId: 'n2' }]
        }
    },
    {
        name: "New GitHub Push to Slack",
        description: "Notifies a Slack channel when a new push is made to the main branch on GitHub.",
        automation: {
            nodes: [
                { id: 'n1', type: 'trigger', name: 'GitHub Push', group: 'GitHub', icon: GitHubIcon, position: { x: 50, y: 100 }, data: { repo: 'your-org/your-repo', branch: 'main' } },
                { id: 'n2', type: 'action', name: 'Send Slack Message', group: 'Slack', icon: SlackIcon, position: { x: 350, y: 100 }, data: { channel: '#development', message: "New push to main branch by {{author}}:\n{{message}}" } },
            ],
            edges: [{ id: 'e1-2', sourceNodeId: 'n1', targetNodeId: 'n2' }]
        }
    }
];

export const SOFTWARE_PLATFORMS = ['web', 'ios', 'android', 'windows', 'mac', 'linux'];
export const HARDWARE_PLATFORMS = ['pc', 'mobile', 'web', 'esp32', 'arduino', 'nextion'];