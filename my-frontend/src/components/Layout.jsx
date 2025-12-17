import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
                {/* Navbar - Pass Props to Handle Sidebar Toggle */}
                <Navbar
                    onMenuClick={() => setIsMobileOpen(true)}
                />

                {/* Page Content */}
                <main className="flex-1 px-4 lg:px-6 py-4 overflow-x-hidden relative z-0">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
