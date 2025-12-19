import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, MapPin, Link as LinkIcon, Calendar } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    // Fallback if user is null (though should be redirected)
    const userData = user || { name: 'Guest', email: 'guest@example.com', role: 'Visitor', avatar: '' };

    return (
        <div className="max-w-4xl mx-auto space-y-6">

            {/* Header Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-theme-sm overflow-hidden">
                <div className="h-32 bg-linear-to-r from-brand-500 to-purple-600"></div>
                <div className="px-6 pb-6">
                    <div className="relative flex items-end -mt-12 mb-4">
                        <img
                            src={userData.avatar}
                            alt={userData.name}
                            className="w-24 h-24 rounded-xl border-4 border-white dark:border-gray-800 bg-white shadow-md object-cover"
                        />
                        <div className="ml-4 mb-1">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{userData.name}</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{userData.role}</p>
                        </div>
                        <div className="ml-auto mb-2">
                            <button className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-theme-xs p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">About</h3>
                        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-gray-400" />
                                {userData.email}
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                San Francisco, CA
                            </div>
                            <div className="flex items-center gap-3">
                                <LinkIcon className="w-4 h-4 text-gray-400" />
                                <a href="#" className="text-brand-600 hover:underline">analytics.io</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                Joined December 2025
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (Activity/Details) */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-theme-xs p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 mt-2"></div>
                                        <div className="w-px h-full bg-gray-200 dark:bg-gray-700 my-1"></div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-800 dark:text-gray-200">Updated the <span className="font-medium">Q4 Report</span> settings.</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;
