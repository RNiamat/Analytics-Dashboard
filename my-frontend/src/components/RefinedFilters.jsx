import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, Filter, Check, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { useFilters } from '../contexts/FilterContext';

const RefinedFilters = () => {
  const {
    dateRange,
    category,
    setDateRange,
    setCategory,
    customStartDate,
    customEndDate,
    setCustomStartDate,
    setCustomEndDate,
    filteredDataPoints,
  } = useFilters();

  const [showCustomRange, setShowCustomRange] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);

  // Animation trigger on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Pulse effect when filters change
  useEffect(() => {
    setPulseEffect(true);
    const timer = setTimeout(() => setPulseEffect(false), 600);
    return () => clearTimeout(timer);
  }, [dateRange, category]);

  const dateRanges = ['Today', 'Last Week', 'Last Month'];
  const categoryOptions = ['Sales', 'Users', 'Marketing'];

  const handleRangeSelect = (range) => {
    setDateRange(range);
    setShowCustomRange(false);
  };

  const handleCustomRangeClick = () => {
    setDateRange('Custom');
    setShowCustomRange(true);
  };

  const DropdownMenu = ({
    isOpen,
    setIsOpen,
    selected,
    setSelected,
    options,
  }) => (
    <div className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-indigo-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
      >
        <span className="truncate">{selected}</span>
        <ChevronDown className={`w-4 h-4 ml-2 transition-all duration-300 ${isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`} />
      </button>

      {/* Animated backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/5 backdrop-blur-[1px] animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Animated dropdown */}
      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl max-h-60 overflow-auto animate-in slide-in-from-top-2 fade-in duration-200">
          {options.map((option, index) => (
            <button
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`w-full px-4 py-3 text-sm text-left hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 transition-all duration-200 transform hover:scale-[1.02] animate-in slide-in-from-left-1 fade-in ${selected === option ? 'bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 font-medium border-l-4 border-indigo-500' : 'text-gray-700 dark:text-gray-200'
                } ${index === 0 ? 'rounded-t-xl' : ''} ${index === options.length - 1 ? 'rounded-b-xl' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {option}
                  {selected === option && <Sparkles className="w-3 h-3 text-indigo-500" />}
                </span>
                {selected === option && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className={`bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        } ${pulseEffect ? 'ring-4 ring-indigo-200 dark:ring-indigo-900 ring-opacity-50 shadow-xl' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 text-white transition-all duration-300 ${pulseEffect ? 'animate-pulse scale-110' : ''}`}>
              <Filter className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard Filters</h2>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">
                {filteredDataPoints} data points in {category} · {dateRange}
              </p>
            </div>
          </div>

          {/* Active filters badge */}
          <div className="flex items-center gap-2 px-3 py-1 bg-linear-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full animate-in zoom-in duration-300">
            <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Live Updates</span>
          </div>
        </div>

        {/* Main Filter Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Date Range Selector */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Date Range</h3>

            {/* Quick Range Buttons */}
            <div className="flex flex-wrap gap-2">
              {dateRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => handleRangeSelect(range)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${dateRange === range
                    ? 'bg-indigo-600 text-white shadow-md scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                  {range}
                </button>
              ))}

              {/* Custom Range Button */}
              <button
                onClick={handleCustomRangeClick}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${dateRange === 'Custom'
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                <Calendar className="w-4 h-4" />
                Custom Range
              </button>
            </div>

            {/* Custom Date Range Inputs */}
            {showCustomRange && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2 fade-in duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={customStartDate || ''}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">End Date</label>
                    <input
                      type="date"
                      value={customEndDate || ''}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Category</h3>

            <div className="max-w-xs">
              <DropdownMenu
                isOpen={showCategoryDropdown}
                setIsOpen={setShowCategoryDropdown}
                selected={category}
                setSelected={setCategory}
                options={categoryOptions}
              />
            </div>

            {/* Category Description */}
            <div className="mt-4 p-4 bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">
                    {category === 'Sales' && 'Sales Analytics'}
                    {category === 'Users' && 'User Metrics'}
                    {category === 'Marketing' && 'Marketing Performance'}
                  </p>
                  <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">
                    {category === 'Sales' && 'Track revenue, orders, and sales performance'}
                    {category === 'Users' && 'Monitor user growth, activity, and engagement'}
                    {category === 'Marketing' && 'Analyze campaign spend and marketing ROI'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>✨ Charts and metrics update dynamically</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">{filteredDataPoints} transactions loaded</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefinedFilters;