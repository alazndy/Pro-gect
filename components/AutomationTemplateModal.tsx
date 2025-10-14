
import React, { useState } from 'react';
import Card from './Card.tsx';
// Fix: The `AutomationTemplate` type is not exported from `../constants`. It must be imported from `../types`.
import { AUTOMATION_TEMPLATES } from '../constants.tsx';
import type { AutomationTemplate } from '../types.ts';

interface AutomationTemplateModalProps {
    onCancel: () => void;
    onSelect: (name: string, template?: AutomationTemplate) => void;
}

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);


const AutomationTemplateModal: React.FC<AutomationTemplateModalProps> = ({ onCancel, onSelect }) => {
    const [step, setStep] = useState(1);
    const [selectedTemplate, setSelectedTemplate] = useState<AutomationTemplate | null>(null);
    const [automationName, setAutomationName] = useState('');
    
    const handleTemplateSelect = (template: AutomationTemplate | null) => {
        setSelectedTemplate(template);
        setAutomationName(template ? template.name : '');
        setStep(2);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (automationName.trim()) {
            onSelect(automationName.trim(), selectedTemplate || undefined);
        }
    };

    const renderStepOne = () => (
        <>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">Yeni Otomasyon</h2>
            <p className="text-center text-gray-400 mb-6">Bir şablonla başlayın veya sıfırdan oluşturun.</p>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
                <Card onClick={() => handleTemplateSelect(null)} className="text-center p-6 border-dashed border-2 hover:border-solid hover:bg-blue-500/10 cursor-pointer border-gray-400 dark:border-gray-600">
                    <PlusIcon className="w-8 h-8 mx-auto text-gray-500 dark:text-gray-400" />
                    <h3 className="mt-2 font-semibold text-gray-800 dark:text-white">Boş Otomasyon</h3>
                </Card>
                {AUTOMATION_TEMPLATES.map(template => (
                    <Card key={template.name} onClick={() => handleTemplateSelect(template)} className="p-4 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{template.description}</p>
                    </Card>
                ))}
            </div>
        </>
    );

    const renderStepTwo = () => (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">Otomasyon Adı</h2>
            <p className="text-center text-gray-400 mb-6">{selectedTemplate ? `"${selectedTemplate.name}" şablonunu kullanıyorsunuz.` : 'Yeni bir otomasyon oluşturuyorsunuz.'}</p>
            <div>
                <label htmlFor="automationName" className="block text-sm font-medium text-gray-300">İsim</label>
                <input
                    type="text"
                    id="automationName"
                    value={automationName}
                    onChange={(e) => setAutomationName(e.target.value)}
                    required
                    className="mt-1 block w-full bg-gray-200/60 dark:bg-gray-800/60 border border-gray-400 dark:border-gray-700 rounded-md px-3 py-2 text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>
            <div className="mt-6 flex justify-between">
                 <button type="button" onClick={() => setStep(1)} className="text-gray-300 font-semibold rounded-lg px-6 py-2 transition-colors hover:bg-gray-700">Geri</button>
                 <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-6 py-2 transition-colors">Oluştur</button>
            </div>
        </form>
    );

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg" glowColor="purple">
                <div className="p-8">
                    {step === 1 ? renderStepOne() : renderStepTwo()}
                    <div className="text-center mt-4">
                        <button onClick={onCancel} className="text-sm text-gray-400 hover:text-white">İptal</button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

// Fix: Added missing default export.
export default AutomationTemplateModal;
