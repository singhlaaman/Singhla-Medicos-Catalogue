import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Snowflake,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Pill,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info,
  Thermometer,
  FileText
} from 'lucide-react';
import { SaltInfo, Medicine, AppSettings } from '../types';
import { ALL_SALTS } from '../data/saltsData';
import { getMedicinesForSalt } from '../utils/saltMatcher';

interface SaltDetailProps {
  salt: SaltInfo;
  allMedicines: Medicine[];
  onBack: () => void;
  onGoToSaltLibrary: () => void;
  onSelectSalt: (slug: string) => void;
  onSelectMedicine: (slug: string) => void;
  settings: AppSettings;
}

export default function SaltDetail({
  salt,
  allMedicines,
  onBack,
  onGoToSaltLibrary,
  onSelectSalt,
  onSelectMedicine,
  settings,
}: SaltDetailProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Scroll to top when salt monograph changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [salt]);

  // Find all medicines matching this salt accurately in the live inventory
  const matchingMedicines = useMemo(() => {
    return getMedicinesForSalt(salt, allMedicines);
  }, [salt, allMedicines]);

  // Related salts in the same category
  const relatedSalts = useMemo(() => {
    return ALL_SALTS.filter(
      (s) => s.category === salt.category && s.id !== salt.id
    ).slice(0, 4);
  }, [salt]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getWhatsAppMessageUrl = () => {
    const text = `Hello Singhla Medicos,\nI would like to enquire about availability, pricing, and brands for the active salt: *${salt.name}* (Ref #${salt.sNo}).`;
    return `https://wa.me/${settings.contactWhatsApp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-10 py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Back Controls */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-sans flex-wrap">
          <button
            onClick={onBack}
            className="hover:text-gray-900 font-semibold cursor-pointer transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <button
            onClick={onGoToSaltLibrary}
            className="hover:text-gray-900 font-semibold cursor-pointer transition-colors"
          >
            Active Salt Library
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-bold text-gray-900">{salt.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onGoToSaltLibrary}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-800 transition-colors cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Salts Directory</span>
          </button>
        </div>
      </div>

      {/* Main Monograph Hero Section */}
      <div className="relative bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
        {/* Badges & Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-black uppercase tracking-wider">
              Salt #{salt.sNo}
            </span>
            <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
              salt.category.includes('Direct')
                ? 'bg-purple-100 text-purple-800 border border-purple-200'
                : salt.category.includes('supportive')
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-amber-100 text-amber-900 border border-amber-200'
            }`}>
              {salt.category}
            </span>
            {salt.coldStorage === 'Yes' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold uppercase">
                <Snowflake className="w-3.5 h-3.5 text-blue-600" />
                <span>Cold Chain (2°C - 8°C)</span>
              </span>
            )}
          </div>

          <div className="text-xs text-gray-500 font-sans flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-gray-700">Verified Pharmacopoeial Standard</span>
          </div>
        </div>

        {/* Title, Drug Class & Summary */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-gray-900 tracking-tight uppercase">
            {salt.name}
          </h1>
          <div className="text-sm sm:text-base font-semibold text-amber-800 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Class: {salt.drugClass}</span>
          </div>
          <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed max-w-4xl pt-1">
            {salt.descriptionShort}
          </p>
        </div>

        {/* Quick Parameters Snapshot Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
          <div className="p-4 bg-slate-50/70 rounded-2xl border border-gray-100">
            <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Common Strengths</div>
            <div className="text-xs sm:text-sm font-bold text-gray-900 mt-1">
              {salt.commonStrengths?.join(', ') || 'Various Strengths'}
            </div>
          </div>

          <div className="p-4 bg-slate-50/70 rounded-2xl border border-gray-100">
            <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Dosage Forms</div>
            <div className="text-xs sm:text-sm font-bold text-gray-900 mt-1">
              {salt.dosageForms?.join(', ') || 'Tablets, Injections'}
            </div>
          </div>

          <div className="p-4 bg-slate-50/70 rounded-2xl border border-gray-100">
            <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Cold Storage</div>
            <div className={`text-xs sm:text-sm font-bold mt-1 ${salt.coldStorage === 'Yes' ? 'text-blue-700' : 'text-gray-900'}`}>
              {salt.coldStorage === 'Yes' ? 'Yes (2°C - 8°C Required)' : 'Room Temp (15°C - 25°C)'}
            </div>
          </div>

          <div className="p-4 bg-slate-50/70 rounded-2xl border border-gray-100">
            <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Inventory Availability</div>
            <div className="text-xs sm:text-sm font-bold text-emerald-700 mt-1 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{matchingMedicines.length} Brands In Stock</span>
            </div>
          </div>
        </div>

        {/* Action Call & WhatsApp Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <a
            id="salt-detail-call-btn"
            href={`tel:${settings.contactPhone}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer"
          >
            <Phone className="w-4 h-4 fill-white text-white" />
            <span>Call for {salt.name} Pricing (+91 82874 43428)</span>
          </a>

          <a
            id="salt-detail-whatsapp-btn"
            href={getWhatsAppMessageUrl()}
            target="_blank"
            referrerPolicy="no-referrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Grid: Monograph Details & Mechanism */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Detailed Sections */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Detailed Pharmacological Overview */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-gray-900 border-b border-gray-100 pb-4">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide">
                Detailed Clinical Monograph & Pharmacology
              </h2>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed font-sans font-normal whitespace-pre-line">
              {salt.descriptionLong}
            </p>
          </div>

          {/* Mechanism of Action Box */}
          <div className="bg-linear-to-br from-amber-50/60 via-amber-50/30 to-orange-50/40 rounded-3xl border border-amber-200/70 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-amber-950 border-b border-amber-200/50 pb-4">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide">
                Mechanism of Action (Pharmacodynamics)
              </h2>
            </div>
            <div className="text-sm text-amber-950/90 leading-relaxed font-sans font-normal">
              {salt.mechanismOfAction}
            </div>
          </div>

          {/* Approved Therapeutic Indications */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-gray-900 border-b border-gray-100 pb-4">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide">
                Approved Therapeutic Indications
              </h2>
            </div>
            <ul className="space-y-3">
              {salt.indications?.map((ind, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <span className="font-medium leading-relaxed">{ind}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety Profile & Common Side Effects */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-gray-900 border-b border-gray-100 pb-4">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide">
                Safety Profile & Common Adverse Reactions
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {salt.commonSideEffects?.map((effect, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 rounded-xl border border-gray-100 text-xs font-medium text-gray-800 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{effect}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Storage and Handling Guidelines */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-gray-900 border-b border-gray-100 pb-4">
              <Thermometer className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide">
                Storage & Safe Handling Instructions
              </h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <p className="leading-relaxed">
                <strong>Recommended Storage:</strong> {salt.storageAdvice}
              </p>
              {salt.coldStorage === 'Yes' && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Snowflake className="w-4 h-4 text-blue-600" />
                    <span>Cold-Chain Assurance Guarantee</span>
                  </div>
                  <p>
                    Singhla Medicos strictly maintains calibrated 2°C–8°C cold room refrigeration and dispenses temperature-sensitive medications with validated gel packs and data loggers.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* FAQs Accordion */}
          {salt.faqs && salt.faqs.length > 0 && (
            <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 text-gray-900 border-b border-gray-100 pb-4">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide">
                  Clinical & Patient FAQs for {salt.name}
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                {salt.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0">
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between gap-4 text-left font-display font-bold text-sm text-gray-900 hover:text-amber-800 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="mt-2.5 text-xs text-gray-600 font-sans leading-relaxed pl-2 border-l-2 border-amber-400">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right 4 Cols: Matching Products, Brands & Related Salts */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Commercial Brands / Aliases Box */}
          {salt.aliases && salt.aliases.length > 0 && (
            <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
                <span>Known Commercial Brands & Aliases</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {salt.aliases.map((brand, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/80 text-xs font-bold"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* In-Stock Medicines Matching This Salt */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-display font-bold uppercase tracking-tight text-gray-900 flex items-center gap-2">
                <Pill className="w-4 h-4 text-emerald-600" />
                <span>Available Products ({matchingMedicines.length})</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Live Inventory
              </span>
            </div>

            {matchingMedicines.length === 0 ? (
              <div className="p-4 bg-slate-50 rounded-2xl text-center space-y-2 border border-dashed border-gray-200">
                <p className="text-xs text-gray-600">
                  We supply all brands and strengths containing <strong>{salt.name}</strong> upon prescription request.
                </p>
                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline pt-1"
                >
                  <span>Request Procurement Quote</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ) : (
              <div className="space-y-3 divide-y divide-gray-100">
                {matchingMedicines.slice(0, 6).map((med) => (
                  <div
                    key={med.id}
                    onClick={() => onSelectMedicine(med.slug)}
                    className="pt-3 first:pt-0 group cursor-pointer space-y-1.5 hover:bg-slate-50/50 p-2 rounded-xl transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-xs text-gray-900 group-hover:text-amber-800 transition-colors">
                          {med.name}
                        </div>
                        <div className="text-[10px] text-gray-500 font-medium">
                          {med.strength} • {med.dosageForm}s ({med.packaging})
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        {med.discountPrice ? (
                          <div className="font-bold text-xs text-gray-900">
                            ₹{med.discountPrice.toLocaleString('en-IN')}
                          </div>
                        ) : (
                          <div className="font-bold text-xs text-gray-900">
                            ₹{med.mrp.toLocaleString('en-IN')}
                          </div>
                        )}
                        <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                          {med.availability}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Related Salts in same Category */}
          {relatedSalts.length > 0 && (
            <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Related {salt.category.includes('Direct') ? 'Antineoplastic' : 'Supportive'} Salts
              </h3>
              <div className="space-y-2">
                {relatedSalts.map((rSalt) => (
                  <div
                    key={rSalt.id}
                    onClick={() => onSelectSalt(rSalt.slug)}
                    className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-xl border border-gray-100 cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-xs font-bold text-gray-900 group-hover:text-amber-800 truncate">
                        {rSalt.name}
                      </div>
                      <div className="text-[10px] text-gray-500 truncate">
                        {rSalt.drugClass}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct Consultation / Verification Box */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-bold text-xs uppercase tracking-wider">Specialist Dispensing</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans font-normal">
              Have questions about dosage calculations, reconstitution, storage protocols, or commercial pricing for <strong>{salt.name}</strong>?
            </p>
            <a
              href={`tel:${settings.contactPhone}`}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <Phone className="w-3.5 h-3.5 fill-gray-950" />
              <span>Talk to Pharmacist</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
