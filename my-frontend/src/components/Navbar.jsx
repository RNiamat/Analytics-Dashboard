import React, { useState, useRef } from 'react';
import { Bell, Layout, Settings, FileText, User, LogOut, ChevronDown, Award, Menu, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import useClickOutside from '../hooks/useClickOutside';

const Navbar = ({ onMenuClick }) => {
    const { isDark, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const notifRef = useRef(null);
    const profileRef = useRef(null);

    useClickOutside(notifRef, () => setIsNotificationsOpen(false));
    useClickOutside(profileRef, () => setIsProfileOpen(false));

    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New User Registered', time: '5 min ago', type: 'success', icon: Award, read: false },
        { id: 2, title: 'System Warning', time: '2 hours ago', type: 'warning', icon: Bell, read: false },
        { id: 3, title: 'Report Generated', time: '4 hours ago', type: 'info', icon: FileText, read: true },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

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
                            <h1 className="text-theme-xl font-bold text-gray-900 dark:text-white">
                                Analytica
                            </h1>
                        </div>
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
                        <div className="relative" ref={notifRef}>
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
                            >
                                <Bell className="w-5 h-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error-500 rounded-full border-2 border-white animate-pulse"></span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotificationsOpen && (
                                <div className="absolute right-0 z-20 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-theme-lg py-2 border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</p>
                                        <button
                                            onClick={markAllAsRead}
                                            className="text-xs text-brand-600 cursor-pointer hover:underline disabled:opacity-50"
                                            disabled={unreadCount === 0}
                                        >
                                            Mark all as read
                                        </button>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.map((notification) => (
                                            <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-50 dark:border-gray-700/50 last:border-0 cursor-pointer">
                                                <div className="flex gap-3">
                                                    <div className={`mt-0.5 p-1.5 rounded-full shrink-0 ${notification.type === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                                                        notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' :
                                                            'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                                        }`}>
                                                        <notification.icon className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{notification.title}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{notification.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 text-center">
                                        <Link to="/notifications" className="text-xs font-medium text-brand-600 hover:text-brand-700">View all notifications</Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Vertical Divider */}
                        <div className="h-6 w-px bg-gray-200 mx-1"></div>

                        {/* User Profile */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
                            >
                                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-brand-100 to-brand-50 flex items-center justify-center text-brand-700 font-semibold border border-brand-200 shadow-theme-xs">
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
                                <div className="absolute right-0 z-20 mt-2 w-56 bg-white rounded-xl shadow-theme-lg py-2 border border-gray-200 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                                    <div className="px-5 py-3 border-b border-gray-100">
                                        <p className="text-theme-sm font-semibold text-gray-900">Rafia Niamat</p>
                                        <p className="text-theme-xs text-gray-500 truncate">rafia@gmail.com</p>
                                    </div>

                                    <div className="py-1">
                                        <Link to="/profile" className="flex items-center gap-3 px-5 py-2.5 text-theme-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors">
                                            <User className="w-4 h-4" />
                                            Your Profile
                                        </Link>
                                        <Link to="/settings" className="flex items-center gap-3 px-5 py-2.5 text-theme-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors">
                                            <Settings className="w-4 h-4" />
                                            Account Settings
                                        </Link>
                                    </div>

                                    <div className="border-t border-gray-100 my-1"></div>

                                    <div className="py-1">
                                        <button
                                            onClick={logout}
                                            className="w-full flex items-center gap-3 px-5 py-2.5 text-theme-sm text-error-600 hover:bg-error-50 transition-colors text-left"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
