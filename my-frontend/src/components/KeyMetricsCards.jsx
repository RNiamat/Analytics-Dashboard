import React from 'react';
import { Users, DollarSign, TrendingUp, ShoppingCart } from 'lucide-react';

const KeyMetricsCards = () => {
  const metrics = [
    {
      name: 'Users',
      value: '12,430',
      trend: 12.5,
      icon: Users
    },
    {
      name: 'Revenue',
      value: '$45,200',
      trend: -3.2,
      icon: DollarSign
    },
    {
      name: 'Growth',
      value: '8.7%',
      trend: 15.8,
      icon: TrendingUp
    },
    {
      name: 'Orders',
      value: '1,847',
      trend: 7.3,
      icon: ShoppingCart
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          const isPositive = metric.trend > 0;
          
          return (
            <div
              key={index}
              className="group bg-white rounded-lg shadow-md border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-b-4 hover:border-b-indigo-500"
            >
              {/* Icon and Trend */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-gray-100 group-hover:bg-indigo-100 transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-gray-600 group-hover:text-indigo-600 transition-colors duration-300" />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  isPositive 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  <span>{isPositive ? '↑' : '↓'}</span>
                  <span>{Math.abs(metric.trend)}%</span>
                </div>
              </div>
              
              {/* Metric Name and Value */}
              <div className="mb-3">
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  {metric.name}
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </p>
              </div>

              {/* Hover Text - Non-overlapping reveal */}
              <div className="h-0 overflow-hidden opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300">
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500 font-medium">
                    Compared to last week {isPositive ? '+' : ''}{metric.trend}%
                  </p>
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