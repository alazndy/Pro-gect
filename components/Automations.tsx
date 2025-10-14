
import React, { useState } from 'react';

type AutomationTool = 'n8n' | 'nodered';

const Automations: React.FC = () => {
    const [activeTool, setActiveTool] = useState<AutomationTool>('n8n');

    const toolConfig = {
        n8n: {
            url: "http://localhost:5678",
            title: "n8n",
            description: "n8n arayüzünü kullanarak karmaşık iş akışları oluşturun, yönetin ve çalıştırın."
        },
        nodered: {
            url: "http://localhost:1880",
            title: "Node-RED",
            description: "Node-RED arayüzünü kullanarak olay güdümlü uygulamalar ve iş akışları oluşturun."
        }
    };

    const TabButton: React.FC<{ tool: AutomationTool; label: string }> = ({ tool, label }) => (
        <button
            onClick={() => setActiveTool(tool)}
            className={`px-6 py-3 font-semibold rounded-t-lg transition-colors text-lg ${
                activeTool === tool
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'bg-gray-100 dark:bg-gray-800/50 text-gray-500 hover:bg-gray-200/70 dark:hover:bg-gray-700/70'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="h-full flex flex-col space-y-4">
            <header>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">İş Akışı Otomasyonu</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                    {toolConfig[activeTool].description}
                </p>
            </header>

            <div>
                <TabButton tool="n8n" label="n8n" />
                <TabButton tool="nodered" label="Node-RED" />
            </div>
            
            <div className="h-[80vh] flex border border-gray-200 dark:border-gray-700 rounded-lg rounded-tl-none overflow-hidden">
                <iframe
                    key={activeTool} // Re-renders the iframe when the tool changes
                    src={toolConfig[activeTool].url}
                    title={`${toolConfig[activeTool].title} Editor`}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
            </div>
        </div>
    );
};

export default Automations;
