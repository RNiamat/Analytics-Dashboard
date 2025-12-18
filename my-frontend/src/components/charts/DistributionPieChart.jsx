import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

const data = [
    { name: 'Mobile', value: 400 },
    { name: 'Desktop', value: 300 },
    { name: 'Tablet', value: 300 },
    { name: 'Other', value: 200 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];
// brand-500, emerald-500, amber-500, red-500

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xl">
                <div className="flex items-center gap-2 text-sm">
                    <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: payload[0].payload.fill }}
                    />
                    <span className="text-gray-500 dark:text-gray-400">{payload[0].name}:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                        {payload[0].value} users
                    </span>
                </div>
            </div>
        );
    }
    return null;
};

const DistributionPieChart = () => {
    const { isDark } = useTheme();

    return (
        <div className="w-full h-[400px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-100 dark:hover:border-brand-900">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Device Distribution</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">User sessions by device type</p>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value, entry) => (
                                <span className={`text-sm ml-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{value}</span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DistributionPieChart;
