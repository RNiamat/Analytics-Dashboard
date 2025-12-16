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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {metricsConfig.map((metric, index) => {
          const IconComponent = metric.icon;
          const isPositive = metric.trend > 0;

          return (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 transition-all duration-500 hover:shadow-theme-md transform hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 ${category === 'Sales' ? 'bg-blue-100' :
                  category === 'Users' ? 'bg-green-100' :
                    'bg-purple-100'
                }`}>
                <IconComponent className={`size-6 transition-all duration-500 ${category === 'Sales' ? 'text-blue-600' :
                    category === 'Users' ? 'text-green-600' :
                      'text-purple-600'
                  }`} />
              </div>

              {/* Metric Value and Trend */}
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <span className="text-theme-sm text-gray-500">
                    {metric.name}
                  </span>
                  <h4 className="mt-2 text-title-sm font-bold text-gray-800 transition-all duration-500">
                    {metric.value}
                  </h4>
                </div>

                {/* Trend Badge */}
                <div className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-theme-xs font-medium transition-all duration-500 ${isPositive
                    ? 'bg-success-50 text-success-700'
                    : 'bg-error-50 text-error-700'
                  }`}>
                  {isPositive ? (
                    <ArrowUp className="size-3.5" />
                  ) : (
                    <ArrowDown className="size-3.5" />
                  )}
                  {Math.abs(metric.trend).toFixed(1)}%
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
