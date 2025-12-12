import React, { useState } from 'react';
import { Bell, Layout, Settings, FileText, User, LogOut, ChevronDown, Award } from 'lucide-react';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const tabs = [
        { name: 'Overview', icon: Layout },
        { name: 'Reports', icon: FileText },
        { name: 'Settings', icon: Settings },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Branding - Left Side */}
                    <div className="flex items-center gap-3">
                        <div className="bg-linear-to-tr from-indigo-600 to-purple-600 p-2 rounded-lg shadow-lg shadow-indigo-200">
                            <Award className="w-6 h-6 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600">
                                Analytica
                            </h1>
                        </div>
                    </div>

                    {/* Navigation Links - Center (Desktop) */}
                    <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`
                            relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                            ${activeTab === tab.name
                                        ? 'text-indigo-600 bg-indigo-50'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }
                        `}
                            >
                                <tab.icon className={`w-4 h-4 ${activeTab === tab.name ? 'text-indigo-600' : 'text-gray-400'}`} />
                                {tab.name}
                                {activeTab === tab.name && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full md:hidden"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Right Side - Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Notifications */}
                        <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                        </button>

                        {/* Vertical Divider */}
                        <div className="h-6 w-px bg-gray-200 mx-1"></div>

                        {/* User Profile */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
                            >
                                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 font-semibold border border-indigo-200 shadow-sm">
                                    RN
                                </div>
                                <div className="hidden sm:flex flex-col items-start mr-1">
                                    <span className="text-xs font-semibold text-gray-700">Rafia Niamat</span>
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
                                    <div className="absolute right-0 z-20 mt-2 w-56 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-2 border border-gray-100 ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                                        <div className="px-5 py-3 border-b border-gray-50">
                                            <p className="text-sm font-semibold text-gray-900">Rafia Niamat</p>
                                            <p className="text-xs text-gray-500 truncate">rafia@gmail.com</p>
                                        </div>

                                        <div className="py-1">
                                            <a href="#" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors">
                                                <User className="w-4 h-4" />
                                                Your Profile
                                            </a>
                                            <a href="#" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors">
                                                <Settings className="w-4 h-4" />
                                                Settings
                                            </a>
                                        </div>

                                        <div className="border-t border-gray-50 my-1"></div>

                                        <div className="py-1">
                                            <a href="#" className="flex items-center gap-3 px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
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
