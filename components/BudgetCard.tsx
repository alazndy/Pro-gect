

import React, { useMemo, useState } from 'react';
import Card from './Card.tsx';
// Fix: Removed .ts extension from import path.
import type { Expense } from '../types.ts';

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

interface BudgetCardProps {
    budget: {
        total: number;
        expenses: Expense[];
    }
    isDetailedView?: boolean;
    onAddExpense?: (expense: Omit<Expense, 'id'>) => void;
    onRemoveExpense?: (expenseId: string) => void;
}
  
const AddExpenseForm: React.FC<{ onAdd: (expense: Omit<Expense, 'id'>) => void }> = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'subscription' | 'one-time'>('one-time');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numAmount = parseFloat(amount);
        if (name.trim() && !isNaN(numAmount) && numAmount > 0) {
            onAdd({ name, amount: numAmount, type });
            setName('');
            setAmount('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700/50">
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Gider Adı" className="md:col-span-2 w-full bg-gray-200/60 dark:bg-gray-800/60 border border-gray-400 dark:border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" required />
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Tutar" className="w-full bg-gray-200/60 dark:bg-gray-800/60 border border-gray-400 dark:border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" required />
            <div className="flex items-center space-x-2">
                 <select value={type} onChange={e => setType(e.target.value as any)} className="w-full bg-gray-200/60 dark:bg-gray-800/60 border border-gray-400 dark:border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="one-time">Tek Seferlik</option>
                    <option value="subscription">Abonelik</option>
                 </select>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md p-1.5 transition-colors text-sm">Ekle</button>
            </div>
        </form>
    )
}

const ExpenseList: React.FC<{ title: string, expenses: Expense[], onRemove?: (id: string) => void }> = ({ title, expenses, onRemove }) => (
    <div>
        <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">{title}</h4>
        {expenses.length > 0 ? (
            <ul className="space-y-2">
                {expenses.map(exp => (
                    <li key={exp.id} className="flex justify-between items-center text-sm group">
                        <span className="text-gray-800 dark:text-gray-200">{exp.name}</span>
                        <div className="flex items-center space-x-2">
                            <span className="font-mono text-gray-700 dark:text-gray-300">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(exp.amount)}</span>
                            {onRemove && (
                                <button onClick={() => onRemove(exp.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">Bu kategoride gider yok.</p>
        )}
    </div>
);


const RadialProgress: React.FC<{ percentage: number, size: number, strokeWidth: number, color: string, textClass?: string }> = ({ percentage, size, strokeWidth, color, textClass = "text-2xl" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
                <circle
                    className="text-gray-200 dark:text-gray-700"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className={color}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                 <span className={`${textClass} font-bold text-gray-800 dark:text-white`}>
                    {`${Math.round(percentage)}%`}
                </span>
            </div>
        </div>
    );
};


const BudgetCard: React.FC<BudgetCardProps> = ({ budget, isDetailedView = false, onAddExpense, onRemoveExpense }) => {
    const { spent, subscriptions, oneTimePayments, monthlyRecurring, oneTimeTotal } = useMemo(() => {
        const subs: Expense[] = [];
        const oneTimes: Expense[] = [];
        let monthly = 0;
        let oneTime = 0;
        
        const totalSpent = budget.expenses.reduce((sum, exp) => {
            if (exp.type === 'subscription') {
                subs.push(exp);
                monthly += exp.amount;
            } else {
                oneTimes.push(exp);
                oneTime += exp.amount;
            }
            return sum + exp.amount;
        }, 0);

        return { spent: totalSpent, subscriptions: subs, oneTimePayments: oneTimes, monthlyRecurring: monthly, oneTimeTotal: oneTime };
    }, [budget.expenses]);

    const percentageSpent = budget.total > 0 ? (spent / budget.total) * 100 : 0;
    const remaining = budget.total - spent;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
    }

    if (isDetailedView) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <div className="p-6 flex flex-col md:flex-row items-center justify-around gap-6">
                                <RadialProgress percentage={percentageSpent} size={200} strokeWidth={20} color="text-green-500" textClass="text-4xl" />
                                <div className="text-center md:text-left">
                                    <p className="text-gray-500 dark:text-gray-400">Harcanan Bütçe</p>
                                    <p className="text-4xl font-bold text-gray-900 dark:text-white">{formatCurrency(spent)}</p>
                                    <p className="text-lg text-gray-600 dark:text-gray-300">/ {formatCurrency(budget.total)}</p>
                                </div>
                            </div>
                        </Card>
                        <Card>
                             <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    <ExpenseList title="Aylık Abonelikler" expenses={subscriptions} onRemove={onRemoveExpense} />
                                    <ExpenseList title="Tek Seferlik Ödemeler" expenses={oneTimePayments} onRemove={onRemoveExpense} />
                                </div>
                                {onAddExpense && <AddExpenseForm onAdd={onAddExpense} />}
                            </div>
                        </Card>
                    </div>
                    <div className="space-y-6">
                        <Card><div className="p-4"><h4 className="font-semibold text-gray-600 dark:text-gray-300">Toplam Bütçe</h4><p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(budget.total)}</p></div></Card>
                        <Card><div className="p-4"><h4 className="font-semibold text-gray-600 dark:text-gray-300">Kalan Bütçe</h4><p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-500' : 'text-red-500'}`}>{formatCurrency(remaining)}</p></div></Card>
                        <Card>
                             <div className="p-4">
                                <h4 className="font-semibold text-gray-600 dark:text-gray-300 mb-3">Harcama Dağılımı</h4>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1"><span className="text-gray-800 dark:text-gray-200">Abonelikler</span><span className="font-mono">{formatCurrency(monthlyRecurring)}</span></div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{ width: `${spent > 0 ? (monthlyRecurring / spent) * 100 : 0}%`}}></div></div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1"><span className="text-gray-800 dark:text-gray-200">Tek Seferlik</span><span className="font-mono">{formatCurrency(oneTimeTotal)}</span></div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${spent > 0 ? (oneTimeTotal / spent) * 100 : 0}%`}}></div></div>
                                    </div>
                                </div>
                             </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <Card glowColor="green">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Proje Bütçesi</h2>
                        <span className="text-sm font-semibold text-blue-500 group-hover:text-blue-400">Detayları Gör →</span>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                     <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Harcanan</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(spent)}</p>
                        <p className={`text-base font-semibold ${remaining >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                            {formatCurrency(remaining)} Kalan
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <RadialProgress percentage={percentageSpent} size={90} strokeWidth={8} color="text-green-500" textClass="text-xl" />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default BudgetCard;