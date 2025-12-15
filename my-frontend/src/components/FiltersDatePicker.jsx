import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, Filter, RefreshCw, Check, Sparkles, Zap } from 'lucide-react';

const FiltersDatePicker = () => {
  const [activeRange, setActiveRange] = useState('Last Month');
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [selectedSource, setSelectedSource] = useState('All Sources');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedProduct, setSelectedProduct] = useState('All Products');
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [newUsersOnly, setNewUsersOnly] = useState(false);
  const [activeCustomersOnly, setActiveCustomersOnly] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [filterCount, setFilterCount] = useState(0);

  // Animation trigger on mount
  useEffect(() => {
    setIsVisible(true);
    // Count active filters
    let count = 0;
    if (selectedSource !== 'All Sources') count++;
    if (selectedRegion !== 'All Regions') count++;
    if (selectedProduct !== 'All Products') count++;
    if (newUsersOnly) count++;
    if (activeCustomersOnly) count++;
    setFilterCount(count);
  }, [selectedSource, selectedRegion, selectedProduct, newUsersOnly, activeCustomersOnly]);

  // Pulse effect when filters change
  useEffect(() => {
    if (filterCount > 0) {
      setPulseEffect(true);
      const timer = setTimeout(() => setPulseEffect(false), 600);
      return () => clearTimeout(timer);
    }
  }, [filterCount]);

  const dateRanges = ['Today', 'Last Week', 'Last Month'];
  
  const sourceOptions = ['All Sources', 'Organic Search', 'Social Media', 'Email Campaign', 'Direct Traffic'];
  const regionOptions = ['All Regions', 'North America', 'Europe', 'Asia Pacific', 'Latin America'];
  const productOptions = ['All Products', 'Analytics Pro', 'Dashboard Basic', 'Enterprise Suite', 'Mobile App'];

  const handleRangeSelect = (range) => {
    setActiveRange(range);
    setShowCustomRange(false);
    // Add ripple effect
    setPulseEffect(true);
    setTimeout(() => setPulseEffect(false), 300);
  };

  const handleCustomRangeClick = () => {
    setActiveRange('Custom Range');
    setShowCustomRange(true);
    // Add ripple effect
    setPulseEffect(true);
    setTimeout(() => setPulseEffect(false), 300);
  };

  const handleApplyFilters = () => {
    setIsApplying(true);
    // Simulate API call with success animation
    setTimeout(() => {
      setIsApplying(false);
      // Success pulse
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 600);
    }, 1500);
  };

  const DropdownMenu = ({ 
    isOpen, 
    setIsOpen, 
    selected, 
    setSelected, 
    options, 
    placeholder 
  }) => (
    <div className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-indigo-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
      >
        <span className="truncate">{selected}</span>
        <ChevronDown className={`w-4 h-4 ml-2 transition-all duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : 'text-gray-400'}`} />
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
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-auto animate-in slide-in-from-top-2 fade-in duration-200">
          {options.map((option, index) => (
            <button
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`w-full px-4 py-3 text-sm text-left hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 transform hover:scale-[1.02] animate-in slide-in-from-left-1 fade-in ${
                selected === option ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 font-medium border-l-4 border-indigo-500' : 'text-gray-700'
              } ${index === 0 ? 'rounded-t-xl' : ''} ${index === options.length - 1 ? 'rounded-b-xl' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {option}
                  {selected === option && <Sparkles className="w-3 h-3 text-indigo-500" />}
                </span>
                {selected === option && <Check className="w-4 h-4 text-indigo-600" />}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className={`bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm p-6 transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${pulseEffect ? 'ring-4 ring-indigo-200 ring-opacity-50 shadow-xl' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white transition-all duration-300 ${pulseEffect ? 'animate-pulse scale-110' : ''}`}>
              <Filter className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Dashboard Filters</h2>
              {filterCount > 0 && (
                <p className="text-sm text-indigo-600 animate-in slide-in-from-left-2 fade-in duration-300">
                  {filterCount} filter{filterCount !== 1 ? 's' : ''} active
                </p>
              )}
            </div>
          </div>
          
          {/* Filter count badge */}
          {filterCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full animate-in zoom-in duration-300">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">{filterCount}</span>
            </div>
          )}
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
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeRange === range
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range}
                </button>
              ))}
              
              {/* Custom Range Button */}
              <button
                onClick={handleCustomRangeClick}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeRange === 'Custom Range'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Custom Range
              </button>
            </div>

            {/* Custom Date Range Inputs */}
            {showCustomRange && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">Start Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      defaultValue="2024-01-01"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">End Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      defaultValue="2024-12-31"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Category Filters */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Category Filters</h3>
            
            {/* Dropdown Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Source</label>
                <DropdownMenu
                  isOpen={showSourceDropdown}
                  setIsOpen={setShowSourceDropdown}
                  selected={selectedSource}
                  setSelected={setSelectedSource}
                  options={sourceOptions}
                  placeholder="Select Source"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Region</label>
                <DropdownMenu
                  isOpen={showRegionDropdown}
                  setIsOpen={setShowRegionDropdown}
                  selected={selectedRegion}
                  setSelected={setSelectedRegion}
                  options={regionOptions}
                  placeholder="Select Region"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Product</label>
                <DropdownMenu
                  isOpen={showProductDropdown}
                  setIsOpen={setShowProductDropdown}
                  selected={selectedProduct}
                  setSelected={setSelectedProduct}
                  options={productOptions}
                  placeholder="Select Product"
                />
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">New Users Only</label>
                <button
                  onClick={() => setNewUsersOnly(!newUsersOnly)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    newUsersOnly ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      newUsersOnly ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Active Customers Only</label>
                <button
                  onClick={() => setActiveCustomersOnly(!activeCustomersOnly)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    activeCustomersOnly ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      activeCustomersOnly ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Filters Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Charts and cards update dynamically based on your filter selections
            </div>
            
            <button
              onClick={handleApplyFilters}
              disabled={isApplying}
              className={`flex items-center gap-2 px-6 py-2 text-sm font-medium rounded-lg transition-all ${
                isApplying
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isApplying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Applying...
                </>
              ) : (
                <>
                  <Filter className="w-4 h-4" />
                  Apply Filters
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersDatePicker;