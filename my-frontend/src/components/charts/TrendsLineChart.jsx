import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

const data = [
    { name: 'Mon', value: 4000, organic: 2400 },
    { name: 'Tue', value: 3000, organic: 1398 },
    { name: 'Wed', value: 2000, organic: 9800 },
    { name: 'Thu', value: 2780, organic: 3908 },
    { name: 'Fri', value: 1890, organic: 4800 },
    { name: 'Sat', value: 2390, organic: 3800 },
    { name: 'Sun', value: 3490, organic: 4300 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xl">
                <p className="font-medium text-gray-900 dark:text-white mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-gray-500 dark:text-gray-400 capitalize">{entry.name}:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                            {entry.name === 'value' || entry.name === 'organic' ?
                                `$${entry.value.toLocaleString()}` : entry.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const TrendsLineChart = () => {
    const { isDark } = useTheme();

    return (
        <div className="w-full h-[400px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-100 dark:hover:border-brand-900">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trends</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Weekly performance comparison</p>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#374151" : "#E5E7EB"} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            verticalAlign="top"
                            height={36}
                            iconType="circle"
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            name="Total Revenue"
                            stroke="#6366f1" // brand-500
                            strokeWidth={3}
                            dot={{ fill: '#6366f1', strokeWidth: 2, r: 4, stroke: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="organic"
                            name="Organic"
                            stroke="#10b981" // emerald-500
                            strokeWidth={3}
                            dot={{ fill: '#10b981', strokeWidth: 2, r: 4, stroke: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TrendsLineChart;
