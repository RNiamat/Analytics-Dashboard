import React, { useState, useEffect } from 'react';
import { BarChart3, Menu, X, RefreshCw } from 'lucide-react';

const AnimationsDemo = () => {
  const [chartLoaded, setChartLoaded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chartUpdating, setChartUpdating] = useState(false);

  // Simulate chart loading
  useEffect(() => {
    setTimeout(() => setChartLoaded(true), 500);
  }, []);

  // Sample table data
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Active' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'Active' },
  ];

  const handleChartUpdate = () => {
    setChartUpdating(true);
    setTimeout(() => {
      setChartUpdating(false);
      setChartLoaded(true);
    }, 1000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Chart with Load Animation */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Sample Chart</h3>
          <button
            onClick={handleChartUpdate}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <RefreshCw className={`w-4 h-4 ${chartUpdating ? 'animate-spin' : ''}`} />
            Update
          </button>
        </div>
        
        {/* Chart Placeholder */}
        <div className={`h-64 bg-gray-100 rounded-lg flex items-center justify-center transition-all duration-700 ${
          chartLoaded && !chartUpdating ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'
        }`}>
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">
              {chartUpdating ? 'Updating...' : 'Chart Data Loaded'}
            </p>
          </div>
        </div>
      </div>

      {/* Table with Row Hover */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Sample Table</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((user) => (
                <tr 
                  key={user.id}
                  className="transition-colors duration-200 hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sidebar Toggle Demo */}
      <div className="relative bg-white rounded-lg shadow-md border border-gray-200 p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Sidebar Demo</h3>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <Menu className="w-4 h-4" />
            Toggle Sidebar
          </button>
        </div>
        
        <div className="relative h-48 bg-gray-50 rounded-lg overflow-hidden">
          <div className="p-4">
            <p className="text-gray-600">Main content area</p>
          </div>
          
          {/* Backdrop */}
          {sidebarOpen && (
            <div 
              className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {/* Sidebar */}
          <div className={`absolute top-0 right-0 h-full w-64 bg-white shadow-lg border-l border-gray-200 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">Menu</h4>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="space-y-2">
                {['Dashboard', 'Analytics', 'Settings'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationsDemo;