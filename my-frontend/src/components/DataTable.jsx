import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Filter } from 'lucide-react';

const DUMMY_DATA = [
    { id: 1, name: 'Project Alpha', value: '$12,500', status: 'Active', category: 'Development' },
    { id: 2, name: 'Marketing Campaign Q1', value: '$45,000', status: 'Active', category: 'Marketing' },
    { id: 3, name: 'Server Maintenance', value: '$3,200', status: 'Inactive', category: 'IT' },
    { id: 4, name: 'Website Redesign', value: '$18,900', status: 'Active', category: 'Design' },
    { id: 5, name: 'Client Meeting', value: '$500', status: 'Inactive', category: 'Sales' },
    { id: 6, name: 'Q2 Planning', value: '$0', status: 'Active', category: 'Management' },
    { id: 7, name: 'Security Audit', value: '$8,500', status: 'Active', category: 'IT' },
    { id: 8, name: 'Content Strategy', value: '$5,400', status: 'Inactive', category: 'Marketing' },
    { id: 9, name: 'Mobile App V2', value: '$22,000', status: 'Active', category: 'Development' },
    { id: 10, name: 'Database Optimization', value: '$6,700', status: 'Active', category: 'IT' },
    { id: 11, name: 'Employee Training', value: '$15,000', status: 'Inactive', category: 'HR' },
    { id: 12, name: 'New Office Setup', value: '$120,000', status: 'Active', category: 'Operations' },
    { id: 13, name: 'Logo Design', value: '$1,500', status: 'Inactive', category: 'Design' },
    { id: 14, name: 'User Research', value: '$4,800', status: 'Active', category: 'Product' },
    { id: 15, name: 'Cloud Migration', value: '$35,000', status: 'Active', category: 'IT' },
];

const DataTable = () => {
    const [data] = useState(DUMMY_DATA);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const rowsPerPage = 5;

    // Handling Sort
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Filter & Sort Data
    const processedData = useMemo(() => {
        let filtered = [...data];

        // Filter
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(lowerQuery) ||
                item.category.toLowerCase().includes(lowerQuery) ||
                item.status.toLowerCase().includes(lowerQuery)
            );
        }

        // Sort
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                // Handle numeric values (removing '$' and ',')
                if (sortConfig.key === 'value') {
                    aValue = parseFloat(aValue.replace(/[^0-9.-]+/g, ""));
                    bValue = parseFloat(bValue.replace(/[^0-9.-]+/g, ""));
                }

                if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [data, searchQuery, sortConfig]);

    // Pagination Logic
    const totalPages = Math.ceil(processedData.length / rowsPerPage);
    const currentData = processedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-theme-sm overflow-hidden">
            {/* Header / Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-theme-lg font-semibold text-gray-900 dark:text-white">Recent Projects</h2>

                <div className="relative w-full sm:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all sm:text-sm"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1); // Reset to page 1 on search
                        }}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                        <tr>
                            {['Name', 'Category', 'Value', 'Status'].map((header) => {
                                const key = header.toLowerCase();
                                return (
                                    <th
                                        key={header}
                                        onClick={() => handleSort(key)}
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors select-none group"
                                    >
                                        <div className="flex items-center gap-2">
                                            {header}
                                            <span className="text-gray-400">
                                                {sortConfig.key === key ? (
                                                    sortConfig.direction === 'ascending' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                                                ) : (
                                                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                )}
                                            </span>
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                        {currentData.length > 0 ? (
                            currentData.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{row.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{row.category}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{row.value}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${row.status === 'Active'
                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
                                            : 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900/30'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${row.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
                                                }`}></span>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                                    No results found for "{searchQuery}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                        Page <span className="font-medium text-gray-900 dark:text-white">{currentPage}</span> of <span className="font-medium text-gray-900 dark:text-white">{totalPages}</span>
                    </span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-white dark:hover:bg-gray-800 hover:text-brand-600 dark:hover:text-brand-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-all text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 shadow-sm"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-white dark:hover:bg-gray-800 hover:text-brand-600 dark:hover:text-brand-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-all text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 shadow-sm"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
