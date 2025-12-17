import React from 'react';
import TrendsLineChart from './charts/TrendsLineChart';
import CategoryBarChart from './charts/CategoryBarChart';
import DistributionPieChart from './charts/DistributionPieChart';
import StackedAreaChart from './charts/StackedAreaChart';

const DashboardCharts = ({ filters }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Row 1 */}
                <TrendsLineChart />
                <CategoryBarChart />

                {/* Row 2 */}
                <StackedAreaChart />
                <DistributionPieChart />
            </div>
        </div>
    );
};

export default DashboardCharts;
