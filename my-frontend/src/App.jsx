import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./Components/Navbar";
import RefinedFilters from "./Components/RefinedFilters";
import KeyMetricsCards from "./Components/KeyMetricsCards";
import { FilterProvider } from "./contexts/FilterContext";

const App = () => {
  return (
    <Router>
      <FilterProvider>
        {/* Navbar stays at the top on all pages */}
        <Navbar />

        {/* Main Dashboard Content */}
        <main className="min-h-screen bg-gray-50 font-sans">
          {/* Filters positioned above dashboard content */}
          <RefinedFilters />

          {/* Key Metrics Cards */}
          <KeyMetricsCards />
        </main>
      </FilterProvider>
    </Router>
  );
};

export default App;
