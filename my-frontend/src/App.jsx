import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import FiltersDatePicker from "./components/FiltersDatePicker";
import MetricsOverview from "./components/MetricsOverview";
import AnimationsShowcase from "./components/AnimationsShowcase";

const App = () => {
  return (
    <Router>
      {/* Navbar stays at the top on all pages */}
      <Navbar />
      
      {/* Main Content */}
      <main className="min-h-screen bg-gray-50">
        {/* Filters positioned above dashboard content */}
        <FiltersDatePicker />
        
        {/* Dashboard Cards */}
        <MetricsOverview />
        
        {/* Animations & Interactivity Showcase */}
        <AnimationsShowcase />
      </main>
    </Router>
  );
};

export default App;
