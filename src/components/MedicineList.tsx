import React, { useState, useMemo, useEffect } from 'react';
import { Phone, MessageCircle, AlertCircle, RefreshCw, Filter, ShieldAlert, Snowflake, ChevronDown, CheckCircle, HelpCircle, Loader2 } from 'lucide-react';
import { Medicine, AppSettings } from '../types';
import MedicineImage from './MedicineImage';

interface MedicineListProps {
  medicines: Medicine[];
  selectedCategory: string | null;
  searchQuery: string;
  onClearFilters: () => void;
  onSelectMedicine: (slug: string) => void;
  settings: AppSettings;
  isSyncingMeds?: boolean;
}

type SortOption = 'name-asc' | 'price-asc' | 'price-desc';

export default function MedicineList({
  medicines,
  selectedCategory,
  searchQuery,
  onClearFilters,
  onSelectMedicine,
  settings,
  isSyncingMeds = false
}: MedicineListProps) {
  // Filters State
  const [rxFilter, setRxFilter] = useState<'All' | 'Yes' | 'No'>('All');
  const [coldFilter, setColdFilter] = useState<'All' | 'Yes' | 'No'>('All');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [showFilters, setShowFilters] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  // Reset page when any filter or query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, rxFilter, coldFilter, sortOption]);

  // List of unique manufacturers for reference if needed
  const manufacturers = useMemo(() => {
    const set = new Set(medicines.map(m => m.manufacturer.split('/')[0].trim()));
    return Array.from(set);
  }, [medicines]);

  // Compute filtered & sorted medicines
  const processedMedicines = useMemo(() => {
    let list = [...medicines];

    // Filter by Category
    if (selectedCategory) {
      list = list.filter((med) => med.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((med) => {
        return (
          med.name.toLowerCase().includes(q) ||
          med.brandName.toLowerCase().includes(q) ||
          med.genericName.toLowerCase().includes(q) ||
          med.saltName.toLowerCase().includes(q) ||
          med.manufacturer.toLowerCase().includes(q)
        );
      });
    }

    // Filter by Prescription (Rx)
    if (rxFilter !== 'All') {
      list = list.filter((med) => med.prescriptionRequired === rxFilter);
    }

    // Filter by Cold Storage
    if (coldFilter !== 'All') {
      list = list.filter((med) => med.coldStorage === coldFilter);
    }

    // Sorting
    if (sortOption === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'price-asc') {
      list.sort((a, b) => (a.discountPrice || a.mrp) - (b.discountPrice || b.mrp));
    } else if (sortOption === 'price-desc') {
      list.sort((a, b) => (b.discountPrice || b.mrp) - (a.discountPrice || a.mrp));
    }

    return list;
  }, [medicines, selectedCategory, searchQuery, rxFilter, coldFilter, sortOption]);

  const totalPages = Math.ceil(processedMedicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMedicines = useMemo(() => {
    return processedMedicines.slice(startIndex, startIndex + itemsPerPage);
  }, [processedMedicines, startIndex, itemsPerPage]);

  const handleResetFilters = () => {
    setRxFilter('All');
    setColdFilter('All');
    setSortOption('name-asc');
    onClearFilters();
  };

  return (
    <div id="medicine-catalog-section" className="scroll-mt-24 space-y-6">
      {/* Search Result Info or Category Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Medicine Catalogue
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-gray-900 uppercase tracking-tight mt-1">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : selectedCategory
              ? selectedCategory
              : 'All Speciality Medicines'}
          </h3>
          <p className="text-xs text-gray-500 mt-1 font-medium tracking-wide flex flex-wrap items-center gap-2">
            <span>Showing {processedMedicines.length} medicine{processedMedicines.length === 1 ? '' : 's'} available for offline purchase.</span>
            {isSyncingMeds && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-800 rounded-full font-semibold text-[9px] border border-amber-200/60 animate-pulse">
                <Loader2 className="w-2.5 h-2.5 animate-spin text-amber-600" />
                <span>Syncing live database...</span>
              </span>
            )}
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle Filter Panel (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              showFilters || rxFilter !== 'All' || coldFilter !== 'All'
                ? 'bg-primary-yellow text-gray-900 shadow-xs'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters {rxFilter !== 'All' || coldFilter !== 'All' ? '(Active)' : ''}</span>
          </button>

          {/* Quick Sorting Dropdown */}
          <div className="relative inline-flex items-center">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="appearance-none bg-white border border-gray-200 rounded-xl pl-3.5 pr-8 py-2 text-xs font-semibold uppercase tracking-wider text-gray-800 focus:outline-none focus:border-amber-400 cursor-pointer shadow-2xs"
            >
              <option value="name-asc">Sort: A to Z</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 pointer-events-none" />
          </div>

          {/* Clear Button */}
          {(searchQuery || selectedCategory || rxFilter !== 'All' || coldFilter !== 'All') && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl border border-gray-200 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {(showFilters || rxFilter !== 'All' || coldFilter !== 'All') && (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Rx Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              Prescription Required
            </label>
            <div className="flex gap-2">
              {['All', 'Yes', 'No'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setRxFilter(opt as any)}
                  className={`flex-1 py-1.5 px-3 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    rxFilter === opt
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {opt === 'All' ? 'Show All' : opt === 'Yes' ? 'Rx Only' : 'Over The Counter'}
                </button>
              ))}
            </div>
          </div>

          {/* Cold Storage Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1">
              <Snowflake className="w-3.5 h-3.5 text-blue-600" />
              Cold Chain Management
            </label>
            <div className="flex gap-2">
              {['All', 'Yes', 'No'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setColdFilter(opt as any)}
                  className={`flex-1 py-1.5 px-3 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    coldFilter === opt
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {opt === 'All' ? 'Show All' : opt === 'Yes' ? 'Cold Chain' : 'Normal Storage'}
                </button>
              ))}
            </div>
          </div>

          {/* Category Quick Reset info or static disclaimer */}
          <div className="sm:col-span-2 lg:col-span-1 flex items-center justify-center p-3 rounded-xl bg-amber-50/50 border border-amber-100 text-[10px] font-semibold uppercase text-amber-800">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mr-2" />
            <span>Prescriptions must be issued by a registered medical practitioner before purchase.</span>
          </div>
        </div>
      )}

      {/* Grid of Medicine Cards */}
      {processedMedicines.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {paginatedMedicines.map((med) => {
            // Price calculation
            const saveAmount = med.discountPrice ? med.mrp - med.discountPrice : 0;
            const savePct = med.discountPrice ? Math.round((saveAmount / med.mrp) * 100) : 0;

            return (
              <div
                key={med.id}
                className="bg-white border border-gray-100 hover:border-amber-200 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:-translate-y-0.5"
              >
                {/* Image Area - Click triggers detailed spec */}
                <div 
                  onClick={() => onSelectMedicine(med.slug)}
                  className="p-4 cursor-pointer relative bg-slate-50/60 border-b border-gray-50 flex items-center justify-center min-h-[170px]"
                >
                  <MedicineImage
                    brandName={med.brandName}
                    genericName={med.genericName}
                    strength={med.strength}
                    dosageForm={med.dosageForm}
                    coldStorage={med.coldStorage}
                    imageUrl={med.images?.[0]}
                    className="max-w-[150px] sm:max-w-none mx-auto"
                  />

                  {/* Quick badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {savePct > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-red-600 text-white shadow-2xs">
                        -{savePct}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  {/* Text Spec */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      <span>{med.category}</span>
                      <span className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          med.availability === 'In Stock'
                            ? 'bg-emerald-500'
                            : med.availability === 'Limited Stock'
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`} />
                        <span className="text-gray-500 font-semibold">{med.availability}</span>
                      </span>
                    </div>

                    <h4 
                      onClick={() => onSelectMedicine(med.slug)}
                      className="font-display font-bold text-gray-900 group-hover:text-amber-800 uppercase tracking-tight text-base line-clamp-1 cursor-pointer transition-colors"
                    >
                      {med.name}
                    </h4>

                    {/* Salt & Manufacturer details */}
                    <div className="space-y-0.5 font-sans text-xs">
                      <div className="text-gray-500 flex items-center gap-1">
                        <span className="font-bold text-gray-700 uppercase text-[10px]">Salt:</span>
                        <span className="italic truncate font-medium text-gray-600" title={med.saltName}>{med.saltName}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 font-semibold uppercase">
                        Mfr: {med.manufacturer}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="space-y-3 pt-3 border-t border-gray-100">
                    <div className="flex items-baseline justify-between">
                      <div>
                        {med.discountPrice ? (
                          <div className="space-y-0.5">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-lg font-bold text-gray-900">
                                ₹{med.discountPrice.toLocaleString('en-IN')}
                              </span>
                              <span className="text-xs text-gray-400 line-through">
                                ₹{med.mrp.toLocaleString('en-IN')}
                              </span>
                            </div>
                            <p className="text-[9px] text-emerald-600 font-bold uppercase">
                              Save ₹{saveAmount.toLocaleString('en-IN')}
                            </p>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">
                            ₹{med.mrp.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-semibold uppercase text-gray-400">
                        {med.packaging}
                      </span>
                    </div>

                    {/* Two sticky / prominent action buttons per medicine */}
                    <div className="grid grid-cols-2 gap-2">
                      {/* Call Enquiry */}
                      <a
                        href={`tel:${settings.contactPhone}`}
                        className="inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer text-center shadow-2xs"
                      >
                        <Phone className="w-3.5 h-3.5 fill-white text-white shrink-0" />
                        <span>Call</span>
                      </a>

                      {/* WhatsApp Enquiry with medicine prefilled details */}
                      <a
                        href={`https://wa.me/${settings.contactWhatsApp}?text=${encodeURIComponent(
                           `Hello,\nI would like to enquire about ${med.name} (${med.strength}) ${med.dosageForm}s from Singhla Medicos.`
                        )}`}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer text-center shadow-2xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white text-white shrink-0" />
                        <span>Enquire</span>
                      </a>
                    </div>

                    {/* View Details Text link */}
                    <button
                      onClick={() => onSelectMedicine(med.slug)}
                      className="w-full text-center text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-amber-800 py-1 transition-all cursor-pointer"
                    >
                      View Details & Warnings &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Beautiful Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, processedMedicines.length)} of {processedMedicines.length} medicines
            </p>
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {/* Previous Button */}
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(prev => Math.max(prev - 1, 1));
                  document.getElementById('medicine-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all select-none cursor-pointer ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-200 text-gray-800 hover:bg-amber-50 active:translate-y-0.5'
                }`}
              >
                &larr; Prev
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                // Only show a few page buttons with ellipsis if too many
                if (totalPages > 6 && Math.abs(currentPage - pageNum) > 2 && pageNum !== 1 && pageNum !== totalPages) {
                  if (pageNum === 2 && currentPage > 4) {
                    return <span key="dots-start" className="px-1 text-gray-400 font-bold">...</span>;
                  }
                  if (pageNum === totalPages - 1 && currentPage < totalPages - 3) {
                    return <span key="dots-end" className="px-1 text-gray-400 font-bold">...</span>;
                  }
                  return null;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      document.getElementById('medicine-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 flex items-center justify-center text-xs font-bold uppercase rounded-xl transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-primary-yellow text-gray-900 shadow-xs font-bold'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-amber-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(prev => Math.min(prev + 1, totalPages));
                  document.getElementById('medicine-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all select-none cursor-pointer ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-200 text-gray-800 hover:bg-amber-50 active:translate-y-0.5'
                }`}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}
        </>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4 shadow-sm">
          <AlertCircle className="w-12 h-12 text-primary-yellow mx-auto" />
          <h4 className="font-display font-bold text-lg text-gray-900 uppercase tracking-tight">No Specialty Medicines Match</h4>
          <p className="text-gray-500 text-xs font-medium tracking-wide leading-relaxed">
            We couldn't find any medicine fitting your combination of filters. Singhla Medicos maintains stock of over 10,000 speciality medicines offline.
          </p>
          <div className="flex gap-2 justify-center pt-2">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-primary-yellow hover:bg-amber-400 text-gray-900 cursor-pointer shadow-xs"
            >
              Reset Filters
            </button>
            <a
              href={`https://wa.me/${settings.contactWhatsApp}?text=${encodeURIComponent("Hello Singhla Medicos, I am looking for a specialty medicine that is not listed on your website. Can you help me?")}`}
              target="_blank"
              referrerPolicy="no-referrer"
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
