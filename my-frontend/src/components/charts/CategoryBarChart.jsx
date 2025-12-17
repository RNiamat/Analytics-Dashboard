import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const data = [
    { name: 'Electronics', sales: 4000, target: 2400 },
    { name: 'Clothing', sales: 3000, target: 1398 },
    { name: 'Books', sales: 2000, target: 9800 },
    { name: 'Home', sales: 2780, target: 3908 },
    { name: 'Sports', sales: 1890, target: 4800 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xl">
                <p className="font-medium text-gray-900 mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-gray-500 capitalize">{entry.name}:</span>
                        <span className="font-medium text-gray-900">
                            {entry.value.toLocaleString()} units
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const CategoryBarChart = () => {
    return (
        <div className="w-full h-[400px] rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-100">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Category Performance</h3>
                <p className="text-sm text-gray-500">Sales vs Target by Category</p>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        barSize={32}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F9FAFB' }} />
                        <Legend verticalAlign="top" height={36} iconType="circle" />
                        <Bar
                            dataKey="sales"
                            name="Actual Sales"
                            fill="#6366f1" // brand-500
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="target"
                            name="Target"
                            fill="#e0e7ff" // brand-100
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CategoryBarChart;
