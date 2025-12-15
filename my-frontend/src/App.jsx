import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import KeyMetricsCards from "./components/KeyMetricsCards";

const App = () => {
  return (
    <Router>
      {/* Navbar stays at the top on all pages */}
      <Navbar />
      
      {/* Main Dashboard Content */}
      <main className="min-h-screen bg-gray-50">
        {/* Key Metrics Cards positioned below navbar */}
        <KeyMetricsCards />
      </main>
    </Router>
  );
};

export default App;
