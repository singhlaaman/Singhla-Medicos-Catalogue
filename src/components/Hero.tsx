import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, AlertCircle, X } from 'lucide-react';
import { Medicine } from '../types';

interface HeroProps {
  medicines: Medicine[];
  onSelectMedicine: (slug: string) => void;
  onSearchSubmit: (query: string) => void;
}

export default function Hero({ medicines, onSelectMedicine, onSearchSubmit }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Medicine[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions based on query
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = medicines.filter(med => {
      return (
        med.name.toLowerCase().includes(query) ||
        med.brandName.toLowerCase().includes(query) ||
        med.genericName.toLowerCase().includes(query) ||
        med.saltName.toLowerCase().includes(query) ||
        med.manufacturer.toLowerCase().includes(query)
      );
    }).slice(0, 6); // Max 6 suggestions

    setSuggestions(filtered);
  }, [searchQuery, medicines]);

  const handleSuggestionClick = (med: Medicine) => {
    onSelectMedicine(med.slug);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
  };

  const handleSearchFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
      setShowSuggestions(false);
    }
  };

  const popularSearches = ['Gefitinib', 'Imatinib', 'Trastuzumab', 'Sovihep', 'Hepbest'];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-yellow-50/20 to-white pt-12 pb-16 border-b border-gray-100">
      {/* Soft ambient yellow background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-100/80 text-amber-900 border border-amber-200/60 rounded-full text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            Speciality Pharmacy Care
          </div>

          {/* Heading */}
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-gray-900 tracking-tight leading-tight uppercase">
            India's Trusted Super Speciality & <br className="hidden sm:inline" />
            <span className="relative inline-block bg-primary-yellow px-3 py-1 text-gray-900 rounded-xl shadow-xs">
              Cancer Medicine
            </span>{' '}
            Supplier
          </h2>

          {/* Subheading */}
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed font-medium">
            Easily search cancer drugs, liver, cardiac, kidney and other critical care medicines. Direct contact and professional cold chain delivery nationwide.
          </p>

          {/* Smart Search Bar Form */}
          <div ref={dropdownRef} className="relative max-w-2xl mx-auto mt-8">
            <form onSubmit={handleSearchFormSubmit} className="relative flex items-center">
              <div className="absolute left-5 text-gray-400">
                <Search className="w-5 h-5 text-amber-600" />
              </div>
              <input
                id="medicine-search-input"
                type="text"
                placeholder="Search Medicine by Name, Brand, Salt, or Company..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                className="w-full pl-14 pr-32 py-4 sm:py-4.5 bg-white border border-amber-200/80 rounded-full shadow-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/15 font-sans transition-all text-sm sm:text-base font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-28 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 px-6 py-3 sm:py-3.5 bg-primary-yellow hover:bg-[#E2B30D] text-gray-900 font-bold uppercase tracking-wider rounded-full text-xs sm:text-sm font-sans transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
              >
                <span>Search</span>
              </button>
            </form>

            {/* Smart Autocomplete Suggestions Panel */}
            {showSuggestions && searchQuery.trim().length >= 1 && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 text-left max-h-[380px] overflow-y-auto divide-y divide-gray-50">
                {suggestions.length > 0 ? (
                  <>
                    <div className="px-5 py-2.5 bg-amber-50/60 text-[10px] font-bold uppercase tracking-wider text-amber-900 border-b border-amber-100/50">
                      Suggestions Found
                    </div>
                    {suggestions.map((med) => (
                      <div
                        key={med.id}
                        onClick={() => handleSuggestionClick(med)}
                        className="p-4 hover:bg-amber-50/50 cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="space-y-0.5">
                          <div className="font-semibold text-gray-900 group-hover:text-amber-900 transition-colors flex items-center gap-2">
                            <span>{med.name}</span>
                            <span className="text-[10px] font-medium uppercase px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                              {med.dosageForm}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 font-medium">
                            Brand: <span className="text-gray-700 font-semibold">{med.brandName}</span> | Salt: <span className="text-gray-600 italic">{med.saltName}</span>
                          </div>
                          <div className="text-[10px] text-gray-400">
                            Mfr: {med.manufacturer}
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-4 flex flex-col items-end gap-1 select-none">
                          {med.discountPrice ? (
                            <>
                              <div className="flex items-baseline gap-1.5 justify-end">
                                <span className="text-sm font-bold text-gray-900">
                                  ₹{med.discountPrice.toLocaleString('en-IN')}
                                </span>
                                <span className="text-[10px] text-gray-400 line-through">
                                  ₹{med.mrp.toLocaleString('en-IN')}
                                </span>
                              </div>
                              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                {Math.round(((med.mrp - med.discountPrice) / med.mrp) * 100)}% OFF
                              </span>
                            </>
                          ) : (
                            <span className="text-sm font-bold text-gray-900">
                              ₹{med.mrp.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  searchQuery.trim().length >= 2 && (
                    <div className="p-6 text-center text-gray-500 space-y-2 bg-white">
                      <AlertCircle className="w-8 h-8 text-primary-yellow mx-auto" />
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-800">No matching medicines found</p>
                      <p className="text-xs text-gray-400 max-w-md mx-auto font-medium">
                        Try searching for popular drugs like <span className="font-semibold italic text-gray-600">Gefitinib</span>, <span className="font-semibold italic text-gray-600">Imatinib</span>, or <span className="font-semibold italic text-gray-600">Hepbest</span>.
                      </p>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Popular Searches Quick Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-gray-500">
            <span className="font-bold uppercase tracking-wider text-gray-600 text-[11px]">Popular:</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => {
                  setSearchQuery(term);
                  onSearchSubmit(term);
                }}
                className="px-3.5 py-1.5 bg-white/80 border border-gray-200/80 rounded-full hover:bg-primary-yellow text-gray-700 hover:text-gray-900 font-semibold uppercase tracking-wide text-[10px] transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
