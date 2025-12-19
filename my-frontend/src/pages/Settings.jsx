import React, { useState } from 'react';
import { User, Bell, Shield, Lock, Save } from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-theme-xs overflow-hidden">
                        <nav className="flex flex-col p-2 space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left
                                        ${activeTab === tab.id
                                            ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-300'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'}
                                    `}
                                >
                                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-brand-600' : 'text-gray-400'}`} />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Form Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-theme-sm p-6">

                        {activeTab === 'general' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Information</h3>
                                    <p className="mt-1 text-sm text-gray-500">Update your account's profile information and email address.</p>
                                </div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                                        <input type="text" defaultValue="Rafia" className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-brand-500 focus:border-brand-500 text-sm h-10 px-3 border" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                                        <input type="text" defaultValue="Niamat" className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-brand-500 focus:border-brand-500 text-sm h-10 px-3 border" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                        <input type="email" defaultValue="rafia@example.com" className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-brand-500 focus:border-brand-500 text-sm h-10 px-3 border" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                                        <textarea rows={3} className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-brand-500 focus:border-brand-500 text-sm p-3 border" defaultValue="Admin of Analytica Dashboard."></textarea>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notification Preferences</h3>
                                    <p className="mt-1 text-sm text-gray-500">Manage how you receive notifications.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input type="checkbox" defaultChecked className="h-4 w-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label className="font-medium text-gray-700 dark:text-gray-300">Email Notifications</label>
                                            <p className="text-gray-500">Get emails to find out what's going on when you're not online.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input type="checkbox" defaultChecked className="h-4 w-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label className="font-medium text-gray-700 dark:text-gray-300">Push Notifications</label>
                                            <p className="text-gray-500">Receive push notifications on your mobile device.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save Button */}
                        <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                            <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">
                                <Save className="w-4 h-4" />
                                Save Changes
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
