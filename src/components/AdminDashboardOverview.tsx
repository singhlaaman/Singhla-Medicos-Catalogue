import React, { useState } from 'react';
import { Medicine, Category } from '../types';
import { Plus, Database, Layers, Eye, Search, Clock, RefreshCw } from 'lucide-react';

interface AdminDashboardOverviewProps {
  medicines: Medicine[];
  categories: Category[];
  onQuickAdd: () => void;
  onEditMedicine: (med: Medicine) => void;
  onSearchQueryChange: (query: string) => void;
}

export default function AdminDashboardOverview({
  medicines,
  categories,
  onQuickAdd,
  onEditMedicine,
  onSearchQueryChange
}: AdminDashboardOverviewProps) {
  const [quickSearch, setQuickSearch] = useState('');

  // Calculate stats
  const totalProducts = medicines.length;
  const totalCategories = categories.length;
  const publishedProducts = medicines.filter(m => m.status === 'Published' || !m.status).length;
  const draftProducts = medicines.filter(m => m.status === 'Draft').length;

  // Sorting for recently added & updated
  const parseDate = (dateStr?: string) => {
    return dateStr ? new Date(dateStr).getTime() : 0;
  };

  // Sorted list of recently added (newest first)
  const recentlyAdded = [...medicines]
    .sort((a, b) => parseDate(b.createdAt) - parseDate(a.createdAt))
    .slice(0, 5);

  // Sorted list of recently updated (newest first)
  const recentlyUpdated = [...medicines]
    .filter(m => m.updatedAt)
    .sort((a, b) => parseDate(b.updatedAt) - parseDate(a.updatedAt))
    .slice(0, 5);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuickSearch(val);
    onSearchQueryChange(val);
  };

  return (
    <div className="space-y-6" id="dashboard-overview-container">
      {/* Welcome Banner */}
      <div className="bg-dark-grey text-white p-6 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-black shadow-xs">
        <div>
          <h4 className="font-display font-black text-xl tracking-tight uppercase">Admin Panel Overview</h4>
          <p className="text-xs text-gray-300 mt-1 uppercase tracking-wider font-semibold">
            Manage Singhla Medicos pharmaceutical database, category structures, and user testimonials.
          </p>
        </div>
        <button
          onClick={onQuickAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary-yellow text-black font-black uppercase text-xs tracking-wider border-2 border-black rounded-lg hover:bg-amber-400 active:translate-y-0.5 cursor-pointer self-start md:self-auto shadow-none"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Quick Add Product</span>
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white p-5 rounded-2xl border-2 border-gray-100 flex items-center gap-4">
          <div className="w-11 h-11 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Products</div>
            <div className="text-xl font-bold text-gray-900 leading-tight">{totalProducts}</div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-5 rounded-2xl border-2 border-gray-100 flex items-center gap-4">
          <div className="w-11 h-11 bg-purple-50 border border-purple-100 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Categories</div>
            <div className="text-xl font-bold text-gray-900 leading-tight">{totalCategories}</div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-5 rounded-2xl border-2 border-gray-100 flex items-center gap-4">
          <div className="w-11 h-11 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Published Cards</div>
            <div className="text-xl font-bold text-emerald-600 leading-tight">{publishedProducts}</div>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white p-5 rounded-2xl border-2 border-gray-100 flex items-center gap-4">
          <div className="w-11 h-11 bg-amber-50 border border-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <RefreshCw className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Draft Products</div>
            <div className="text-xl font-bold text-amber-600 leading-tight">{draftProducts}</div>
          </div>
        </div>
      </div>

      {/* Quick Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-2">
        <Search className="w-4 h-4 text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Quick search and jump to products catalog..."
          value={quickSearch}
          onChange={handleSearch}
          className="w-full text-xs bg-transparent border-none focus:outline-none placeholder-gray-400 text-gray-900"
        />
      </div>

      {/* Recents grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column 1: Recently Added */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 flex flex-col">
          <h5 className="font-display font-bold text-xs uppercase tracking-wide text-gray-900 border-b border-gray-100 pb-3 mb-3 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-500" />
            Recently Added Products
          </h5>
          <div className="flex-1 space-y-3">
            {recentlyAdded.length > 0 ? (
              recentlyAdded.map(med => (
                <div key={med.id} className="flex items-center justify-between p-2.5 hover:bg-gray-50/50 rounded-xl border border-gray-50 bg-gray-50/20 text-xs">
                  <div>
                    <div className="font-semibold text-gray-900">{med.name}</div>
                    <div className="text-[10px] text-gray-500 font-medium">
                      {(med.saltName || med.genericName) ? `${med.saltName || med.genericName} • ${med.category}` : med.category}
                    </div>
                  </div>
                  <button
                    onClick={() => onEditMedicine(med)}
                    className="px-2 py-1 text-[10px] font-bold border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 rounded-lg transition-all cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic text-xs py-4 text-center">No products found in the database.</p>
            )}
          </div>
        </div>

        {/* Column 2: Recently Updated */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 flex flex-col">
          <h5 className="font-display font-bold text-xs uppercase tracking-wide text-gray-900 border-b border-gray-100 pb-3 mb-3 flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-500" />
            Recently Updated Products
          </h5>
          <div className="flex-1 space-y-3">
            {recentlyUpdated.length > 0 ? (
              recentlyUpdated.map(med => (
                <div key={med.id} className="flex items-center justify-between p-2.5 hover:bg-gray-50/50 rounded-xl border border-gray-50 bg-gray-50/20 text-xs">
                  <div>
                    <div className="font-semibold text-gray-900">{med.name}</div>
                    <div className="text-[10px] text-gray-400 font-medium">Modified: {med.updatedAt ? new Date(med.updatedAt).toLocaleDateString() : 'Unknown'}</div>
                  </div>
                  <button
                    onClick={() => onEditMedicine(med)}
                    className="px-2 py-1 text-[10px] font-bold border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 rounded-lg transition-all cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic text-xs py-4 text-center">No modifications recorded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
