import React, { createContext, useContext, useState, useMemo } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [dateRange, setDateRange] = useState('Today');
  const [category, setCategory] = useState('Sales');
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);

  // Mock Data Logic based on Category
  const metrics = useMemo(() => {
    switch (category) {
      case 'Sales':
        return { totalValue: 45200, totalCount: 1847, averageValue: 24.5, trend: 12.5 };
      case 'Users':
        return { totalValue: 12430, totalCount: 450, averageValue: 1500, trend: 8.7 };
      case 'Marketing':
        return { totalValue: 8540, totalCount: 22000, averageValue: 3.2, trend: -3.2 };
      default:
        // Fallback default
        return { totalValue: 0, totalCount: 0, averageValue: 0, trend: 0 };
    }
  }, [category]);

  const filteredDataPoints = useMemo(() => {
    return Math.floor(Math.random() * 5000) + 1000; // Mock data points count
  }, [category, dateRange]);

  const value = {
    dateRange,
    setDateRange,
    category,
    setCategory,
    customStartDate,
    setCustomStartDate,
    customEndDate,
    setCustomEndDate,
    metrics,
    filteredDataPoints
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
