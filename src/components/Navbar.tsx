import React, { useState, useRef, useEffect } from 'react';
import { Phone, MessageCircle, ShieldCheck, Search, X, AlertCircle, Pill, Sparkles, BookOpen } from 'lucide-react';
import { AppSettings, Medicine, SaltInfo } from '../types';
import { ALL_SALTS } from '../data/saltsData';
import Logo from './Logo';

interface NavbarProps {
  settings: AppSettings;
  onGoHome: () => void;
  medicines: Medicine[];
  onSelectMedicine: (slug: string) => void;
  onSearchSubmit: (query: string) => void;
  onGoToSalts?: () => void;
  onSelectSalt?: (slug: string) => void;
}

export default function Navbar({
  settings,
  onGoHome,
  medicines,
  onSelectMedicine,
  onSearchSubmit,
  onGoToSalts,
  onSelectSalt,
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Medicine[]>([]);
  const [saltSuggestions, setSaltSuggestions] = useState<SaltInfo[]>([]);
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
      setSaltSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filteredMeds = medicines.filter(med => {
      return (
        med.name.toLowerCase().includes(query) ||
        med.brandName.toLowerCase().includes(query) ||
        med.genericName.toLowerCase().includes(query) ||
        med.saltName.toLowerCase().includes(query) ||
        med.manufacturer.toLowerCase().includes(query)
      );
    }).slice(0, 5); // Max 5 suggestions

    const filteredSalts = ALL_SALTS.filter(salt => {
      return (
        salt.name.toLowerCase().includes(query) ||
        salt.drugClass.toLowerCase().includes(query) ||
        salt.aliases?.some(a => a.toLowerCase().includes(query))
      );
    }).slice(0, 3); // Max 3 salt suggestions

    setSuggestions(filteredMeds);
    setSaltSuggestions(filteredSalts);
  }, [searchQuery, medicines]);

  const handleSuggestionClick = (med: Medicine) => {
    onSelectMedicine(med.slug);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleSaltSuggestionClick = (salt: SaltInfo) => {
    if (onSelectSalt) {
      onSelectSalt(salt.slug);
    } else {
      window.location.hash = `#/salt/${salt.slug}`;
    }
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
    setSaltSuggestions([]);
  };

  const handleSearchFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
      setShowSuggestions(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:h-16">
          
          {/* Logo Section & Quick Salt Directory Nav */}
          <div className="flex items-center justify-between shrink-0 gap-4">
            <div 
              onClick={onGoHome}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Logo className="h-9 sm:h-10" />
            </div>

            {/* Salt Library Pill on Mobile */}
            <button
              onClick={onGoToSalts || (() => { window.location.hash = '#/salts'; })}
              className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Pill className="w-3.5 h-3.5 text-amber-700" />
              <span>Salts Directory</span>
            </button>
          </div>

          {/* Elegant Modern Pill Search Bar in top bar */}
          <div ref={dropdownRef} className="relative flex-1 max-w-full md:max-w-xl lg:max-w-2xl mx-0 md:mx-4">
            <form onSubmit={handleSearchFormSubmit} className="relative flex items-center">
              <div className="absolute left-4 text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search medicines, brands, active salts..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                className="w-full pl-10 pr-24 py-2.5 bg-gray-50/80 border border-gray-200/80 rounded-full text-xs font-sans text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-20 p-1 text-gray-400 hover:text-gray-600 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1 px-4 py-1.5 bg-primary-yellow hover:bg-[#E2B30D] text-gray-900 font-bold uppercase tracking-wider rounded-full text-[10px] font-sans transition-all cursor-pointer shadow-xs"
              >
                Search
              </button>
            </form>

            {/* Suggestions Panel */}
            {showSuggestions && searchQuery.trim().length >= 1 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 text-left max-h-[380px] overflow-y-auto divide-y divide-gray-50">
                
                {/* Active Salts Section */}
                {saltSuggestions.length > 0 && (
                  <div>
                    <div className="px-4 py-2 bg-slate-900 text-[9px] font-black uppercase tracking-wider text-amber-300 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Pill className="w-3 h-3 text-amber-400" />
                        <span>Active Salt Monographs</span>
                      </span>
                      <span className="text-gray-400">Click to view monograph</span>
                    </div>
                    {saltSuggestions.map((salt) => (
                      <div
                        key={salt.id}
                        onClick={() => handleSaltSuggestionClick(salt)}
                        className="p-3 hover:bg-amber-50/80 cursor-pointer transition-colors flex items-center justify-between group bg-slate-50/40"
                      >
                        <div className="space-y-0.5 min-w-0 flex-1 pr-2">
                          <div className="font-bold text-gray-900 text-xs group-hover:text-amber-900 transition-colors flex items-center gap-2">
                            <span>{salt.name}</span>
                            <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                              Salt #{salt.sNo}
                            </span>
                          </div>
                          <div className="text-[10px] text-gray-500 font-medium truncate">
                            Class: <span className="text-gray-700">{salt.drugClass}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-amber-800 uppercase group-hover:translate-x-0.5 transition-transform shrink-0">
                          Monograph →
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Medicine Products Section */}
                {suggestions.length > 0 ? (
                  <>
                    <div className="px-4 py-2 bg-amber-50/50 text-[9px] font-bold uppercase tracking-wider text-amber-900 border-b border-amber-100/50">
                      Medicine Products
                    </div>
                    {suggestions.map((med) => (
                      <div
                        key={med.id}
                        onClick={() => handleSuggestionClick(med)}
                        className="p-3.5 hover:bg-amber-50/60 cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="space-y-0.5 min-w-0 flex-1 pr-2">
                          <div className="font-semibold text-gray-900 text-xs group-hover:text-amber-900 transition-colors flex items-center gap-1.5 truncate">
                            <span className="truncate">{med.name}</span>
                            <span className="shrink-0 text-[8px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                              {med.dosageForm}
                            </span>
                          </div>
                          <div className="text-[10px] text-gray-500 font-medium truncate">
                            Salt: <span className="text-gray-600 italic">{med.saltName}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0 flex flex-col items-end gap-0.5">
                          {med.discountPrice ? (
                            <>
                              <div className="flex items-baseline gap-1">
                                <span className="text-xs font-bold text-gray-900">
                                  ₹{med.discountPrice.toLocaleString('en-IN')}
                                </span>
                              </div>
                              <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-1 rounded border border-emerald-200">
                                {Math.round(((med.mrp - med.discountPrice) / med.mrp) * 100)}% OFF
                              </span>
                            </>
                          ) : (
                            <span className="text-xs font-display font-black text-dark-grey">
                              ₹{med.mrp.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  searchQuery.trim().length >= 2 && saltSuggestions.length === 0 && (
                    <div className="p-4 text-center text-gray-500 space-y-1.5 bg-white">
                      <AlertCircle className="w-6 h-6 text-primary-yellow mx-auto" />
                      <p className="text-[10px] font-black uppercase tracking-wider text-dark-grey">No matching medicines or salts found</p>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Desktop Navigation Links & Action Buttons */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Salt Directory Nav Button */}
            <button
              id="desktop-salts-directory-btn"
              onClick={onGoToSalts || (() => { window.location.hash = '#/salts'; })}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-2xs border border-slate-700"
            >
              <Pill className="w-3.5 h-3.5 text-amber-400" />
              <span>Drug Salts ({ALL_SALTS.length})</span>
            </button>

            {/* Call Button */}
            <a
              id="desktop-call-btn"
              href={`tel:${settings.contactPhone}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] bg-call-blue hover:bg-blue-700 text-white font-sans font-bold text-[10px] uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 fill-white" />
              <span>Call: +91 82874 43428</span>
            </a>

            {/* WhatsApp Button */}
            <a
              id="desktop-whatsapp-btn"
              href={`https://wa.me/${settings.contactWhatsApp}?text=${encodeURIComponent("Hello,\nI would like to enquire about a medicine.")}`}
              target="_blank"
              referrerPolicy="no-referrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[4px] bg-whatsapp-green hover:bg-emerald-600 text-white font-sans font-bold text-[10px] uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
