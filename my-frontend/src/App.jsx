import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      {/* Navbar stays at the top on all pages */}
      <Navbar />
    </Router>
  );
};

export default App;
