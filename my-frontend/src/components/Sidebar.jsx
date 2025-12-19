import React, { useState, useRef } from 'react';
import { Layout, FileText, Settings, ChevronLeft, ChevronRight, X, Award, LogOut, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useClickOutside from '../hooks/useClickOutside';

const Sidebar = ({ isMobileOpen, setIsMobileOpen, isCollapsed, setIsCollapsed }) => {
    const location = useLocation();
    const sidebarRef = useRef(null);

    // Close sidebar when clicking outside (Mobile: Close, Desktop: Collapse)
    useClickOutside(sidebarRef, () => {
        if (isMobileOpen) setIsMobileOpen(false);
    });

    const menuItems = [
        { name: 'Dashboard', icon: Layout, path: '/' },
        { name: 'Reports', icon: FileText, path: '/reports' },
        { name: 'Users', icon: User, path: '/users' },
    ];

    const bottomItems = [
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-[60] bg-gray-900/50 backdrop-blur-sm transition-opacity lg:hidden"
                />
            )}

            {/* Sidebar Component */}
            <aside
                ref={sidebarRef}
                onMouseEnter={() => window.innerWidth >= 1024 && setIsCollapsed(false)}
                onMouseLeave={() => window.innerWidth >= 1024 && setIsCollapsed(true)}
                className={`
          fixed top-0 left-0 z-[70] h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-theme-lg transition-all duration-300 ease-in-out
          w-72
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:sticky lg:top-0 lg:shadow-none
          ${isCollapsed ? 'lg:w-20' : 'lg:w-72'}
        `}
            >
                <div className="flex flex-col h-full">

                    {/* Header / Logo */}
                    <div className={`flex items-center h-16 px-4 border-b border-gray-100 dark:border-gray-800 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                        <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
                            <div className="bg-linear-to-tr from-brand-600 to-brand-400 p-2 rounded-lg shrink-0">
                                <Award className="w-6 h-6 text-white" />
                            </div>
                            {!isCollapsed && (
                                <span className="text-xl font-bold text-gray-900 dark:text-white lg:block hidden">Analytica</span>
                            )}
                        </div>

                        {/* Mobile Close Button */}
                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="lg:hidden p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation Items - Scrollable */}
                    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                    ${isActive
                                            ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                                        }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                                >
                                    <item.icon
                                        className={`
                      w-5 h-5 shrink-0 transition-colors
                      ${isActive ? 'text-brand-600' : 'text-gray-500 group-hover:text-gray-700'}
                    `}
                                    />

                                    {!isCollapsed && (
                                        <span className="font-medium whitespace-nowrap overflow-hidden">
                                            {item.name}
                                        </span>
                                    )}

                                    {/* Tooltip for collapsed state */}
                                    {isCollapsed && (
                                        <div className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                                            {item.name}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Section: Settings, Logout, User Profile */}
                    <div className="p-3 border-t border-gray-100 dark:border-gray-800 space-y-1">
                        {bottomItems.map((item) => {
                            const isLogOut = item.name === 'Log Out';
                            const isActive = !isLogOut && location.pathname === item.path;
                            const Component = isLogOut ? 'button' : Link;
                            const props = isLogOut ? { onClick: item.onClick } : { to: item.path };

                            return (
                                <Component
                                    key={item.name}
                                    {...props}
                                    className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group w-full
                        ${isLogOut
                                            ? 'text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20'
                                            : isActive
                                                ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                                        }
                        ${isCollapsed ? 'justify-center' : ''}
                    `}
                                >
                                    <item.icon className="w-5 h-5 shrink-0" />
                                    {!isCollapsed && <span className="font-medium whitespace-nowrap overflow-hidden">{item.name}</span>}
                                    {isCollapsed && (
                                        <div className="absolute left-16 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                                            {item.name}
                                        </div>
                                    )}
                                </Component>
                            );
                        })}
                    </div>

                </div>
            </aside>
        </>
    );
};
export default Sidebar;
