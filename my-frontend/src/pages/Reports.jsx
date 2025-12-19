import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Download, Calendar, TrendingUp, DollarSign } from 'lucide-react';

const Reports = () => {
    const data = [
        { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
        { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
        { name: 'Mar', revenue: 2000, expenses: 9800, profit: -7800 },
        { name: 'Apr', revenue: 2780, expenses: 3908, profit: -1128 },
        { name: 'May', revenue: 1890, expenses: 4800, profit: -2910 },
        { name: 'Jun', revenue: 2390, expenses: 3800, profit: -1410 },
        { name: 'Jul', revenue: 3490, expenses: 4300, profit: -810 },
    ];

    const stats = [
        { title: 'Total Revenue', value: '$124,500', change: '+12.5%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' },
        { title: 'Net Profit', value: '$45,200', change: '+5.2%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/20' },
        { title: 'Total Orders', value: '1,240', change: '-2.1%', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/20' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Reports</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Overview of company performance.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                    <Download className="w-4 h-4" />
                    Export PDF
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-theme-xs">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Revenue Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-theme-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Revenue Overview</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Profit/Loss Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-theme-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Profit Analysis</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Reports;
