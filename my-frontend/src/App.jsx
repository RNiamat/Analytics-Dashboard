import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Layout from "./components/Layout";
import KeyMetricsCards from "./components/KeyMetricsCards";
import RefinedFilters from "./components/RefinedFilters";
import DataTable from "./components/DataTable";
import { FilterProvider } from "./contexts/FilterContext";

import { ThemeProvider } from "./contexts/ThemeContext";

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <FilterProvider>
          <Layout>
            {/* Key Metrics Cards */}
            <KeyMetricsCards />

            {/* Filters positioned above dashboard content */}
            <RefinedFilters />

            {/* Data Table */}
            <div className="mt-8">
              <DataTable />
            </div>
          </Layout>
        </FilterProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
