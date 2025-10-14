import React from 'react';

type Page = 'projects' | 'dashboard' | 'tasks' | 'goals' | 'integrations' | 'documents' | 'automations' | 'architecture' | 'settings';

interface SidebarProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
    hasProject: boolean;
}

const SidebarIcon: React.FC<{ Icon: React.FC<React.SVGProps<SVGSVGElement>>, active: boolean }> = ({ Icon, active }) => (
    <Icon className={`w-6 h-6 transition-colors ${active ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
);

const NavItem: React.FC<{
    page: Page;
    label: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    currentPage: Page;
    onNavigate: (page: Page) => void;
    disabled?: boolean;
}> = ({ page, label, icon: Icon, currentPage, onNavigate, disabled = false }) => {
    const isActive = currentPage === page;
    return (
        <button
            onClick={() => onNavigate(page)}
            disabled={disabled}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-all group ${
                isActive 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-300 hover:bg-white/10'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <SidebarIcon Icon={Icon} active={isActive} />
            <span className="font-semibold">{label}</span>
        </button>
    );
};


const ProjectIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>;
const DashboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" /></svg>;
const TasksIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const GoalsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 100-13.5h9a9.75 9.75 0 100 13.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75h.008v.008H12v-.008z" /></svg>;
const IntegrationsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>;
const DocumentsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const AutomationsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 2.25c-5.508 0-10.096 3.555-11.764 8.528a14.98 14.98 0 0011.764 8.528z" /></svg>;
const ArchitectureIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-12m6-13.5v6.375a3.375 3.375 0 01-3 3.375H3.75" /></svg>;
const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0c-.07.658-.137 1.314-.205 1.983m15.41 0c.068-.669.135-1.325.205-1.983m0 0a7.48 7.48 0 00-4.04-6.042m-9.398 6.042a7.48 7.48 0 01-4.04-6.042m13.438 0a7.5 7.5 0 00-12.438 0m11.438 0a7.5 7.5 0 01-11.438 0" /></svg>;
const LogoutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>;

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onLogout, hasProject }) => {

    const mainNavItems = [
        { page: 'dashboard' as Page, label: 'Dashboard', icon: DashboardIcon, disabled: !hasProject },
        { page: 'tasks' as Page, label: 'Tasks', icon: TasksIcon, disabled: !hasProject },
        { page: 'goals' as Page, label: 'Goals', icon: GoalsIcon, disabled: !hasProject },
        { page: 'integrations' as Page, label: 'Integrations', icon: IntegrationsIcon, disabled: !hasProject },
        { page: 'documents' as Page, label: 'Documents', icon: DocumentsIcon, disabled: !hasProject },
        { page: 'automations' as Page, label: 'Automations', icon: AutomationsIcon, disabled: !hasProject },
        { page: 'architecture' as Page, label: 'Architecture', icon: ArchitectureIcon, disabled: !hasProject },
    ];
    
    return (
        <aside className="w-64 bg-gray-800/50 dark:bg-black/20 text-white flex flex-col h-screen p-4 backdrop-blur-xl border-r border-white/10">
            <div className="flex items-center mb-10 px-2">
                <h1 className="text-2xl font-bold tracking-wider text-white">
                    Pr<span className="text-blue-500">o</span>gect
                </h1>
            </div>
            
            <nav className="flex-1 flex flex-col justify-between">
                <div>
                    <h2 className="text-xs font-bold uppercase text-gray-400 mb-2 px-3">Main Menu</h2>
                    <div className="space-y-1">
                        <NavItem page="projects" label="My Projects" icon={ProjectIcon} currentPage={currentPage} onNavigate={onNavigate} />
                        <hr className="border-t border-white/10 my-2" />
                        {mainNavItems.map(item => <NavItem key={item.page} {...item} currentPage={currentPage} onNavigate={onNavigate} />)}
                    </div>
                </div>

                <div className="space-y-1">
                    <NavItem page="settings" label="Settings" icon={SettingsIcon} currentPage={currentPage} onNavigate={onNavigate} />
                    <button
                        onClick={onLogout}
                        className="flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-all text-gray-300 hover:bg-white/10 group"
                    >
                        <SidebarIcon Icon={LogoutIcon} active={false} />
                        <span className="font-semibold">Logout</span>
                    </button>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;