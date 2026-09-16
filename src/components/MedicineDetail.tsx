import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone, MessageCircle, ShieldAlert, Snowflake, Info, AlertTriangle, CheckCircle, HelpCircle, Star, X, Pill, ExternalLink } from 'lucide-react';
import { Medicine, AppSettings } from '../types';
import { ALL_SALTS } from '../data/saltsData';
import { getSaltForMedicine } from '../utils/saltMatcher';
import { setCanonicalUrl, getMedicineCanonicalUrl } from '../utils/seo';
import MedicineImage from './MedicineImage';

interface MedicineDetailProps {
  medicine: Medicine;
  allMedicines: Medicine[];
  onBack: () => void;
  onSelectMedicine: (slug: string) => void;
  onSelectSalt?: (slug: string) => void;
  settings: AppSettings;
}

export default function MedicineDetail({
  medicine,
  allMedicines,
  onBack,
  onSelectMedicine,
  onSelectSalt,
  settings
}: MedicineDetailProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Find if matching salt monograph exists
  const matchingSalt = getSaltForMedicine(medicine, ALL_SALTS);

  const handleSaltClick = () => {
    if (matchingSalt) {
      if (onSelectSalt) {
        onSelectSalt(matchingSalt.slug);
      } else {
        window.location.hash = `#/salt/${matchingSalt.slug}`;
      }
    } else {
      window.location.hash = '#/salts';
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Scroll to top and set canonical URL when medicine changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (medicine?.slug) {
      setCanonicalUrl(getMedicineCanonicalUrl(medicine.slug));
    }
  }, [medicine]);

  // Compute related medicines details
  const relatedList = allMedicines.filter((med) => {
    // If explicitly listed, or same category, but not current medicine
    return (
      (medicine.relatedMedicines.includes(med.slug) || med.category === medicine.category) &&
      med.id !== medicine.id
    );
  }).slice(0, 4); // Max 4

  const saveAmount = medicine.discountPrice ? medicine.mrp - medicine.discountPrice : 0;
  const savePct = medicine.discountPrice ? Math.round((saveAmount / medicine.mrp) * 100) : 0;

  // Render a warning block
  const renderWarning = (label: string, icon: string, desc: string) => (
    <div className="p-4 bg-slate-50/60 border border-gray-100 rounded-2xl flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-xs">
        {icon}
      </div>
      <div>
        <h5 className="font-bold text-xs text-gray-900 uppercase tracking-wide">{label}</h5>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed font-normal">{desc}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 py-4">
      {/* Back navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-800 hover:text-amber-800 transition-colors cursor-pointer border border-gray-200 bg-white px-4 py-2.5 rounded-xl shadow-2xs hover:bg-amber-50/50"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Medicine List</span>
      </button>

      {/* Primary specs grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left column: Image presentation with zoom & Badges (Sticky on desktop) */}
        <div className="lg:col-span-3 lg:sticky lg:top-6 space-y-4 shrink-0">
          <div className="relative border border-gray-100 rounded-2xl p-3 bg-white overflow-hidden max-w-[270px] sm:max-w-[330px] mx-auto lg:max-w-none shadow-xs">
            <MedicineImage
              brandName={medicine.brandName}
              genericName={medicine.genericName}
              strength={medicine.strength}
              dosageForm={medicine.dosageForm}
              coldStorage={medicine.coldStorage}
              imageUrl={medicine.images?.[0]}
              allowZoom={!isMobile}
              onClick={() => {
                if (isMobile) {
                  setIsModalOpen(true);
                }
              }}
              className={`w-full max-w-[160px] sm:max-w-[210px] mx-auto ${isZoomed && !isMobile ? 'scale-105' : ''}`}
            />
            {/* Quick Helper Overlay */}
            <div className="absolute bottom-3 left-3 bg-gray-900/90 text-white text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider hidden lg:block backdrop-blur-xs">
              Hover to Zoom
            </div>
            <div className="absolute bottom-3 left-3 bg-gray-900/90 text-white text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider lg:hidden backdrop-blur-xs">
              Tap to Enlarge
            </div>
          </div>

          {/* Quick Warnings / Badges underneath image */}
          <div className="grid grid-cols-1 gap-3 max-w-[270px] sm:max-w-[330px] mx-auto lg:max-w-none">
            {medicine.prescriptionRequired === 'Yes' && (
              <div className="p-3 bg-red-50/80 border border-red-200 rounded-xl flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                <div>
                  <div className="text-[9px] font-bold text-red-800 uppercase tracking-widest">Prescription</div>
                  <div className="text-xs text-red-600 font-bold uppercase">Required</div>
                </div>
              </div>
            )}

            {medicine.coldStorage === 'Yes' && (
              <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center gap-2.5">
                <Snowflake className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <div className="text-[9px] font-bold text-blue-800 uppercase tracking-widest">Cold Chain</div>
                  <div className="text-xs text-blue-600 font-bold uppercase">{medicine.storageTemperature}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column: All Spec Sheets, Pricing, description, and other details */}
        <div className="lg:col-span-9 space-y-8">
          {/* Top section specs */}
          <div className="space-y-6">
            {/* Category & Status */}
            <div className="flex items-center justify-between text-xs border-b border-gray-100 pb-4">
              <span className="px-3 py-1 bg-primary-yellow text-gray-900 rounded-full font-bold uppercase tracking-wider text-[10px] shadow-2xs">
                {medicine.category}
              </span>
              <span className="flex items-center gap-1.5 font-sans uppercase font-bold text-[11px] text-gray-500">
                <span className={`w-2 h-2 rounded-full ${
                  medicine.availability === 'In Stock'
                    ? 'bg-emerald-500'
                    : medicine.availability === 'Limited Stock'
                    ? 'bg-amber-500'
                    : 'bg-red-500'
                }`} />
                <span className="font-bold text-gray-800">{medicine.availability}</span>
              </span>
            </div>

            {/* Titles & Pricing */}
            <div className="space-y-3 pb-4 border-b border-dashed border-gray-200">
              {/* Product name & generic info */}
              <div className="space-y-1">
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 tracking-tight leading-tight uppercase">
                  {medicine.name}
                </h2>
                <p className="text-xs text-gray-500 font-sans uppercase font-bold tracking-wide">
                  <span className="text-gray-800 font-bold">{medicine.genericName}</span>
                </p>
              </div>

              {/* Pricing, Discount and MRP details directly under medicine name (no box) */}
              <div className="pt-1 space-y-1">
                <div className="flex flex-wrap items-baseline gap-2.5">
                  {medicine.discountPrice ? (
                    <>
                      <span className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
                        ₹{medicine.discountPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm text-gray-400 font-semibold line-through">
                        MRP: ₹{medicine.mrp.toLocaleString('en-IN')}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
                      ₹{medicine.mrp.toLocaleString('en-IN')}
                    </span>
                  )}
                  {savePct > 0 && (
                    <span className="text-xs font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {savePct}% OFF (Save ₹{saveAmount.toLocaleString('en-IN')})
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-semibold uppercase text-gray-400">
                  * GST Included
                </div>
              </div>
            </div>

            {/* Quick Parameter Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6 py-4 px-5 bg-slate-50/50 rounded-2xl border border-gray-100 text-xs">
              <div 
                onClick={handleSaltClick}
                className="cursor-pointer group/salt hover:bg-amber-50/60 p-1.5 -m-1.5 rounded-xl transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] flex items-center gap-1">
                    <Pill className="w-3 h-3 text-amber-600" />
                    <span>Salt Formulation</span>
                  </span>
                  <span className="text-[8px] font-bold text-amber-800 uppercase group-hover/salt:underline flex items-center gap-0.5">
                    <span>Monograph</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
                <div className="font-bold text-gray-900 group-hover/salt:text-amber-900 mt-1 truncate text-[11px]" title={medicine.saltName}>
                  {medicine.saltName}
                </div>
              </div>
              <div>
                <div className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Form / Packaging</div>
                <div className="font-bold text-gray-800 mt-1 uppercase text-[11px]">{medicine.dosageForm}s ({medicine.packaging})</div>
              </div>
              <div>
                <div className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Manufacturer</div>
                <div className="font-bold text-gray-800 mt-1 truncate text-[11px]" title={medicine.manufacturer}>{medicine.manufacturer.split('/')[0]}</div>
              </div>
            </div>

            {/* CALL & WHATSAPP ACTION BUTTONS - MOST IMPORTANT */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs text-gray-900 uppercase tracking-widest">
                Instant Purchase Enquiry
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Call button */}
                <a
                  id="product-detail-call-btn"
                  href={`tel:${settings.contactPhone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold text-sm uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  <Phone className="w-4 h-4 fill-white text-white" />
                  <span>Call +91 82874 43428</span>
                </a>

                {/* WhatsApp Button with Auto Prefilled Message specific to this product */}
                <a
                  id="product-detail-whatsapp-btn"
                  href={`https://wa.me/${settings.contactWhatsApp}?text=${encodeURIComponent(
                    `Hello,\nI would like to enquire about ${medicine.name} (${medicine.brandName} - ${medicine.strength} ${medicine.dosageForm}s). Please share the price, availability, and delivery options.`
                  )}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-sm uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Detailed Description, Instructions, Storage & Warnings */}
          <div className="border-t border-gray-100 pt-8 space-y-8">
            {/* Uses & Side effects side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Uses Checklist */}
              <div className="space-y-3 bg-white border border-gray-100 p-5 rounded-2xl shadow-2xs">
                <h4 className="font-display font-bold text-sm text-gray-900 flex items-center gap-2 uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Primary Uses & Benefits
                </h4>
                <ul className="space-y-2 text-xs text-gray-800 font-sans">
                  {medicine.uses.map((use, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span>
                      <span className="leading-relaxed font-semibold uppercase text-[11px] tracking-wide">{use}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Side Effects List */}
              <div className="space-y-3 bg-white border border-gray-100 p-5 rounded-2xl shadow-2xs">
                <h4 className="font-display font-bold text-sm text-gray-900 flex items-center gap-2 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Possible Side Effects
                </h4>
                <div className="grid grid-cols-1 gap-2 text-xs text-gray-800 font-sans">
                  {medicine.sideEffects.map((se, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-red-400 shrink-0 font-bold">•</span>
                      <span className="font-semibold uppercase text-[11px] tracking-wide">{se}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 font-medium uppercase mt-2">
                  Note: Side effects are rare but possible. If you experience severe symptoms, contact your physician immediately.
                </p>
              </div>
            </div>

            {/* Storage, Dosage & Interactions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side of Subgrid: Storage & Dosage */}
              <div className="space-y-4">
                {/* Storage Instructions */}
                <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3 shadow-2xs">
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-primary-yellow flex items-center gap-1.5">
                    <Snowflake className="w-4 h-4 text-primary-yellow" />
                    Storage Spec
                  </h4>
                  <div className="space-y-2 text-xs font-sans uppercase">
                    <div>
                      <span className="text-gray-400 font-semibold text-[10px] tracking-widest">Environment:</span>
                      <p className="font-bold text-white">{medicine.coldStorage === 'Yes' ? 'Cold Storage (2°C–8°C)' : 'Store at Room Temp'}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold text-[10px] tracking-widest">Temperature Limits:</span>
                      <p className="font-bold text-white">{medicine.storageTemperature}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold text-[10px] tracking-widest">Instructions:</span>
                      <p className="text-gray-300 text-[11px] leading-relaxed normal-case mt-0.5">{medicine.storageInstructions}</p>
                    </div>
                  </div>
                </div>

                {/* Dosage General warnings */}
                <div className="p-4 bg-slate-50/60 rounded-2xl border border-gray-100">
                  <h5 className="font-sans font-bold text-xs text-gray-900 uppercase tracking-wider">General Dosage Instructions</h5>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed italic font-medium">
                    {medicine.dosage} (Always consult your prescribing oncologist or general practitioner. Do not self-administer.)
                  </p>
                </div>
              </div>

              {/* Right Side of Subgrid: Interactions */}
              <div className="p-5 bg-white border border-gray-100 rounded-2xl space-y-3 shadow-2xs">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
                  Interactions & Contradictions
                </h4>
                <div className="space-y-3 text-xs font-sans">
                  <div>
                    <span className="font-bold text-red-600 block text-[10px] uppercase tracking-wider">Drug Interactions</span>
                    <p className="text-gray-500 text-[11px] leading-relaxed">May react with antacids, specific blood-thinners, and enzyme-inducing agents. Tell your doctor about your current medications.</p>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <span className="font-bold text-amber-600 block text-[10px] uppercase tracking-wider">Food Interactions</span>
                    <p className="text-gray-500 text-[11px] leading-relaxed">Avoid grapefruit, grapefruit juice, and heavy alcohol intake as they can dramatically interfere with drug absorption.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warnings & Precautions Section */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-gray-900 uppercase tracking-tight border-b border-gray-100 pb-2">Warnings & Patient Precautions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renderWarning('Pregnancy', '🤰', 'Highly unsafe. There is definitive evidence of human fetal risk. Consult your oncologist before starting therapy.')}
                {renderWarning('Breastfeeding', '🍼', 'Unsafe. The drug is likely to pass into breast milk and could potentially harm the newborn. Discontinue lactation.')}
                {renderWarning('Alcohol', '🍷', 'Avoid or limit. Alcohol consumption may exacerbate side effects like nausea, fatigue, or elevated liver enzymes.')}
                {renderWarning('Driving', '🚗', 'Exercise caution. May cause dizziness, blurry vision, or extreme fatigue which impairs reaction speeds.')}
                {renderWarning('Kidney Disease', '🩺', 'Requires close monitoring. Dose adjustments may be needed in moderate to severe renal impairment.')}
                {renderWarning('Liver Disease', '🩺', 'Requires close monitoring. Check liver function tests (LFTs) regularly as targeted cancer therapies can elevate liver enzymes.')}
              </div>
            </div>

            {/* Frequently Asked Questions */}
            {medicine.faqs && medicine.faqs.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-gray-900 uppercase tracking-tight border-b border-gray-100 pb-2">Frequently Asked Questions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {medicine.faqs.map((faq, index) => (
                    <div key={index} className="p-5 bg-white border border-gray-100 rounded-2xl space-y-2 text-xs shadow-2xs">
                      <h5 className="font-bold text-gray-900 flex items-start gap-1.5 leading-relaxed uppercase tracking-wide">
                        <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{faq.question}</span>
                      </h5>
                      <p className="text-gray-500 pl-5 leading-relaxed font-sans font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Medicines Slider/Grid */}
      {relatedList.length > 0 && (
        <div className="space-y-4 border-t border-gray-100 pt-8">
          <h3 className="font-display font-bold text-lg text-gray-900 uppercase tracking-tight">Related Speciality Medicines</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedList.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectMedicine(rel.slug)}
                className="bg-white border border-gray-100 hover:border-amber-200 rounded-2xl p-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
              >
                <MedicineImage
                  brandName={rel.brandName}
                  genericName={rel.genericName}
                  strength={rel.strength}
                  dosageForm={rel.dosageForm}
                  coldStorage={rel.coldStorage}
                  imageUrl={rel.images?.[0]}
                  className="w-full max-w-[150px] sm:max-w-none mx-auto aspect-square"
                />
                <div className="mt-2 text-center space-y-1">
                  <h5 className="font-bold text-xs text-gray-900 group-hover:text-amber-800 uppercase truncate transition-colors">
                    {rel.name}
                  </h5>
                  <p className="text-[10px] text-gray-400 italic font-medium truncate">
                    {rel.saltName}
                  </p>
                  <p className="text-xs font-bold text-gray-900">
                    ₹{(rel.discountPrice || rel.mrp).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Big Image Modal for Mobile */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative bg-white rounded-2xl p-6 w-[92vw] max-w-[480px] border border-gray-100 shadow-2xl flex flex-col items-center gap-4 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-3 -right-3 bg-white text-gray-700 hover:bg-amber-100 hover:text-gray-900 transition-colors rounded-full p-2 shadow-md cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Medicine Image Container */}
            <div className="w-full aspect-square flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden border border-gray-100 p-2">
              <MedicineImage
                brandName={medicine.brandName}
                genericName={medicine.genericName}
                strength={medicine.strength}
                dosageForm={medicine.dosageForm}
                coldStorage={medicine.coldStorage}
                imageUrl={medicine.images?.[0]}
                allowZoom={false}
                className="w-full h-full max-w-[440px] mx-auto bg-transparent border-0 shadow-none"
              />
            </div>

            {/* Product labels */}
            <div className="w-full text-center space-y-1">
              <h4 className="font-display font-bold text-lg text-gray-900 uppercase tracking-tight">
                {medicine.name}
              </h4>
              <p className="text-xs text-gray-500 font-sans uppercase font-bold tracking-wider">
                {medicine.genericName}
              </p>
              <p className="text-xs font-bold text-gray-900 mt-1 bg-amber-50 border border-amber-200 inline-block px-3 py-0.5 rounded-full">
                {medicine.strength} • {medicine.dosageForm}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
