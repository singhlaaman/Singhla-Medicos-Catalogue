import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, ShieldCheck, FileText } from 'lucide-react';
import { AppSettings } from '../types';
import Logo from './Logo';

interface FooterProps {
  settings: AppSettings;
  onGoHome: () => void;
  onSelectCategory: (name: string | null) => void;
  onGoToSalts?: () => void;
}

export default function Footer({ settings, onGoHome, onSelectCategory, onGoToSalts }: FooterProps) {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const categoriesList = [
    'Cancer Medicines',
    'Heart Medicines',
    'Diabetes Medicines',
    'Liver Medicines',
    'Neurology Medicines'
  ];

  return (
    <footer className="bg-slate-900 text-gray-300 border-t-2 border-primary-yellow pt-16 pb-24 md:pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Info and Branding */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center cursor-pointer" onClick={onGoHome}>
              <Logo className="h-11" darkBg={true} />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-normal">
              Singhla Medicos is a premium super-speciality pharmacy specializing in critical care oncology drugs, cardiology, and chronic disease therapies. We provide nationwide distribution with certified 2°C–8°C cold chain logistics.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800/80">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Licensed Oncology Chemist
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-display font-bold text-xs text-white uppercase tracking-widest">
              Speciality Links
            </h5>
            <ul className="space-y-2 text-xs text-gray-400 font-medium uppercase tracking-wider">
              <li>
                <button
                  onClick={onGoToSalts || (() => { window.location.hash = '#/salts'; })}
                  className="text-amber-400 font-bold hover:text-amber-300 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Active Drug Salts (91)</span>
                  <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded">New</span>
                </button>
              </li>
              {categoriesList.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onSelectCategory(cat)}
                    className="hover:text-primary-yellow transition-colors text-left cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact details & address */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="font-display font-bold text-xs text-white uppercase tracking-widest">
              Contact & Location
            </h5>
            <div className="space-y-2 text-xs text-gray-400 font-medium tracking-wide">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary-yellow shrink-0 mt-0.5" />
                <p className="leading-relaxed font-normal text-gray-300">
                  {settings.address}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary-yellow shrink-0" />
                <a href={`tel:${settings.contactPhone}`} className="hover:text-white transition-colors font-bold text-gray-200">
                  {settings.contactPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary-yellow shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors text-gray-300">
                  {settings.email}
                </a>
              </div>
            </div>

            {/* Google Maps link block */}
            <div className="pt-2">
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-gray-900 bg-primary-yellow hover:bg-amber-400 px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Navigate on Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Medical disclaimer */}
        <div className="border-t border-slate-800 pt-8 text-[11px] text-gray-400 leading-relaxed space-y-2 font-normal">
          <p className="font-bold uppercase text-gray-300 tracking-wider">🚨 MEDICAL DISCLAIMER & COMPLIANCE</p>
          <p>
            The medicine specifications, uses, and interactions listed on Singhla Medicos website are compiled purely for informational and reference purposes. This website is NOT a substitute for professional medical advice, diagnosis, or treatment. We do not support self-medication. For all Schedule H, Schedule H1, and oncology drugs, we strictly mandate the submission of a valid registered physician's prescription.
          </p>
          <p>
            Offline completion of sale takes place strictly at our physical licensed premises under the direct supervision of a registered pharmacist.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium tracking-wider">
          <p>
            &copy; {new Date().getFullYear()} Singhla Medicos. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowPrivacy(true)}
              className="hover:text-primary-yellow transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setShowTerms(true)}
              className="hover:text-primary-yellow transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {/* PRIVACY POLICY MODAL */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-gray-800 rounded-2xl border border-gray-100 max-w-2xl w-full p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-4 shadow-xl relative">
            <button
              onClick={() => setShowPrivacy(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 font-bold hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
            >
              ✕
            </button>
            <h4 className="font-display font-bold text-xl text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3 uppercase tracking-tight">
              <FileText className="w-5 h-5 text-amber-600" />
              Privacy Policy
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-gray-600 font-sans">
              <p className="font-semibold uppercase text-[10px] tracking-wider text-gray-400">Last Updated: July 2, 2026</p>
              <p>
                At Singhla Medicos, your privacy is of critical importance. Since we do not facilitate online checkouts or payment transactions, we do not store credit card numbers, payment methods, or banking credentials.
              </p>
              <h5 className="font-bold text-gray-900 uppercase mt-2 text-[11px] tracking-wide">1. Information We Receive</h5>
              <p>
                We only receive the name, telephone number, and message text you send us when initiating a telephone inquiry or WhatsApp session. Prescriptions shared with us to verify orders are treated with high clinical confidentiality and are only accessed by qualified licensed pharmacists.
              </p>
              <h5 className="font-bold text-gray-900 uppercase mt-2 text-[11px] tracking-wide">2. Secure Handling</h5>
              <p>
                Prescription records are stored securely in compliance with the Drugs and Cosmetics Act of India. We never share, sell, or rent patient details or medical histories to third-party marketing companies.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 text-right">
              <button
                onClick={() => setShowPrivacy(false)}
                className="px-5 py-2.5 bg-primary-yellow hover:bg-amber-400 text-gray-900 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-xs transition-colors"
              >
                Close Privacy Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TERMS & CONDITIONS MODAL */}
      {showTerms && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-gray-800 rounded-2xl border border-gray-100 max-w-2xl w-full p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-4 shadow-xl relative">
            <button
              onClick={() => setShowTerms(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 font-bold hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
            >
              ✕
            </button>
            <h4 className="font-display font-bold text-xl text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3 uppercase tracking-tight">
              <FileText className="w-5 h-5 text-amber-600" />
              Terms & Conditions
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-gray-600 font-sans">
              <p className="font-semibold uppercase text-[10px] tracking-wider text-gray-400">Last Updated: July 2, 2026</p>
              <h5 className="font-bold text-gray-900 uppercase mt-2 text-[11px] tracking-wide">1. No E-Commerce Transactions</h5>
              <p>
                Singhla Medicos does not sell medicines directly through online payments or digital shopping carts. Any enquiry initiated on this website represents a request for pricing, stock verification, and professional consult.
              </p>
              <h5 className="font-bold text-gray-900 uppercase mt-2 text-[11px] tracking-wide">2. Prescription Mandate</h5>
              <p>
                We do not dispatch, deliver, or sell Schedule H, Schedule H1, or oncology medicines without verifying a legitimate prescription issued by an appropriate registered medical professional.
              </p>
              <h5 className="font-bold text-gray-900 uppercase mt-2 text-[11px] tracking-wide">3. Cold Chain Transport Responsibility</h5>
              <p>
                While we employ standard medical coolers and validated insulated packs to ship thermal sensitive goods, patients must ensure they receive the parcel immediately upon delivery to maintain the critical temperature window.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 text-right">
              <button
                onClick={() => setShowTerms(false)}
                className="px-5 py-2.5 bg-primary-yellow hover:bg-amber-400 text-gray-900 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-xs transition-colors"
              >
                Close Terms & Conditions
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
