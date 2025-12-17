import React, { useState } from 'react';
import { Bell, Layout, Settings, FileText, User, LogOut, ChevronDown, Award, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = ({ onMenuClick }) => {
    const { isDark, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('Overview');
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const tabs = [
        { name: 'Overview', icon: Layout },
        { name: 'Reports', icon: FileText },
        { name: 'Settings', icon: Settings },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-theme-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Branding - Left Side */}
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={onMenuClick}
                            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors mr-2"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="hidden sm:block">
                            <h1 className="text-theme-xl font-bold text-gray-900">
                                Analytica
                            </h1>
                        </div>
                    </div>

                    {/* Navigation Links - Center (Desktop) - REMOVED since we have Sidebar now */}
                    <div className="hidden md:flex items-center space-x-1 lg:space-x-4 opacity-0 pointer-events-none w-0 overflow-hidden">
                        {/* Kept hidden just in case revert is needed, but functionally removed */}
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`
                            relative flex items-center gap-2 px-3 py-2 rounded-lg text-theme-sm font-medium transition-all duration-200
                            ${activeTab === tab.name
                                        ? 'text-brand-500 bg-brand-50'
                                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                    }
                        `}
                            >
                                <tab.icon className={`w-4 h-4 ${activeTab === tab.name ? 'text-brand-500' : 'text-gray-500'}`} />
                                {tab.name}
                                {activeTab === tab.name && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-full md:hidden"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Right Side - Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* Notifications */}
                        <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-brand-500/10">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error-500 rounded-full border-2 border-white animate-pulse"></span>
                        </button>

                        {/* Vertical Divider */}
                        <div className="h-6 w-px bg-gray-200 mx-1"></div>

                        {/* User Profile */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-100 to-brand-50 flex items-center justify-center text-brand-700 font-semibold border border-brand-200 shadow-theme-xs">
                                    RN
                                </div>
                                <div className="hidden sm:flex flex-col items-start mr-1">
                                    <span className="text-theme-xs font-semibold text-gray-700">Rafia Niamat</span>
                                    <span className="text-[10px] text-gray-500 leading-none">Admin</span>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsProfileOpen(false)}
                                    ></div>
                                    <div className="absolute right-0 z-20 mt-2 w-56 bg-white rounded-xl shadow-theme-lg py-2 border border-gray-200 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                                        <div className="px-5 py-3 border-b border-gray-100">
                                            <p className="text-theme-sm font-semibold text-gray-900">Rafia Niamat</p>
                                            <p className="text-theme-xs text-gray-500 truncate">rafia@gmail.com</p>
                                        </div>

                                        <div className="py-1">
                                            <a href="#" className="flex items-center gap-3 px-5 py-2.5 text-theme-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors">
                                                <User className="w-4 h-4" />
                                                Your Profile
                                            </a>
                                            <a href="#" className="flex items-center gap-3 px-5 py-2.5 text-theme-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors">
                                                <Settings className="w-4 h-4" />
                                                Settings
                                            </a>
                                        </div>

                                        <div className="border-t border-gray-100 my-1"></div>

                                        <div className="py-1">
                                            <a href="#" className="flex items-center gap-3 px-5 py-2.5 text-theme-sm text-error-600 hover:bg-error-50 transition-colors">
                                                <LogOut className="w-4 h-4" />
                                                Sign out
                                            </a>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
