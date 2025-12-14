import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import MetricsOverview from "./components/MetricsOverview";

const App = () => {
  return (
    <Router>
      {/* Navbar stays at the top on all pages */}
      <Navbar />
      
      {/* Main Content */}
      <main className="min-h-screen bg-gray-50">
        <MetricsOverview />
      </main>
    </Router>
  );
};

export default App;
