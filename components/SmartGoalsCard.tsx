

import React from 'react';
import Card from './Card.tsx';
// Fix: Removed .ts extension from import path.
import type { SmartGoals } from '../types.ts';

interface SmartGoalsCardProps {
    goals: SmartGoals;
}

const SmartGoalsCard: React.FC<SmartGoalsCardProps> = ({ goals }) => {
    const goalsList = [
        { initial: "S", label: "Specific", value: goals.specific },
        { initial: "M", label: "Measurable", value: goals.measurable },
        { initial: "A", label: "Achievable", value: goals.achievable },
        { initial: "R", label: "Relevant", value: goals.relevant },
        { initial: "T", label: "Time-bound", value: goals.timeBound },
    ];

    const allGoalsSet = goalsList.every(g => g.value.trim() !== '');

    return (
        <Card glowColor="purple">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">SMART Hedefleri</h2>
                    <span className="text-sm font-semibold text-blue-500 group-hover:text-blue-400">Yönet →</span>
                </div>
                
                <div className="flex items-center space-x-2">
                    {goalsList.map(goal => (
                        <div 
                            key={goal.initial}
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                                goal.value.trim() ? 'bg-green-500' : 'bg-gray-400 dark:bg-gray-600'
                            }`}
                            title={`${goal.label}: ${goal.value || 'Belirlenmedi'}`}
                        >
                            {goal.initial}
                        </div>
                    ))}
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    {allGoalsSet ? 'Tüm hedefler belirlendi.' : 'Bazı hedefler eksik.'}
                </p>
            </div>
        </Card>
    );
};

export default SmartGoalsCard;