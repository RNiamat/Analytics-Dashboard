import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Layout from "./components/Layout";
import KeyMetricsCards from "./components/KeyMetricsCards";
import RefinedFilters from "./components/RefinedFilters";
import DataTable from "./components/DataTable";
import DashboardCharts from "./components/DashboardCharts";
import { FilterProvider } from "./contexts/FilterContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import NotificationContainer from "./components/NotificationContainer";
import { useNotification } from "./contexts/NotificationContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import Login from "./pages/Login";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import NotificationsPage from "./pages/NotificationsPage";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const App = () => {
  const { addNotification } = useNotification();
  const hasNotified = useRef(false);

  useEffect(() => {
    if (!hasNotified.current) {
      addNotification('info', 'Welcome to the Dashboard! 🚀');
      hasNotified.current = true;
    }
  }, [addNotification]);

  const checkThreshold = () => {
    const value = Math.random() * 100;
    if (value > 80) {
      addNotification('warning', `High usage detected: ${value.toFixed(1)}% usage!`);
    } else if (value < 20) {
      addNotification('success', `System running efficiently: ${value.toFixed(1)}% load.`);
    } else {
      addNotification('info', `Current system load: ${value.toFixed(1)}%.`);
    }
  };

  const Dashboard = () => (
    <>
      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* Key Metrics Cards */}
        <KeyMetricsCards />

        {/* Filters */}
        <RefinedFilters />
      </div>

      {/* Analytics Charts (Static Dummy Data) */}
      <DashboardCharts />

      {/* Data Table */}
      <div className="mt-8">
        <DataTable />
      </div>

      {/* Test Controls */}
      <div className="flex justify-end mb-4">
        <button
          onClick={checkThreshold}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors text-sm font-medium"
        >
          Test System Alert
        </button>
      </div>
    </>
  );

  const PlaceholderPage = ({ title }) => (
    <div className="flex flex-col items-center justify-center h-96 text-gray-500 dark:text-gray-400">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p>This page is under construction.</p>
    </div>
  );

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <FilterProvider>
            {/* Notifications - Moved outside Layout to avoid stacking context issues */}
            <NotificationContainer />

            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout><Outlet /></Layout>}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<PlaceholderPage title="404 - Not Found" />} />
                </Route>
              </Route>
            </Routes>

          </FilterProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
