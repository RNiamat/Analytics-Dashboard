
import React, { useState } from 'react';
import { MoreVertical, User, CheckCircle, XCircle, Search, Edit2, Trash2, Plus, X } from 'lucide-react';

const Users = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Rafia Niamat', email: 'rafia@example.com', role: 'Admin', status: 'Active', lastActive: '2 mins ago' },
        { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Editor', status: 'Active', lastActive: '4 hours ago' },
        { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'Viewer', status: 'Inactive', lastActive: '3 days ago' },
        { id: 4, name: 'James Moss', email: 'james@example.com', role: 'Editor', status: 'Active', lastActive: '1 day ago' },
        { id: 5, name: 'Emily Davis', email: 'emily@example.com', role: 'Viewer', status: 'Active', lastActive: '5 hours ago' },
    ]);

    const [selectedUsers, setSelectedUsers] = useState(new Set());
    const [roleFilter, setRoleFilter] = useState('All Roles');
    const [statusFilter, setStatusFilter] = useState('All Status');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'Viewer', status: 'Active' });

    // Filter Logic
    const filteredUsers = users.filter(user => {
        const roleMatch = roleFilter === 'All Roles' || user.role === roleFilter;
        const statusMatch = statusFilter === 'All Status' || user.status === statusFilter;
        return roleMatch && statusMatch;
    });

    // Selection Logic
    const toggleSelectAll = () => {
        if (selectedUsers.size === filteredUsers.length && filteredUsers.length > 0) {
            setSelectedUsers(new Set());
        } else {
            setSelectedUsers(new Set(filteredUsers.map(u => u.id)));
        }
    };

    const toggleSelectUser = (id) => {
        const newSelected = new Set(selectedUsers);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedUsers(newSelected);
    };

    // Actions
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== id));
            const newSelected = new Set(selectedUsers);
            newSelected.delete(id);
            setSelectedUsers(newSelected);
        }
    };

    const handleDeleteSelected = () => {
        if (window.confirm(`Delete ${selectedUsers.size} users ? `)) {
            setUsers(users.filter(u => !selectedUsers.has(u.id)));
            setSelectedUsers(new Set());
        }
    };

    const handleOpenModal = (mode, user = null) => {
        setModalMode(mode);
        if (mode === 'edit' && user) {
            setCurrentUser(user);
            setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
        } else {
            setCurrentUser(null);
            setFormData({ name: '', email: '', role: 'Viewer', status: 'Active' });
        }
        setIsModalOpen(true);
    };

    const handleSaveUser = (e) => {
        e.preventDefault();
        if (modalMode === 'add') {
            const newUser = {
                id: Math.max(...users.map(u => u.id), 0) + 1,
                ...formData,
                lastActive: 'Just now'
            };
            setUsers([...users, newUser]);
        } else {
            setUsers(users.map(u => u.id === currentUser.id ? { ...u, ...formData } : u));
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users Management</h1>
                <div className="flex gap-2">
                    {selectedUsers.size > 0 && (
                        <button
                            onClick={handleDeleteSelected}
                            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-error-600 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg text-sm font-medium transition-colors shadow-sm"
                        >
                            Delete Selected ({selectedUsers.size})
                        </button>
                    )}
                    <button
                        onClick={() => handleOpenModal('add')}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add New User
                    </button>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-theme-xs">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none"
                    />
                </div>
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:ring-2 focus:ring-brand-500/20 outline-none text-gray-600 dark:text-gray-300"
                >
                    <option>All Roles</option>
                    <option>Admin</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                </select>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:ring-2 focus:ring-brand-500/20 outline-none text-gray-600 dark:text-gray-300"
                >
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-theme-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-3 w-4">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                                        checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-3 font-medium">Name</th>
                                <th className="px-6 py-3 font-medium">Role</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Last Active</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className={`hover: bg - gray - 50 dark: hover: bg - gray - 700 / 50 transition - colors ${selectedUsers.has(user.id) ? 'bg-brand-50/50 dark:bg-brand-900/10' : ''} `}>
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                                            checked={selectedUsers.has(user.id)}
                                            onChange={() => toggleSelectUser(user.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                                                <div className="text-xs text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline - flex items - center px - 2.5 py - 0.5 rounded - full text - xs font - medium border
                                            ${user.role === 'Admin' ? 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800' :
                                                user.role === 'Editor' ? 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800' :
                                                    'bg-gray-50 text-gray-700 border-gray-100 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800'
                                            }
`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {user.status === 'Active' ? (
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-gray-400" />
                                            )}
                                            <span className={user.status === 'Active' ? 'text-green-700 dark:text-green-400' : 'text-gray-500'}>
                                                {user.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                        {user.lastActive}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenModal('edit', user)}
                                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-400 hover:text-brand-600 dark:hover:text-brand-400"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-gray-400 hover:text-error-600 dark:hover:text-error-400"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                {modalMode === 'add' ? 'Add New User' : 'Edit User'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveUser} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all dark:text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all dark:text-white"
                                    >
                                        <option>Admin</option>
                                        <option>Editor</option>
                                        <option>Viewer</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all dark:text-white"
                                    >
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                                    {modalMode === 'add' ? 'Create User' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;

