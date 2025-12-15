import React, { useState } from 'react';
import KeyMetricsCards from './KeyMetricsCards';
import RefinedFilters from './RefinedFilters';
import AnimationsDemo from './AnimationsDemo';

const RefinedDashboard = () => {
  const [filters, setFilters] = useState({
    dateRange: 'Last Week',
    category: 'All'
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Here you would typically trigger data updates
    console.log('Filters changed:', newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filters Section */}
      <RefinedFilters onFilterChange={handleFilterChange} />
      
      {/* Key Metrics Cards */}
      <KeyMetricsCards />
      
      {/* Animations Demo */}
      <AnimationsDemo />
    </div>
  );
};

export default RefinedDashboard;