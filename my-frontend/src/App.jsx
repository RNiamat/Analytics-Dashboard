import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Layout from "./components/Layout";
import KeyMetricsCards from "./components/KeyMetricsCards";
import RefinedFilters from "./components/RefinedFilters";
import DataTable from "./components/DataTable";
import { FilterProvider } from "./contexts/FilterContext";

import NotificationContainer from "./components/NotificationContainer";
import { useNotification } from "./contexts/NotificationContext";
import { useEffect } from "react";

const App = () => {
  const { addNotification } = useNotification();

  useEffect(() => {
    // Welcome notification
    addNotification('info', 'Welcome to the Dashboard! 🚀');
  }, [addNotification]);

  // Mock threshold check function
  const checkThreshold = () => {
    // Simulating a threshold check
    const value = Math.random() * 100;
    if (value > 80) {
      addNotification('warning', `High usage detected: ${value.toFixed(1)}% usage!`);
    } else if (value < 20) {
      addNotification('success', `System running efficiently: ${value.toFixed(1)}% load.`);
    } else {
      addNotification('info', `Current system load: ${value.toFixed(1)}%.`);
    }
  };

  return (
    <Router>
      <FilterProvider>
        <Layout>
          <NotificationContainer />

          {/* Key Metrics Cards */}
          <KeyMetricsCards />

          {/* Filters positioned above dashboard content */}
          <RefinedFilters />

          {/* Test Controls (Hidden in production or temporary) */}
          <div className="flex justify-end mb-4">
            <button
              onClick={checkThreshold}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors text-sm font-medium"
            >
              Test System Alert
            </button>
          </div>

          {/* Data Table */}
          <div className="mt-8">
            <DataTable />
          </div>
        </Layout>
      </FilterProvider>
    </Router>
  );
};

export default App;
