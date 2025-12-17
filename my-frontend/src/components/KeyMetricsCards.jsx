import React from 'react';
import { Users, DollarSign, TrendingUp, ShoppingCart, ArrowUp, ArrowDown, Activity, Target } from 'lucide-react';
import { useFilters } from '../contexts/FilterContext';

const KeyMetricsCards = () => {
  const { metrics, category } = useFilters();

  // Dynamic metrics based on category
  const getMetricsConfig = () => {
    switch (category) {
      case 'Sales':
        return [
          {
            name: 'Total Revenue',
            value: `$${metrics.totalValue.toLocaleString()}`,
            trend: metrics.trend,
            icon: DollarSign,
          },
          {
            name: 'Orders',
            value: metrics.totalCount.toLocaleString(),
            trend: metrics.trend + 2,
            icon: ShoppingCart,
          },
          {
            name: 'Avg Order Value',
            value: `$${metrics.averageValue.toLocaleString()}`,
            trend: metrics.trend - 1,
            icon: TrendingUp,
          },
          {
            name: 'Growth Rate',
            value: `${Math.abs(metrics.trend).toFixed(1)}%`,
            trend: metrics.trend,
            icon: Activity,
          },
        ];
      case 'Users':
        return [
          {
            name: 'Active Users',
            value: metrics.totalValue.toLocaleString(),
            trend: metrics.trend,
            icon: Users,
          },
          {
            name: 'New Signups',
            value: metrics.totalCount.toLocaleString(),
            trend: metrics.trend + 3,
            icon: Target,
          },
          {
            name: 'Avg Engagement',
            value: `${metrics.averageValue.toLocaleString()}`,
            trend: metrics.trend - 2,
            icon: Activity,
          },
          {
            name: 'Growth Rate',
            value: `${Math.abs(metrics.trend).toFixed(1)}%`,
            trend: metrics.trend,
            icon: TrendingUp,
          },
        ];
      case 'Marketing':
        return [
          {
            name: 'Campaign Spend',
            value: `$${metrics.totalValue.toLocaleString()}`,
            trend: metrics.trend,
            icon: DollarSign,
          },
          {
            name: 'Impressions',
            value: `${(metrics.totalCount / 1000).toFixed(1)}K`,
            trend: metrics.trend + 5,
            icon: Activity,
          },
          {
            name: 'Avg Cost',
            value: `$${metrics.averageValue.toLocaleString()}`,
            trend: metrics.trend - 3,
            icon: Target,
          },
          {
            name: 'ROI',
            value: `${(Math.abs(metrics.trend) * 2).toFixed(1)}%`,
            trend: metrics.trend,
            icon: TrendingUp,
          },
        ];
      default:
        return [];
    }
  };

  const metricsConfig = getMetricsConfig();

  console.log('Metrics:', metrics);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 relative z-0">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {metricsConfig.map((metric, index) => {
          const IconComponent = metric.icon;
          const isPositive = metric.trend > 0;

          return (
            <div
              key={index}
              className="group relative flex flex-col justify-between rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-100 dark:hover:border-brand-900 cursor-pointer overflow-hidden"
            >
              {/* Hover Bottom Border Indicator */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-brand-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>

              {/* Top Row: Icon and Trend */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50/80 dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors duration-300 group-hover:bg-brand-50 dark:group-hover:bg-brand-900/20 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  <IconComponent className="h-6 w-6" />
                </div>

                <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium 
                  ${isPositive ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'}`
                }>
                  {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {Math.abs(metric.trend).toFixed(1)}%
                </div>
              </div>

              {/* Middle Row: Name and Value */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{metric.name}</h3>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</div>
              </div>

              {/* Bottom Row: Comparison Text - Reveals on Hover */}
              <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-4 group-hover:pt-3 group-hover:border-t group-hover:border-gray-50 dark:group-hover:border-gray-800">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>Compared to last week</span>
                  <span className={`ml-1 font-medium ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {isPositive ? '+' : ''}{metric.trend}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeyMetricsCards;
