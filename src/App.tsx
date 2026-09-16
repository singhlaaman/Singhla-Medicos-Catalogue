import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Info, ShieldCheck, AlertCircle, X, Loader2 } from 'lucide-react';
import { Medicine, Category, FAQItem, Testimonial } from './types';
import {
  INITIAL_CATEGORIES,
  INITIAL_MEDICINES,
  INITIAL_FAQS,
  INITIAL_TESTIMONIALS,
  DEFAULT_SETTINGS
} from './data';
import { 
  seedDatabaseIfEmpty, 
  getSomeMedicines, 
  getMedicines, 
  getCategories, 
  getFAQs, 
  getTestimonials 
} from './db';

// Component Imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import MedicineList from './components/MedicineList';
import MedicineDetail from './components/MedicineDetail';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import SaltsIndex from './components/SaltsIndex';
import SaltDetail from './components/SaltDetail';
import { ALL_SALTS, getSaltBySlug } from './data/saltsData';
import {
  updatePageSEO,
  getMedicineCanonicalUrl,
  getSaltCanonicalUrl,
  getSaltsIndexCanonicalUrl,
  getHomeCanonicalUrl
} from './utils/seo';

export default function App() {
  // --- Firestore Database Synchronization & Initialization ---
  const [medicines, setMedicines] = useState<Medicine[]>(INITIAL_MEDICINES);
  const [categories, setCategories] = useState<Category[]>(() => {
    const filteredCats = INITIAL_CATEGORIES.filter(cat => 
      cat.name !== 'Fertility Medicines' && 
      cat.name !== 'Ophthalmology' && 
      cat.name !== 'Psychiatry'
    );
    return [...filteredCats].sort((a, b) => {
      const aOrder = a.order !== undefined ? a.order : 9999;
      const bOrder = b.order !== undefined ? b.order : 9999;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.name.localeCompare(b.name);
    });
  });
  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [isLoadingDb, setIsLoadingDb] = useState(false); // Instant load!
  const [isLoadingAllMeds, setIsLoadingAllMeds] = useState(false);
  
  // Active route state: 'home' | 'admin' | 'medicine' | 'salts' | 'salt'
  const [currentRoute, setCurrentRoute] = useState<'home' | 'admin' | 'medicine' | 'salts' | 'salt'>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Active view state
  const [activeMedicineSlug, setActiveMedicineSlug] = useState<string | null>(null);
  const [activeSaltSlug, setActiveSaltSlug] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('Cancer Medicines');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isSyncingMeds, setIsSyncingMeds] = useState(true);

  // Bootstrap Database (Background sync)
  useEffect(() => {
    async function loadDatabase() {
      setIsSyncingMeds(true);
      try {
        // Ensure database has seed data in the background
        await seedDatabaseIfEmpty(
          INITIAL_MEDICINES,
          INITIAL_CATEGORIES,
          INITIAL_FAQS,
          INITIAL_TESTIMONIALS
        );
        
        // Fetch all medicines (approx. 1000 items) and other collections in the background
        const [dbMeds, dbCats, dbFaqs, dbTests] = await Promise.all([
          getMedicines(),
          getCategories(),
          getFAQs(),
          getTestimonials()
        ]);
        
        // Filter out undesired categories if any
        const filteredCats = dbCats.filter(cat => 
          cat.name !== 'Fertility Medicines' && 
          cat.name !== 'Ophthalmology' && 
          cat.name !== 'Psychiatry'
        );

        // Sort by custom order, fallback to alphabetical
        const sortedCats = [...filteredCats].sort((a, b) => {
          const aOrder = a.order !== undefined ? a.order : 9999;
          const bOrder = b.order !== undefined ? b.order : 9999;
          if (aOrder !== bOrder) return aOrder - bOrder;
          return a.name.localeCompare(b.name);
        });

        // Merge fetched medicines with initial ones to ensure they are available
        // Avoid duplicate IDs
        const combinedMedsMap = new Map<string, Medicine>();
        INITIAL_MEDICINES.forEach(m => combinedMedsMap.set(m.id, m));
        dbMeds.forEach(m => combinedMedsMap.set(m.id, m));

        setMedicines(Array.from(combinedMedsMap.values()));
        if (sortedCats.length > 0) setCategories(sortedCats);
        if (dbFaqs.length > 0) setFaqs(dbFaqs);
        if (dbTests.length > 0) setTestimonials(dbTests);
      } catch (err) {
        console.error('Failed to load database in background from Firestore:', err);
      } finally {
        setIsSyncingMeds(false);
      }
    }

    loadDatabase();

    // Admin login session
    const adminSession = localStorage.getItem('singhla_admin_logged');
    if (adminSession === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Trigger full load of all medicines when admin views the panel
  useEffect(() => {
    if (currentRoute === 'admin' || isAdminLoggedIn) {
      async function loadAllMedicinesForAdmin() {
        setIsLoadingAllMeds(true);
        try {
          const allMeds = await getMedicines();
          if (allMeds.length > 0) {
            setMedicines(allMeds);
          }
        } catch (err) {
          console.error('Failed to load all medicines for Admin:', err);
        } finally {
          setIsLoadingAllMeds(false);
        }
      }
      loadAllMedicinesForAdmin();
    }
  }, [currentRoute, isAdminLoggedIn]);

  // --- Database Update Triggers ---
  const handleUpdateMedicines = (newList: Medicine[]) => {
    setMedicines(newList);
  };

  const handleUpdateCategories = (newList: Category[]) => {
    const sortedCats = [...newList].sort((a, b) => {
      const aOrder = a.order !== undefined ? a.order : 9999;
      const bOrder = b.order !== undefined ? b.order : 9999;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.name.localeCompare(b.name);
    });
    setCategories(sortedCats);
  };

  const handleUpdateFAQs = (newList: FAQItem[]) => {
    setFaqs(newList);
  };

  const handleUpdateTestimonials = (newList: Testimonial[]) => {
    setTestimonials(newList);
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('singhla_admin_logged', 'true');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.setItem('singhla_admin_logged', 'false');
  };

  // --- URL Path & Hash-Based Routing ---
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path === '/admin' || hash === '#/admin') {
        setCurrentRoute('admin');
        setActiveMedicineSlug(null);
        setActiveSaltSlug(null);
      } else if (hash === '#/salts' || path === '/salts') {
        setCurrentRoute('salts');
        setActiveMedicineSlug(null);
        setActiveSaltSlug(null);
      } else if (hash.startsWith('#/salt/')) {
        const slug = hash.replace('#/salt/', '');
        setActiveSaltSlug(slug);
        setActiveMedicineSlug(null);
        setCurrentRoute('salt');
      } else if (path.startsWith('/salt/')) {
        const slug = path.replace('/salt/', '');
        setActiveSaltSlug(slug);
        setActiveMedicineSlug(null);
        setCurrentRoute('salt');
      } else if (hash.startsWith('#/medicine/')) {
        const slug = hash.replace('#/medicine/', '');
        setActiveMedicineSlug(slug);
        setActiveSaltSlug(null);
        setCurrentRoute('medicine');
      } else if (path.startsWith('/medicine/')) {
        const slug = path.replace('/medicine/', '');
        setActiveMedicineSlug(slug);
        setActiveSaltSlug(null);
        setCurrentRoute('medicine');
      } else {
        setCurrentRoute('home');
        setActiveMedicineSlug(null);
        setActiveSaltSlug(null);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    // Run initially
    handleUrlChange();

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateToMedicine = (slug: string) => {
    window.location.hash = `#/medicine/${slug}`;
    if (window.location.pathname === '/admin' || window.location.pathname.startsWith('/salt')) {
      window.history.pushState(null, '', '/');
    }
  };

  const navigateToSalts = () => {
    window.location.hash = '#/salts';
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
  };

  const navigateToSalt = (slug: string) => {
    window.location.hash = `#/salt/${slug}`;
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
  };

  const navigateToHome = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
    window.location.hash = '#';
    setCurrentRoute('home');
    setActiveMedicineSlug(null);
    setActiveSaltSlug(null);
  };

  const activeMedicine = medicines.find(m => m.slug === activeMedicineSlug);
  const activeSalt = activeSaltSlug ? getSaltBySlug(activeSaltSlug) : null;

  // --- Dynamic Canonical Link & SEO Meta Tag Synchronization ---
  useEffect(() => {
    if (currentRoute === 'medicine' && activeMedicineSlug) {
      const med = activeMedicine || medicines.find(m => m.slug === activeMedicineSlug);
      const canonicalUrl = getMedicineCanonicalUrl(activeMedicineSlug);
      const name = med ? med.name : activeMedicineSlug.replace(/-/g, ' ');
      const title = med
        ? `${med.name} (${med.brandName || med.genericName || ''}) | Singhla Medicos`
        : `${name} | Singhla Medicos`;
      const description = med
        ? `${med.name} (${med.strength || ''} ${med.dosageForm || ''}) - Authentic speciality medicine by ${med.manufacturer || 'licensed manufacturers'}, available with cold-chain storage and delivery from Singhla Medicos, Delhi.`
        : `Authentic speciality medicine details and enquiries at Singhla Medicos, Delhi.`;

      updatePageSEO({
        title,
        description,
        canonicalUrl,
        ogType: 'product',
        ogImage: med?.images?.[0] || 'https://singhlamedicos.co.in/logo.png',
        jsonLd: med ? {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": med.name,
          "description": med.description || description,
          "brand": {
            "@type": "Brand",
            "name": med.manufacturer || med.brandName || "Singhla Medicos"
          },
          "url": canonicalUrl,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": med.discountPrice || med.mrp ? (med.discountPrice || med.mrp).toString() : "0.00",
            "availability": med.availability === 'Out of Stock' ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
            "seller": {
              "@type": "Pharmacy",
              "name": "Singhla Medicos",
              "url": "https://singhlamedicos.co.in/"
            }
          }
        } : null
      });
    } else if (currentRoute === 'salt' && activeSaltSlug) {
      const salt = activeSalt || getSaltBySlug(activeSaltSlug);
      const canonicalUrl = getSaltCanonicalUrl(activeSaltSlug);
      const title = salt
        ? `${salt.name} - Chemical Composition & Brands | Singhla Medicos`
        : `Active Drug Salt Monograph | Singhla Medicos`;
      const description = salt
        ? `Comprehensive pharmacological monograph for active drug salt ${salt.name}. Clinical indications, mechanism of action, available brands and cold-chain guidelines at Singhla Medicos.`
        : `Pharmacological profile and available pharmaceutical brands at Singhla Medicos.`;

      updatePageSEO({
        title,
        description,
        canonicalUrl,
        ogType: 'article'
      });
    } else if (currentRoute === 'salts') {
      updatePageSEO({
        title: 'Active Drug Salts & Chemical Compositions Library | Singhla Medicos',
        description: 'Directory of oncology and super-speciality active pharmaceutical ingredients, drug salts, and monographs with mechanism of action and available brands.',
        canonicalUrl: getSaltsIndexCanonicalUrl(),
        ogType: 'website'
      });
    } else if (currentRoute === 'admin') {
      updatePageSEO({
        title: 'Admin Panel | Singhla Medicos',
        canonicalUrl: `${getHomeCanonicalUrl()}#/admin`,
        noIndex: true
      });
    } else {
      updatePageSEO({
        title: 'Singhla Medicos | Super Speciality & Cancer Medicine Pharmacy',
        description: 'Super Speciality & Cancer Medicine Pharmacy website catalog with quick search, category browsing, and WhatsApp/Call enquiries.',
        canonicalUrl: getHomeCanonicalUrl(),
        ogType: 'website'
      });
    }
  }, [currentRoute, activeMedicineSlug, activeSaltSlug, activeMedicine, activeSalt, medicines]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    if (currentRoute !== 'home') {
      navigateToHome();
    }
    // Automatically scroll to catalog listing
    setTimeout(() => {
      const catalogEl = document.getElementById('medicine-catalog-section');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    if (currentRoute !== 'home' || activeMedicineSlug !== null || activeSaltSlug !== null) {
      navigateToHome();
    }
    // Automatically scroll to catalog listing
    setTimeout(() => {
      const catalogEl = document.getElementById('medicine-catalog-section');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  // Prefilled WhatsApp text generator based on points 9 and 17
  const getWhatsAppMessageUrl = () => {
    if (currentRoute === 'salt' && activeSalt) {
      const text = `Hello Singhla Medicos,\nI would like to enquire about availability, pricing, and brands for the active salt: *${activeSalt.name}* (Ref #${activeSalt.sNo}).`;
      return `https://wa.me/${DEFAULT_SETTINGS.contactWhatsApp}?text=${encodeURIComponent(text)}`;
    }
    const text = activeMedicine
      ? `Hello,\nI would like to enquire about ${activeMedicine.name} (${activeMedicine.brandName} - ${activeMedicine.strength} ${activeMedicine.dosageForm}s) from Singhla Medicos.`
      : "Hello,\nI would like to enquire about a speciality medicine from Singhla Medicos.";
    return `https://wa.me/${DEFAULT_SETTINGS.contactWhatsApp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Navbar Header */}
      <Navbar
        settings={DEFAULT_SETTINGS}
        onGoHome={navigateToHome}
        medicines={medicines}
        onSelectMedicine={navigateToMedicine}
        onSearchSubmit={handleSearchSubmit}
        onGoToSalts={navigateToSalts}
        onSelectSalt={navigateToSalt}
      />

      {/* Main View Router */}
      {isLoadingDb ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-dark-grey bg-white/50">
          <Loader2 className="w-10 h-10 animate-spin text-dark-grey mb-4" />
          <p className="font-display font-black uppercase text-xs tracking-widest text-gray-500">Connecting to secure Firestore...</p>
        </div>
      ) : currentRoute === 'admin' ? (
        /* Full-Screen Secure Admin Panel Page */
        <AdminPanel
          isOpen={true}
          onClose={navigateToHome}
          medicines={medicines}
          onUpdateMedicines={handleUpdateMedicines}
          categories={categories}
          onUpdateCategories={handleUpdateCategories}
          faqs={faqs}
          onUpdateFAQs={handleUpdateFAQs}
          testimonials={testimonials}
          onUpdateTestimonials={handleUpdateTestimonials}
          onLoginSuccess={handleAdminLogin}
          isLoggedIn={isAdminLoggedIn}
          isLoadingAllMeds={isLoadingAllMeds}
        />
      ) : currentRoute === 'salts' ? (
        /* Active Salts Monograph Directory Page */
        <div className="flex-1">
          <SaltsIndex
            medicines={medicines}
            onSelectSalt={navigateToSalt}
            onSelectMedicine={navigateToMedicine}
            onGoHome={navigateToHome}
            settings={DEFAULT_SETTINGS}
          />
        </div>
      ) : currentRoute === 'salt' && activeSalt ? (
        /* Dedicated Salt Monograph Page */
        <div className="flex-1">
          <SaltDetail
            salt={activeSalt}
            allMedicines={medicines}
            onBack={navigateToHome}
            onGoToSaltLibrary={navigateToSalts}
            onSelectSalt={navigateToSalt}
            onSelectMedicine={navigateToMedicine}
            settings={DEFAULT_SETTINGS}
          />
        </div>
      ) : activeMedicine ? (
        /* Medicine Product Specification Page */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
          <MedicineDetail
            medicine={activeMedicine}
            allMedicines={medicines}
            onBack={navigateToHome}
            onSelectMedicine={navigateToMedicine}
            onSelectSalt={navigateToSalt}
            settings={DEFAULT_SETTINGS}
          />
        </div>
      ) : (
        /* Homepage View */
        <div className="flex-1 space-y-12 pb-24 md:pb-0">
          {/* Hero Search Section */}
          <Hero
            medicines={medicines}
            onSelectMedicine={navigateToMedicine}
            onSearchSubmit={handleSearchSubmit}
          />

          {/* Grid Categories */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Categories
              categories={categories}
              medicines={medicines}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
          </div>

          {/* Interactive Medicine Catalogue Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <MedicineList
              medicines={medicines}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              onClearFilters={handleClearFilters}
              onSelectMedicine={navigateToMedicine}
              settings={DEFAULT_SETTINGS}
              isSyncingMeds={isSyncingMeds}
            />
          </div>

          {/* Why Choose Us */}
          <WhyChooseUs />

          {/* Google Reviews */}
          <Testimonials testimonials={testimonials} />

          {/* General Accordion FAQs */}
          <FAQ faqs={faqs} />
        </div>
      )}

      {/* Footer physical location block & Modals */}
      <Footer
        settings={DEFAULT_SETTINGS}
        onGoHome={navigateToHome}
        onSelectCategory={handleCategorySelect}
        onGoToSalts={navigateToSalts}
      />

      {/* MOBILE BOTTOM STICKY CONTACT BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-dark-grey p-3 flex gap-3 z-50 shadow-none">
        {/* Call Enquiry */}
        <a
          id="mobile-sticky-call-btn"
          href={`tel:${DEFAULT_SETTINGS.contactPhone}`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 bg-call-blue hover:bg-blue-700 active:bg-blue-800 text-white font-black uppercase text-xs tracking-wider border-2 border-dark-grey rounded-[4px] shadow-none cursor-pointer select-none"
        >
          <Phone className="w-4 h-4 text-white" />
          <span>Call Enquiry</span>
        </a>

        {/* WhatsApp Enquiry with dynamic product prefill content */}
        <a
          id="mobile-sticky-whatsapp-btn"
          href={getWhatsAppMessageUrl()}
          target="_blank"
          referrerPolicy="no-referrer"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 bg-whatsapp-green hover:bg-emerald-600 active:bg-emerald-700 text-white font-black uppercase text-xs tracking-wider border-2 border-dark-grey rounded-[4px] shadow-none cursor-pointer select-none"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span>WhatsApp Enquiry</span>
        </a>
      </div>
    </div>
  );
}
