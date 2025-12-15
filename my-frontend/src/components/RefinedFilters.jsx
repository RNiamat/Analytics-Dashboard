import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const RefinedFilters = ({ onFilterChange }) => {
  const [activeRange, setActiveRange] = useState('Last Week');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCustomRange, setShowCustomRange] = useState(false);

  const dateRanges = ['Today', 'Last Week', 'Last Month'];
  const categories = ['All', 'Sales', 'Users', 'Marketing'];

  const handleRangeChange = (range) => {
    setActiveRange(range);
    setShowCustomRange(false);
    // Trigger parent component update
    if (onFilterChange) {
      onFilterChange({ dateRange: range, category: selectedCategory });
    }
  };

  const handleCustomRange = () => {
    setActiveRange('Custom');
    setShowCustomRange(true);
    if (onFilterChange) {
      onFilterChange({ dateRange: 'Custom', category: selectedCategory });
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (onFilterChange) {
      onFilterChange({ dateRange: activeRange, category });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          {/* Date Range Selector */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex gap-2">
              {dateRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => handleRangeChange(range)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeRange === range
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range}
                </button>
              ))}
              
              <button
                onClick={handleCustomRange}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeRange === 'Custom'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Custom
              </button>
            </div>

            {/* Custom Date Range Inputs */}
            {showCustomRange && (
              <div className="flex gap-2 animate-in slide-in-from-top-2 fade-in duration-200">
                <input
                  type="date"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Category:</label>
            <div className="flex gap-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefinedFilters;