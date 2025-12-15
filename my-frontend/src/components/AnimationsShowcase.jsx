import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, BarChart3, TrendingUp, Users, Eye, EyeOff, Menu, X, Settings, User, Bell, RefreshCw } from 'lucide-react';

const AnimationsShowcase = () => {
  // State for load-in animations
  const [isLoaded, setIsLoaded] = useState(false);
  const [chartLoaded, setChartLoaded] = useState(false);
  
  // State for toggle/expand functionality
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // State for staggered animations
  const [showCards, setShowCards] = useState(false);
  
  // State for enhanced animations
  const [chartUpdating, setChartUpdating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [chartData2, setChartData2] = useState([65, 78, 90, 81, 95]);

  // Trigger load-in animations on mount
  useEffect(() => {
    // Stagger the animations for better visual effect
    setTimeout(() => setIsLoaded(true), 100);
    setTimeout(() => setChartLoaded(true), 300);
    setTimeout(() => setShowCards(true), 500);
  }, []);

  // Sample data for demonstrations
  const chartData = [
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 78 },
    { label: 'Mar', value: 90 },
    { label: 'Apr', value: 81 },
    { label: 'May', value: 95 },
  ];

  const listItems = [
    { id: 1, title: 'Revenue Analytics', status: 'Active', trend: '+12%' },
    { id: 2, title: 'User Engagement', status: 'Processing', trend: '+8%' },
    { id: 3, title: 'Conversion Rates', status: 'Complete', trend: '+15%' },
    { id: 4, title: 'Traffic Sources', status: 'Pending', trend: '+3%' },
  ];

  // Enhanced table data
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', lastLogin: '1 day ago' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer', status: 'Inactive', lastLogin: '1 week ago' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Admin', status: 'Active', lastLogin: '5 minutes ago' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'Editor', status: 'Active', lastLogin: '3 hours ago' },
  ];

  // Function to simulate chart update
  const handleChartUpdate = () => {
    setChartUpdating(true);
    setTimeout(() => {
      setChartData2([Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100]);
      setChartUpdating(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-12">
        
        {/* Section Header with Load-in Animation */}
        <div className={`text-center transition-all duration-700 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Animations & Interactivity Showcase
          </h1>
          <p className="text-gray-600">
            Demonstrating smooth animations and interactive effects for dashboard components
          </p>
        </div>

        {/* 1. SUBTLE LOAD-IN ANIMATIONS FOR DATA/CHARTS */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
            1. Load-in Animations for Data & Charts
          </h2>
          
          {/* Chart Container with Fade-in and Slide-up */}
          <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100 transition-all duration-700 transform ${
            chartLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Revenue Chart</h3>
              <BarChart3 className="w-5 h-5 text-indigo-600" />
            </div>
            
            {/* Simulated Chart with Animated Bars */}
            <div className="space-y-4">
              {chartData.map((item, index) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="w-8 text-sm text-gray-600">{item.label}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000 ease-out ${
                        chartLoaded ? 'w-full' : 'w-0'
                      }`}
                      style={{ 
                        width: chartLoaded ? `${item.value}%` : '0%',
                        transitionDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                  <span className={`text-sm font-medium text-gray-700 transition-all duration-500 ${
                    chartLoaded ? 'opacity-100' : 'opacity-0'
                  }`} style={{ transitionDelay: `${index * 200 + 500}ms` }}>
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
            
            {/* Code Example Comment */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 font-mono">
                {/* Tailwind Classes Used: */}
                <span className="text-indigo-600">transition-all duration-700 transform</span> + 
                <span className="text-green-600"> translate-y-0 opacity-100</span> (loaded) / 
                <span className="text-red-600"> translate-y-4 opacity-0</span> (initial)
              </p>
            </div>
          </div>

          {/* Staggered Card Animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((card, index) => (
              <div
                key={card}
                className={`bg-white rounded-lg shadow-md p-6 border border-gray-100 transition-all duration-500 transform ${
                  showCards ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Metric {card}</h4>
                </div>
                <p className="text-2xl font-bold text-gray-900">1,{card}23</p>
                <p className="text-sm text-green-600">+{card * 2}% from last month</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. INTERACTIVE HOVER EFFECTS */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
            2. Interactive Hover Effects
          </h2>
          
          {/* Button Hover Effects */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Button Hover Effects</h3>
            <div className="flex flex-wrap gap-4">
              
              {/* Scale Effect Button */}
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-indigo-700 active:scale-95">
                Scale on Hover
              </button>
              
              {/* Gradient Shift Button */}
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl transform hover:-translate-y-1">
                Gradient Shift
              </button>
              
              {/* Glow Effect Button */}
              <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-emerald-700 hover:shadow-emerald-500/25 hover:shadow-2xl">
                Glow Effect
              </button>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 font-mono">
                Classes: <span className="text-indigo-600">hover:scale-105 hover:shadow-lg hover:-translate-y-1</span>
              </p>
            </div>
          </div>

          {/* List Item Hover Effects */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">List Item Hover Effects</h3>
            <div className="space-y-2">
              {listItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 transition-all duration-200 hover:bg-gray-50 hover:border-indigo-200 hover:translate-x-2 hover:shadow-md cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full transition-all duration-200 group-hover:scale-150 group-hover:bg-indigo-600"></div>
                    <div>
                      <h4 className="font-medium text-gray-800 group-hover:text-indigo-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500">{item.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-green-600">{item.trend}</span>
                    <TrendingUp className="w-4 h-4 text-green-600 transition-transform duration-200 group-hover:scale-110" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 font-mono">
                Classes: <span className="text-indigo-600">hover:bg-gray-50 hover:translate-x-2 hover:shadow-md</span>
              </p>
            </div>
          </div>
        </section>

        {/* 3. TOGGLE/EXPAND INTERACTIVITY */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
            3. Toggle/Expand Interactivity
          </h2>
          
          {/* Collapsible Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Advanced Analytics Details</h3>
                <p className="text-sm text-gray-600">Click to expand detailed metrics and insights</p>
              </div>
              <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-5 h-5 text-gray-600" />
              </div>
            </button>
            
            {/* Expandable Content with Height Animation */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-6 pt-0 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Performance Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Page Load Time</span>
                        <span className="font-medium">1.2s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bounce Rate</span>
                        <span className="font-medium">23%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Conversion Rate</span>
                        <span className="font-medium">4.8%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">User Insights</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active Users</span>
                        <span className="font-medium">12,430</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Session Duration</span>
                        <span className="font-medium">4m 32s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Return Visitors</span>
                        <span className="font-medium">68%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Visibility Example */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Sensitive Data View</h3>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showDetails ? 'Hide' : 'Show'} Details
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Revenue (YTD)</span>
                <span className={`font-medium transition-all duration-300 ${
                  showDetails ? 'opacity-100 blur-none' : 'opacity-50 blur-sm'
                }`}>
                  {showDetails ? '$2,847,392' : '••••••••'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Profit Margin</span>
                <span className={`font-medium transition-all duration-300 ${
                  showDetails ? 'opacity-100 blur-none' : 'opacity-50 blur-sm'
                }`}>
                  {showDetails ? '34.2%' : '••••'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Customer LTV</span>
                <span className={`font-medium transition-all duration-300 ${
                  showDetails ? 'opacity-100 blur-none' : 'opacity-50 blur-sm'
                }`}>
                  {showDetails ? '$1,247' : '••••••'}
                </span>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-gray-900 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">JavaScript Toggle Implementation</h3>
            <pre className="text-sm overflow-x-auto">
              <code className="text-green-400">{`// React State Management
const [isExpanded, setIsExpanded] = useState(false);

// Toggle Function
const handleToggle = () => setIsExpanded(!isExpanded);

// Tailwind Classes for Animation
className={\`transition-all duration-500 ease-in-out overflow-hidden \${
  isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
}\`}`}</code>
            </pre>
          </div>
        </section>

        {/* 4. ENHANCED HOVER EFFECTS */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
            4. Enhanced Hover Effects
          </h2>
          
          {/* Enhanced Dashboard Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Enhanced Dashboard Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Total Revenue', value: '$45,231', change: '+12%', icon: '💰', color: 'indigo' },
                { title: 'Active Users', value: '8,429', change: '+8%', icon: '👥', color: 'emerald' },
                { title: 'Conversion Rate', value: '3.24%', change: '+15%', icon: '📈', color: 'purple' }
              ].map((card, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl shadow-md border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:bg-gradient-to-br hover:from-white hover:to-gray-50 hover:border-indigo-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`text-2xl p-3 rounded-lg bg-${card.color}-50 group-hover:bg-${card.color}-100 transition-colors duration-300`}>
                      {card.icon}
                    </div>
                    <div className={`text-sm font-medium px-2 py-1 rounded-full bg-green-100 text-green-700 group-hover:bg-green-200 transition-colors duration-300`}>
                      {card.change}
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors duration-300">
                    {card.value}
                  </p>
                  <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-${card.color}-400 to-${card.color}-600 rounded-full transition-all duration-500 group-hover:w-full`} 
                         style={{ width: '60%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Table with Row Hover */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Enhanced Table with Row Hover</h3>
              <p className="text-sm text-gray-600 mt-1">Smooth hover effects on table rows</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tableData.map((user, index) => (
                    <tr 
                      key={user.id}
                      className="transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md cursor-pointer group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm group-hover:scale-110 transition-transform duration-200">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 group-hover:text-indigo-700 transition-colors duration-200">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500 group-hover:text-indigo-600 transition-colors duration-200">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 group-hover:bg-indigo-100 group-hover:text-indigo-800 transition-colors duration-200">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors duration-200 ${
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-800 group-hover:bg-green-200' 
                            : 'bg-red-100 text-red-800 group-hover:bg-red-200'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-indigo-600 transition-colors duration-200">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 group-hover:scale-110 transform">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5. TRANSITION ANIMATIONS FOR CHART UPDATES */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
            5. Chart Update Transitions
          </h2>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Live Chart with Update Animation</h3>
              <button
                onClick={handleChartUpdate}
                disabled={chartUpdating}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
              >
                <RefreshCw className={`w-4 h-4 ${chartUpdating ? 'animate-spin' : ''}`} />
                {chartUpdating ? 'Updating...' : 'Update Data'}
              </button>
            </div>
            
            {/* Chart with Update Animation */}
            <div className={`space-y-4 transition-all duration-500 ${
              chartUpdating ? 'opacity-50 scale-95 blur-sm' : 'opacity-100 scale-100 blur-none'
            }`}>
              {chartData2.map((value, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="w-12 text-sm text-gray-600">Q{index + 1}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000 ease-out ${
                        chartUpdating ? 'animate-pulse' : ''
                      }`}
                      style={{ 
                        width: `${value}%`,
                        transitionDelay: chartUpdating ? '0ms' : `${index * 100}ms`
                      }}
                    />
                  </div>
                  <span className={`text-sm font-medium text-gray-700 transition-all duration-300 ${
                    chartUpdating ? 'opacity-0' : 'opacity-100'
                  }`} style={{ transitionDelay: `${index * 100 + 500}ms` }}>
                    {Math.round(value)}%
                  </span>
                </div>
              ))}
            </div>

            {/* Update Indicator */}
            {chartUpdating && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
                <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium text-gray-700">Updating chart data...</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 6. SLIDE-IN SIDEBAR AND SMOOTH DROPDOWNS */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
            6. Slide-in Sidebar & Smooth Dropdowns
          </h2>
          
          {/* Sidebar Demo */}
          <div className="relative bg-white rounded-xl shadow-lg p-6 border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Slide-in Sidebar Demo</h3>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                <Menu className="w-4 h-4" />
                {sidebarOpen ? 'Close' : 'Open'} Sidebar
              </button>
            </div>
            
            <div className="relative h-64 bg-gray-50 rounded-lg overflow-hidden">
              <div className="p-4 text-gray-600">
                <p>Main content area. Click "Open Sidebar" to see the slide-in animation.</p>
                <p className="mt-2 text-sm">The sidebar will slide in from the right with a smooth transform animation.</p>
              </div>
              
              {/* Backdrop */}
              {sidebarOpen && (
                <div 
                  className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
                  onClick={() => setSidebarOpen(false)}
                />
              )}
              
              {/* Sidebar */}
              <div className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl border-l border-gray-200 transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : 'translate-x-full'
              }`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold text-gray-800">Sidebar Menu</h4>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  
                  <nav className="space-y-2">
                    {['Dashboard', 'Analytics', 'Reports', 'Settings', 'Profile'].map((item, index) => (
                      <a
                        key={item}
                        href="#"
                        className={`flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-all duration-200 transform hover:translate-x-1 ${
                          sidebarOpen ? 'animate-in slide-in-from-right-2 fade-in' : ''
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        {item}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* Smooth Dropdown Demo */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Smooth Dropdown Menu</h3>
            
            <div className="relative inline-block">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 hover:scale-105"
              >
                <User className="w-4 h-4" />
                User Options
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  />
                  
                  {/* Menu */}
                  <div className="absolute z-20 top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-in slide-in-from-top-2 fade-in duration-200">
                    {[
                      { icon: User, label: 'Profile Settings', desc: 'Manage your account' },
                      { icon: Bell, label: 'Notifications', desc: 'Configure alerts' },
                      { icon: Settings, label: 'Preferences', desc: 'App settings' },
                    ].map((item, index) => (
                      <a
                        key={item.label}
                        href="#"
                        className={`flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 transition-all duration-200 transform hover:scale-[1.02] animate-in slide-in-from-left-1 fade-in`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <item.icon className="w-4 h-4" />
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </div>
                      </a>
                    ))}
                    
                    <div className="border-t border-gray-100 my-2"></div>
                    
                    <a
                      href="#"
                      className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 transform hover:scale-[1.02] animate-in slide-in-from-left-1 fade-in"
                      style={{ animationDelay: '150ms' }}
                    >
                      <X className="w-4 h-4" />
                      <div className="font-medium">Sign Out</div>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Complete Animation Classes Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-indigo-700 mb-2">Load-in Animations</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><code className="bg-white px-2 py-1 rounded">opacity-0 → opacity-100</code></li>
                <li><code className="bg-white px-2 py-1 rounded">translate-y-4 → translate-y-0</code></li>
                <li><code className="bg-white px-2 py-1 rounded">scale-95 → scale-100</code></li>
                <li><code className="bg-white px-2 py-1 rounded">transition-all duration-700</code></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-purple-700 mb-2">Enhanced Hover Effects</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><code className="bg-white px-2 py-1 rounded">hover:bg-gradient-to-br</code></li>
                <li><code className="bg-white px-2 py-1 rounded">hover:border-indigo-300</code></li>
                <li><code className="bg-white px-2 py-1 rounded">hover:-translate-y-2</code></li>
                <li><code className="bg-white px-2 py-1 rounded">hover:scale-[1.02]</code></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-700 mb-2">Table Row Hover</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><code className="bg-white px-2 py-1 rounded">hover:bg-blue-50</code></li>
                <li><code className="bg-white px-2 py-1 rounded">hover:shadow-md</code></li>
                <li><code className="bg-white px-2 py-1 rounded">transition-colors duration-200</code></li>
                <li><code className="bg-white px-2 py-1 rounded">group-hover:scale-110</code></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-rose-700 mb-2">Chart Updates</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><code className="bg-white px-2 py-1 rounded">opacity-50 scale-95 blur-sm</code></li>
                <li><code className="bg-white px-2 py-1 rounded">animate-pulse</code></li>
                <li><code className="bg-white px-2 py-1 rounded">transition-all duration-500</code></li>
                <li><code className="bg-white px-2 py-1 rounded">animate-spin</code></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-cyan-700 mb-2">Sidebar Slide</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><code className="bg-white px-2 py-1 rounded">translate-x-full → translate-x-0</code></li>
                <li><code className="bg-white px-2 py-1 rounded">backdrop-blur-sm</code></li>
                <li><code className="bg-white px-2 py-1 rounded">animate-in fade-in</code></li>
                <li><code className="bg-white px-2 py-1 rounded">slide-in-from-right-2</code></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-amber-700 mb-2">Smooth Dropdowns</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><code className="bg-white px-2 py-1 rounded">slide-in-from-top-2</code></li>
                <li><code className="bg-white px-2 py-1 rounded">slide-in-from-left-1</code></li>
                <li><code className="bg-white px-2 py-1 rounded">animationDelay</code></li>
                <li><code className="bg-white px-2 py-1 rounded">rotate-180</code></li>
              </ul>
            </div>
          </div>
          
          {/* Enhanced Code Examples */}
          <div className="mt-8 bg-gray-900 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Enhanced Animation Patterns</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-blue-400 mb-2">Card Hover Enhancement</h4>
                <pre className="text-xs overflow-x-auto">
                  <code>{`className="group bg-white rounded-xl 
  transition-all duration-300 
  hover:bg-gradient-to-br 
  hover:from-white hover:to-gray-50 
  hover:border-indigo-300 
  hover:shadow-xl 
  hover:-translate-y-2 
  hover:scale-[1.02]"`}</code>
                </pre>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-purple-400 mb-2">Sidebar Slide Pattern</h4>
                <pre className="text-xs overflow-x-auto">
                  <code>{`className={\`absolute top-0 right-0 
  transition-transform duration-300 
  ease-in-out \${
    isOpen ? 'translate-x-0' : 'translate-x-full'
  }\`}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnimationsShowcase;