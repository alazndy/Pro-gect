

import React, { useState, useEffect } from 'react';
import Card from './Card.tsx';
// Fix: Removed .ts extension from import path.
import type { User } from '../types.ts';

interface SettingsProps {
  user: User;
  currentTheme: string;
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const themes = [
    { name: 'dark', label: 'Koyu' },
    { name: 'light', label: 'Açık' },
    { name: 'sunset', label: 'Gün Batımı' },
    { name: 'ocean', label: 'Okyanus' },
];

const Settings: React.FC<SettingsProps> = ({ user, currentTheme, onThemeChange }) => {
  const [profile, setProfile] = useState({
    name: user.name,
    email: `${user.name.split(' ')[0].toLowerCase()}@fusion.dev`,
  });
  const [notifications, setNotifications] = useState({
    taskUpdates: true,
    projectSummaries: false,
  });

  useEffect(() => {
    setProfile({
        name: user.name,
        email: `${user.name.split(' ')[0].toLowerCase()}@fusion.dev`,
    })
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  
  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({...prev, [key]: !prev[key]}));
  };

  return (
    <div className="space-y-8">
        <header>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Ayarlar</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Uygulama tercihlerinizi yönetin.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Profile Card */}
            <Card>
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Kullanıcı Profili</h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-300">İsim</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={profile.name}
                                onChange={handleProfileChange}
                                className="mt-1 block w-full bg-gray-200/60 dark:bg-gray-800/60 border border-gray-400 dark:border-gray-700 rounded-md px-3 py-2 text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300">E-posta</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={profile.email}
                                onChange={handleProfileChange}
                                className="mt-1 block w-full bg-gray-200/60 dark:bg-gray-800/60 border border-gray-400 dark:border-gray-700 rounded-md px-3 py-2 text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>
                        <div className="pt-2 flex justify-end">
                            <button type="submit" onClick={(e) => e.preventDefault()} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 transition-colors">Değişiklikleri Kaydet</button>
                        </div>
                    </form>
                </div>
            </Card>

            <div className="space-y-8">
                 {/* Appearance Card */}
                <Card>
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Görünüm</h2>
                         <div className="flex space-x-2">
                             <button onClick={() => onThemeChange('light')} className={`w-full p-3 rounded-lg border-2 transition-colors ${currentTheme === 'light' ? 'border-blue-500 bg-blue-500/10' : 'border-transparent bg-gray-200 dark:bg-gray-700'}`}>Açık</button>
                             <button onClick={() => onThemeChange('dark')} className={`w-full p-3 rounded-lg border-2 transition-colors ${currentTheme === 'dark' ? 'border-blue-500 bg-blue-500/20' : 'border-transparent bg-gray-200 dark:bg-gray-700'}`}>Koyu</button>
                         </div>                    </div>
                </Card>

                {/* Notifications Card */}
                <Card>
                     <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Bildirimler</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Görev Güncellemeleri</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Bir görev atandığında veya tamamlandığında bildirim al.</p>
                                </div>
                                <ToggleSwitch enabled={notifications.taskUpdates} onChange={() => handleNotificationChange('taskUpdates')} />
                            </div>
                            <div className="flex items-center justify-between">
                                 <div>
                                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Haftalık Proje Özetleri</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Her hafta proje ilerlemesi hakkında bir e-posta al.</p>
                                </div>
                                <ToggleSwitch enabled={notifications.projectSummaries} onChange={() => handleNotificationChange('projectSummaries')} />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
  );
};

export default Settings;