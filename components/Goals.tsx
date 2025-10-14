
import React, { useState, useEffect } from 'react';
import type { SmartGoals } from '../types.ts';
import Card from './Card.tsx';

interface GoalsProps {
    goals: SmartGoals;
    onUpdateGoals: (updatedGoals: SmartGoals) => void;
}

const goalMetadata = {
    specific: {
        label: "Specific (Belirli)",
        description: "Hedefiniz ne kadar net ve belirgin? Ne, nerede, ne zaman, nasıl, kiminle başarılacak?",
        color: "blue"
    },
    measurable: {
        label: "Measurable (Ölçülebilir)",
        description: "İlerlemeyi nasıl ölçeceksiniz? Hedefe ulaştığınızı gösteren metrikler nelerdir?",
        color: "green"
    },
    achievable: {
        label: "Achievable (Ulaşılabilir)",
        description: "Bu hedefe ulaşmak mevcut kaynaklarınızla (zaman, para, yetenek) mümkün mü?",
        color: "yellow"
    },
    relevant: {
        label: "Relevant (İlgili)",
        description: "Bu hedef, genel proje veya şirket hedefleriyle ne kadar uyumlu? Neden önemli?",
        color: "purple"
    },
    timeBound: {
        label: "Time-bound (Zamanla Sınırlı)",
        description: "Hedef için bir bitiş tarihi var mı? Hangi tarihe kadar tamamlanmalı?",
        color: "red"
    }
};

const GoalEditorCard: React.FC<{
    goalKey: keyof SmartGoals;
    value: string;
    onChange: (key: keyof SmartGoals, value: string) => void;
}> = ({ goalKey, value, onChange }) => {
    const meta = goalMetadata[goalKey];
    const colorClasses = {
        blue: 'border-blue-500/50',
        green: 'border-green-500/50',
        yellow: 'border-yellow-500/50',
        purple: 'border-purple-500/50',
        red: 'border-red-500/50',
    };

    return (
        <Card glowColor={meta.color}>
            <div className={`p-6 border-l-4 ${colorClasses[meta.color]}`}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{meta.label}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-3">{meta.description}</p>
                <textarea
                    value={value}
                    onChange={(e) => onChange(goalKey, e.target.value)}
                    rows={4}
                    className="w-full bg-gray-200/60 dark:bg-gray-800/60 border border-gray-400 dark:border-gray-700 rounded-md px-3 py-2 text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder={`${meta.label} hedefini buraya yazın...`}
                />
            </div>
        </Card>
    );
}


const Goals: React.FC<GoalsProps> = ({ goals, onUpdateGoals }) => {
    const [editableGoals, setEditableGoals] = useState<SmartGoals>(goals);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setEditableGoals(goals);
    }, [goals]);
    
    const handleChange = (key: keyof SmartGoals, value: string) => {
        setEditableGoals(prev => ({ ...prev, [key]: value }));
        if(isSaved) setIsSaved(false);
    };

    const handleSaveChanges = () => {
        onUpdateGoals(editableGoals);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000); // Hide message after 3 seconds
    };

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">SMART Hedefleri Yönetimi</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Projenizin başarı kriterlerini net ve ölçülebilir hedeflerle tanımlayın.</p>
                </div>
                <div className="relative">
                    <button 
                        onClick={handleSaveChanges}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-6 py-3 transition-colors flex items-center space-x-2"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" /></svg>
                        <span>Değişiklikleri Kaydet</span>
                    </button>
                    {isSaved && <span className="absolute top-full mt-2 right-0 text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">Kaydedildi!</span>}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {(Object.keys(editableGoals) as Array<keyof SmartGoals>).map(key => (
                    <GoalEditorCard 
                        key={key}
                        goalKey={key}
                        value={editableGoals[key]}
                        onChange={handleChange}
                    />
                ))}
            </div>
        </div>
    );
};

export default Goals;