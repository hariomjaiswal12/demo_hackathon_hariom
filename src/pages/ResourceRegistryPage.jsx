import React, { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { Search, Plus, HardDrive, Loader2, AlertCircle, Inbox, Edit3, Trash2, RefreshCw } from 'lucide-react';
import { AddResourceModal } from '../components/AddResourceModal';
import { EditResourceModal } from '../components/EditResourceModal';
import { fetchResources, deleteResource } from '../api/resources';

function ResourceStatusBadge({ status }) {
  const map = {
    AVAILABLE: 'badge badge-available',
    IN_USE: 'badge badge-in_use',
    MAINTENANCE: 'badge badge-maintenance',
  };
  const labels = {
    AVAILABLE: 'Available',
    IN_USE: 'In Use',
    MAINTENANCE: 'Maintenance',
  };
  return (
    <span className={map[status] || 'badge badge-completed'}>
      {labels[status] || status}
    </span>
  );
}

export function ResourceRegistryPage({ onNavigateToBookings, onNavTabChange, currentUser, onLogout }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [resourcesList, setResourcesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadResources = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchQuery) params.search = searchQuery;
      const res = await fetchResources(params);
      setResourcesList(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load resources.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadResources(); }, [searchQuery]);

  const handleDelete = async (resourceId) => {
    if (!window.confirm('Delete this resource? This cannot be undone.')) return;
    setDeletingId(resourceId);
    try {
      await deleteResource(resourceId);
      setResourcesList((prev) => prev.filter((r) => (r._id || r.id) !== resourceId));
    } catch (err) {
      alert(err.message || 'Failed to delete resource');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredResources = resourcesList.filter((res) => {
    if (selectedCategory === 'all') return true;
    const catUpper = (res.category || '').toUpperCase();
    if (selectedCategory === 'audio') return catUpper.includes('AUDIO');
    if (selectedCategory === 'displays') return catUpper.includes('DISPLAY');
    if (selectedCategory === 'hardware') return catUpper.includes('HARDWARE') || catUpper.includes('VR') || catUpper.includes('TESTING');
    return true;
  });

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'audio', label: 'Audio' },
    { id: 'displays', label: 'Displays' },
    { id: 'hardware', label: 'Hardware' },
  ];

  return (
    <AppShell
      activeTab="Admin"
      onTabChange={(tab) => onNavTabChange && onNavTabChange(tab)}
      currentUser={currentUser}
      onLogout={onLogout}
    >
      <div className="w-full">
        {/* ===== PAGE HEADER ===== */}
        <div className="bg-white border-b border-slate-200 px-5 md:px-6 pt-6 pb-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">Resource Registry</h1>
              <p className="text-[13px] text-slate-500 mt-0.5">Manage office resources and availability.</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn btn-primary shrink-0 flex items-center gap-1.5 text-[13px]"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              Add Resource
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { label: 'Total Assets', value: resourcesList.length, color: 'text-slate-900' },
              { label: 'Available', value: resourcesList.filter((r) => r.status === 'AVAILABLE').length, color: 'text-emerald-600' },
              { label: 'Maintenance', value: resourcesList.filter((r) => r.status === 'MAINTENANCE').length, color: 'text-amber-600' },
            ].map((stat) => (
              <div key={stat.label} className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="p-5 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search resources by name, code, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-base pl-9 text-[13px]"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-[12px] font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex flex-col gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="skeleton h-16 rounded-xl" />
              ))}
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-[14px] font-semibold text-red-700">{error}</p>
              <button
                onClick={loadResources}
                className="btn btn-secondary btn-sm mt-3 flex items-center gap-1.5 mx-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry
              </button>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !error && filteredResources.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-xl py-12 px-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Inbox className="w-6 h-6 text-slate-400" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-[15px] text-slate-700">No resources found</h3>
              <p className="text-[13px] text-slate-400 mt-1 max-w-xs mx-auto">
                {searchQuery ? 'Try a different search.' : 'Add your first resource to get started.'}
              </p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="btn btn-primary btn-sm mt-4 px-5"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                Add Resource
              </button>
            </div>
          )}

          {/* Resources List */}
          {!isLoading && !error && filteredResources.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {filteredResources.map((res, idx) => {
                const resId = res._id || res.id;
                const isLast = idx === filteredResources.length - 1;
                return (
                  <div
                    key={resId}
                    className={`flex items-center gap-3 p-4 ${!isLast ? 'border-b border-slate-100' : ''} hover:bg-slate-50 transition-colors group`}
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      <HardDrive className="w-4 h-4 text-indigo-600" strokeWidth={1.8} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[14px] text-slate-900 truncate">{res.name}</h3>
                        <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md shrink-0">
                          {res.resourceCode}
                        </span>
                      </div>
                      <p className="text-[12px] text-slate-400 truncate mt-0.5">
                        {res.location} • {res.category}
                      </p>
                    </div>

                    {/* Status + Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <ResourceStatusBadge status={res.status} />
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditingResource(res)}
                          title="Edit"
                          aria-label={`Edit ${res.name}`}
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 flex items-center justify-center transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(resId)}
                          disabled={deletingId === resId}
                          title="Delete"
                          aria-label={`Delete ${res.name}`}
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 flex items-center justify-center transition-colors disabled:opacity-50"
                        >
                          {deletingId === resId
                            ? <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500" />
                            : <Trash2 className="w-3.5 h-3.5" />
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <AddResourceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onResourceAdded={loadResources}
      />
      <EditResourceModal
        isOpen={Boolean(editingResource)}
        resource={editingResource}
        onClose={() => setEditingResource(null)}
        onResourceUpdated={loadResources}
      />
    </AppShell>
  );
}
