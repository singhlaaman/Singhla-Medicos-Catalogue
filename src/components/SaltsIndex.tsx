import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, Snowflake, Pill, ArrowRight, ArrowLeft, BookOpen, Layers, ShieldCheck, ChevronRight, Activity } from 'lucide-react';
import { SaltInfo, Medicine, AppSettings } from '../types';
import { ALL_SALTS, SALT_CATEGORIES } from '../data/saltsData';
import { matchesMedicineToSalt } from '../utils/saltMatcher';

interface SaltsIndexProps {
  medicines: Medicine[];
  onSelectSalt: (slug: string) => void;
  onSelectMedicine: (slug: string) => void;
  onGoHome: () => void;
  settings: AppSettings;
}

export default function SaltsIndex({
  medicines,
  onSelectSalt,
  onSelectMedicine,
  onGoHome,
  settings,
}: SaltsIndexProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');

  // Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Generate alphabet list present in data
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    ALL_SALTS.forEach((s) => {
      const firstChar = s.name.charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstChar)) {
        letters.add(firstChar);
      }
    });
    return ['All', ...Array.from(letters).sort()];
  }, []);

  // Filter salts
  const filteredSalts = useMemo(() => {
    return ALL_SALTS.filter((salt) => {
      // Category match
      if (selectedCategory !== 'All' && salt.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Letter match
      if (selectedLetter !== 'All') {
        const firstLetter = salt.name.trim().charAt(0).toUpperCase();
        if (firstLetter !== selectedLetter) {
          return false;
        }
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = salt.name.toLowerCase().includes(q);
        const matchesClass = salt.drugClass.toLowerCase().includes(q);
        const matchesCategory = salt.category.toLowerCase().includes(q);
        const matchesDesc = salt.descriptionShort.toLowerCase().includes(q);
        const matchesAliases = salt.aliases?.some((a) => a.toLowerCase().includes(q));
        const matchesIndications = salt.indications?.some((i) => i.toLowerCase().includes(q));

        if (!matchesName && !matchesClass && !matchesCategory && !matchesDesc && !matchesAliases && !matchesIndications) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedLetter]);

  // Compute total inventory medicines per salt accurately
  const getMedicinesCountForSalt = (salt: SaltInfo) => {
    return medicines.filter((m) => matchesMedicineToSalt(m, salt)).length;
  };

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-sans">
          <button
            onClick={onGoHome}
            className="hover:text-gray-900 font-semibold cursor-pointer transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-bold text-gray-900">Active Salt Monograph Library</span>
        </div>

        <button
          onClick={onGoHome}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-10 shadow-lg border border-slate-700/50">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Active Ingredient Database</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-display font-black tracking-tight uppercase">
            Active Drug Salts & Chemical Monographs
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans font-normal">
            Explore complete pharmacological monographs, mechanisms of action, approved therapeutic indications, storage parameters, and commercial brand equivalents for all active pharmaceutical salts in our oncology and critical care inventory.
          </p>

          {/* Quick Stats Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-xs flex items-center gap-2 font-medium">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span><strong>{ALL_SALTS.length}</strong> Documented Salts</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-xs flex items-center gap-2 font-medium">
              <Layers className="w-4 h-4 text-blue-400" />
              <span><strong>3</strong> Therapeutic Classes</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-xs flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Genuine Certified Sources</span>
            </div>
          </div>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
          <Pill className="w-96 h-96 text-white stroke-1" />
        </div>
      </div>

      {/* Search and Category Filter Toolbar */}
      <div className="space-y-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by salt name, drug class, mechanism, brand alias (e.g. Tarceva, Herceptin)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {SALT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gray-900 text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cat === 'All' ? 'All Salts' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* A-Z Alphabetical Quick Bar */}
        <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mr-1">
            Alphabetical:
          </span>
          {availableLetters.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                selectedLetter === letter
                  ? 'bg-amber-400 text-gray-950 font-black shadow-2xs'
                  : 'bg-gray-50 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-sans px-1">
        <div>
          Showing <span className="font-bold text-gray-900">{filteredSalts.length}</span> of {ALL_SALTS.length} active salts
        </div>
        {(searchQuery || selectedCategory !== 'All' || selectedLetter !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedLetter('All');
            }}
            className="text-amber-800 font-bold hover:underline cursor-pointer"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Salts Grid */}
      {filteredSalts.length === 0 ? (
        <div className="p-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 space-y-3">
          <Pill className="w-10 h-10 text-gray-400 mx-auto" />
          <h3 className="font-display font-bold text-base text-gray-800 uppercase">No active salts match your query</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Try adjusting your search keywords or switching category filters to discover documented salts.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedLetter('All');
            }}
            className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors"
          >
            Show All Salts
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSalts.map((salt) => {
            const stockCount = getMedicinesCountForSalt(salt);
            return (
              <div
                key={salt.id}
                onClick={() => onSelectSalt(salt.slug)}
                className="group relative bg-white rounded-2xl border border-gray-200/80 hover:border-amber-400 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer space-y-4"
              >
                {/* Top badges */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                      #{salt.sNo}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {salt.coldStorage === 'Yes' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold">
                          <Snowflake className="w-3 h-3" />
                          <span>Cold Chain</span>
                        </span>
                      )}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        salt.category.includes('Direct')
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : salt.category.includes('supportive')
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {salt.category.includes('Direct')
                          ? 'Antineoplastic'
                          : salt.category.includes('supportive')
                          ? 'Supportive Care'
                          : 'Prevention / Adjunct'}
                      </span>
                    </div>
                  </div>

                  {/* Title & Drug Class */}
                  <div>
                    <h3 className="font-display font-bold text-base text-gray-900 group-hover:text-amber-800 transition-colors uppercase tracking-tight">
                      {salt.name}
                    </h3>
                    <p className="text-[11px] font-medium text-gray-500 line-clamp-1 mt-0.5">
                      {salt.drugClass}
                    </p>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-xs text-gray-600 font-normal leading-relaxed line-clamp-3">
                  {salt.descriptionShort}
                </p>

                {/* Indications Tags */}
                {salt.indications && salt.indications.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-gray-100">
                    <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                      Key Indications:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {salt.indications.slice(0, 2).map((ind, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md truncate max-w-[240px]"
                          title={ind}
                        >
                          {ind.split('(')[0]}
                        </span>
                      ))}
                      {salt.indications.length > 2 && (
                        <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-1.5 py-0.5 rounded-md">
                          +{salt.indications.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Aliases / Brands */}
                {salt.aliases && salt.aliases.length > 0 && (
                  <div className="text-[11px] text-gray-500 font-sans">
                    <span className="font-bold text-gray-400 uppercase text-[9px] mr-1">Known Brands:</span>
                    <span className="text-gray-700 font-medium">
                      {salt.aliases.slice(0, 3).join(', ')}
                    </span>
                  </div>
                )}

                {/* Bottom Footer: Stock Link & View Button */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span><strong>{stockCount}</strong> available in stock</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 group-hover:text-amber-800 transition-colors uppercase tracking-wider">
                    <span>Monograph</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
