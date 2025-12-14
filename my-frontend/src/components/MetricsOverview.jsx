import React from 'react';
import { Users, DollarSign, UserPlus, FolderOpen, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MetricsOverview = () => {
  const metricsData = [
    {
      title: 'Total Users',
      value: '25,430',
      trend: 3.5,
      icon: Users,
      description: 'Compared to Last Month'
    },
    {
      title: 'Revenue',
      value: '$128,900',
      trend: -1.2,
      icon: DollarSign,
      description: 'View Detailed Report'
    },
    {
      title: 'New Signups',
      value: '450',
      trend: 15.0,
      icon: UserPlus,
      description: 'Compared to Last Month'
    },
    {
      title: 'Active Projects',
      value: '12',
      trend: 0.0,
      icon: FolderOpen,
      description: 'View Detailed Report'
    }
  ];

  const getTrendIcon = (trend) => {
    if (trend > 0) return TrendingUp;
    if (trend < 0) return TrendingDown;
    return Minus;
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const getTrendBgColor = (trend) => {
    if (trend > 0) return 'bg-green-50';
    if (trend < 0) return 'bg-red-50';
    return 'bg-gray-50';
  };

  const formatTrend = (trend) => {
    if (trend === 0) return '0.0%';
    return trend > 0 ? `+${trend}%` : `${trend}%`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => {
          const IconComponent = metric.icon;
          const TrendIcon = getTrendIcon(metric.trend);
          
          return (
            <div
              key={index}
              className="group relative bg-white rounded-lg shadow-md border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:-translate-y-1 cursor-pointer"
            >
              {/* Main Content */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 truncate">
                      {metric.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-gray-900">
                      {metric.value}
                    </p>
                    
                    <div className="flex items-center gap-1">
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${getTrendBgColor(metric.trend)}`}>
                        <TrendIcon className={`w-3 h-3 ${getTrendColor(metric.trend)}`} />
                        <span className={`text-xs font-medium ${getTrendColor(metric.trend)}`}>
                          {formatTrend(metric.trend)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hidden Details - Appears on Hover */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-50 to-transparent rounded-b-lg p-4 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-2">{metric.description}</p>
                  <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                    View Details →
                  </button>
                </div>
              </div>

              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MetricsOverview;