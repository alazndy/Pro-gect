import React, { useState, useEffect } from 'react';
import type { Integration } from '../types';

interface IntegrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    integration: Integration | null;
    isConnected: boolean;
    onSave: (url: string) => void;
    onDisconnect: () => void;
}

const IntegrationModal: React.FC<IntegrationModalProps> = ({ isOpen, onClose, integration, isConnected, onSave, onDisconnect }) => {
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (integration) {
            setUrl(integration.url || '');
        }
    }, [integration]);

    if (!isOpen || !integration) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center animate-fade-in">
            <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-lg m-4 relative shadow-2xl shadow-blue-500/20 border border-white/10">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl">&times;</button>
                <div className="flex flex-col items-center text-center">
                    <integration.icon className="w-20 h-20 mb-4 text-white" />
                    <h2 className="text-3xl font-bold text-white mb-2">{integration.name} Integration</h2>
                    <p className={`text-sm font-semibold ${isConnected ? 'text-green-400' : 'text-yellow-400'}`}>
                        {isConnected ? 'Connected' : 'Not Connected'}
                    </p>
                    <p className="text-gray-300 mt-4 max-w-md">
                        You can provide a URL to the project page on {integration.name}.
                    </p>
                    <div className="w-full mt-4">
                        <label htmlFor="integrationUrl" className="block text-sm font-medium text-gray-300 mb-2 text-left">Integration URL</label>
                        <input
                            id="integrationUrl"
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder={`https://...`}
                        />
                    </div>
                    <div className="flex justify-center mt-8 space-x-4">
                        <button 
                            onClick={onClose} 
                            className="bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg px-6 py-3 transition-colors"
                        >
                            Close
                        </button>
                        {isConnected && 
                            <button onClick={() => { onDisconnect(); onClose(); }} className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-lg transform hover:scale-105 shadow-red-500/20">
                                Disconnect
                            </button>
                        }
                        <button
                            onClick={() => { onSave(url); onClose(); }}
                            className={`font-semibold py-3 px-8 rounded-lg transition-all shadow-lg transform hover:scale-105 ${
                                isConnected
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-blue-500/20'
                                : 'bg-gradient-to-r from-green-500 to-teal-400 text-white shadow-green-500/20'
                            }`}
                        >
                            {isConnected ? 'Update URL' : 'Connect'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegrationModal;