import React, { useState, useEffect } from 'react';
import { Medicine, Category } from '../types';
import { Sparkles, Eye, X, CheckSquare, Square, Search, RefreshCw, Loader2, Info, Check } from 'lucide-react';
import AdminRichTextEditor from './AdminRichTextEditor';
import { getDirectImageUrl } from './MedicineImage';
import { estimateMedicineCategory } from '../utils/categoryEstimator';

interface AdminMedicineFormProps {
  editingMedicine: Medicine | null;
  medicines: Medicine[];
  categories: Category[];
  onSave: (med: Medicine) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

const DEFAULT_MANUFACTURERS = [
  'Roche',
  "Dr. Reddy's",
  'Cipla',
  'Natco',
  'Zydus',
  'Sun Pharma',
  'Mylan',
  'Intas',
  'Novartis',
  'Pfizer',
  'AstraZeneca',
  'GSK',
  'Abbott'
];

export default function AdminMedicineForm({
  editingMedicine,
  medicines,
  categories,
  onSave,
  onCancel,
  isSaving = false
}: AdminMedicineFormProps) {
  const [form, setForm] = useState<Partial<Medicine>>({});
  const [slugWarning, setSlugWarning] = useState('');
  const [searchAlternate, setSearchAlternate] = useState('');
  const [showAlternateDropdown, setShowAlternateDropdown] = useState(false);
  const [newUse, setNewUse] = useState('');
  const [newSideEffect, setNewSideEffect] = useState('');
  const [autoDetectFeedback, setAutoDetectFeedback] = useState<{ category: string; reason: string; confidence: string } | null>(null);

  const handleAutoDetectCategory = () => {
    const result = estimateMedicineCategory(form, categories);
    setForm(prev => ({ ...prev, category: result.categoryName }));
    setAutoDetectFeedback({
      category: result.categoryName,
      reason: result.matchReason,
      confidence: result.confidence
    });
    setTimeout(() => {
      setAutoDetectFeedback(null);
    }, 6000);
  };

  // Extract all existing unique manufacturers from DB to merge with default list
  const allManufacturers = Array.from(new Set([
    ...DEFAULT_MANUFACTURERS,
    ...medicines.map(m => m.manufacturer).filter(Boolean)
  ])).sort();

  // Initialize form
  useEffect(() => {
    if (editingMedicine) {
      setForm({ ...editingMedicine });
    } else {
      setForm({
        id: 'med-' + Date.now(),
        name: '',
        brandName: '',
        genericName: '',
        saltName: '',
        strength: '',
        category: categories[0]?.name || 'Oncology',
        manufacturer: '',
        descriptionShort: '',
        descriptionLong: '',
        uses: [],
        sideEffects: [],
        dosage: '',
        storageInstructions: 'Keep in a cool dry place, protect from direct light.',
        coldStorage: 'No',
        storageTemperature: '15°C–30°C',
        prescriptionRequired: 'Yes',
        packaging: 'Strip of 10 Tablets',
        images: [''],
        faqs: [],
        relatedMedicines: [],
        seoTitle: '',
        seoDescription: '',
        slug: '',
        mrp: 0,
        discountPercentage: 0,
        discountPrice: 0,
        availability: 'In Stock',
        countryOfOrigin: 'India',
        dosageForm: 'Tablet',
        status: 'Published'
      });
    }
  }, [editingMedicine, categories]);

  // Handle URL slug generation and uniqueness validation
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameVal = e.target.value;
    const isAdding = !editingMedicine;
    
    const updated: Partial<Medicine> = { ...form, name: nameVal };

    // Auto-generate slug and SEO tags on product addition
    if (isAdding) {
      const slugVal = generateSlug(nameVal);
      updated.slug = slugVal;
      updated.seoTitle = `${nameVal} - Specialty Medicine | Singhla Medicos`;
      updated.seoDescription = `Get authentic ${nameVal} at Singhla Medicos. Pan-India reliable pharmaceutical delivery. Enquire now.`;
    }

    setForm(updated);
    if (updated.slug) validateSlug(updated.slug);
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slugVal = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
    setForm(prev => ({ ...prev, slug: slugVal }));
    validateSlug(slugVal);
  };

  const validateSlug = (slugVal: string) => {
    if (!slugVal) {
      setSlugWarning('');
      return;
    }
    const duplicate = medicines.find(
      m => m.slug === slugVal && m.id !== (editingMedicine?.id || '')
    );
    if (duplicate) {
      setSlugWarning(`⚠️ Already in use by: "${duplicate.name}" (Duplicate slugs break routing)`);
    } else {
      setSlugWarning('');
    }
  };

  // Live SEO Generator
  const regenerateSEO = () => {
    const name = form.name || 'Medicine Product';
    const usesList = (form.uses || []).join(', ');
    const fallbackDesc = usesList ? `Indicated for: ${usesList}.` : 'Get genuine high-quality medicine from Singhla Medicos.';
    setForm(prev => ({
      ...prev,
      seoTitle: `${name} - Speciality Pharmacy | Singhla Medicos`,
      seoDescription: `${fallbackDesc.substring(0, 150)}... Buy authentic at Singhla Medicos. Enquire today.`
    }));
  };

  // Bidirectional Price Linking Handlers
  const currentMrp = Number(form.mrp) || 0;
  const currentDiscountPercent = Number(form.discountPercentage) || 0;
  const currentFinalPrice = form.discountPrice !== undefined ? Number(form.discountPrice) : Math.max(0, Math.round(currentMrp * (1 - currentDiscountPercent / 100)));

  const handleMrpChange = (val: number) => {
    const newMrp = Math.max(0, val);
    setForm(prev => {
      const disc = Number(prev.discountPercentage) || 0;
      const newFinal = Math.max(0, Math.round(newMrp * (1 - disc / 100)));
      return {
        ...prev,
        mrp: newMrp,
        discountPrice: newFinal
      };
    });
  };

  const handleDiscountChange = (val: number) => {
    const newDisc = Math.max(0, Math.min(100, Math.round((val + Number.EPSILON) * 100) / 100));
    setForm(prev => {
      const mrpVal = Number(prev.mrp) || 0;
      const newFinal = Math.max(0, Math.round(mrpVal * (1 - newDisc / 100)));
      return {
        ...prev,
        discountPercentage: newDisc,
        discountPrice: newFinal
      };
    });
  };

  const handleFinalPriceChange = (val: number) => {
    setForm(prev => {
      const mrpVal = Number(prev.mrp) || 0;
      const newFinal = Math.max(0, val);
      const newDisc = mrpVal > 0
        ? Math.max(0, Math.min(100, Math.round((1 - newFinal / mrpVal) * 100 * 100) / 100))
        : 0;
      return {
        ...prev,
        discountPrice: newFinal,
        discountPercentage: newDisc
      };
    });
  };

  // Handle Multi-select search for alternate medicines
  const filteredAlternates = medicines.filter(m => {
    if (m.id === form.id) return false;
    const isAlreadySelected = form.relatedMedicines?.includes(m.slug);
    if (isAlreadySelected) return false;

    const query = searchAlternate.toLowerCase();
    return (
      m.name.toLowerCase().includes(query) ||
      m.saltName.toLowerCase().includes(query) ||
      m.brandName.toLowerCase().includes(query)
    );
  });

  const handleAddAlternate = (medSlug: string) => {
    const current = form.relatedMedicines || [];
    if (!current.includes(medSlug)) {
      setForm(prev => ({ ...prev, relatedMedicines: [...current, medSlug] }));
    }
    setSearchAlternate('');
    setShowAlternateDropdown(false);
  };

  const handleRemoveAlternate = (medSlug: string) => {
    const current = form.relatedMedicines || [];
    setForm(prev => ({ ...prev, relatedMedicines: current.filter(s => s !== medSlug) }));
  };

  const handleAddUse = () => {
    if (newUse.trim()) {
      setForm(prev => ({ ...prev, uses: [...(prev.uses || []), newUse.trim()] }));
      setNewUse('');
    }
  };

  const handleRemoveUse = (index: number) => {
    setForm(prev => ({ ...prev, uses: (prev.uses || []).filter((_, i) => i !== index) }));
  };

  const handleAddSideEffect = () => {
    if (newSideEffect.trim()) {
      setForm(prev => ({ ...prev, sideEffects: [...(prev.sideEffects || []), newSideEffect.trim()] }));
      setNewSideEffect('');
    }
  };

  const handleRemoveSideEffect = (index: number) => {
    setForm(prev => ({ ...prev, sideEffects: (prev.sideEffects || []).filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (slugWarning) {
      alert('Please resolve duplicate URL Slug warning before saving.');
      return;
    }
    if (!form.name || !form.slug || !form.saltName) {
      alert('Product Name, URL Slug, and Composition/Salt Name are required.');
      return;
    }

    onSave({
      ...form,
      mrp: currentMrp,
      discountPercentage: Math.round(currentDiscountPercent * 100) / 100,
      discountPrice: currentFinalPrice
    } as Medicine);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs" id="medicine-form">
      {/* Form Header */}
      <div className="bg-gray-50 border-b border-gray-100 p-5 flex items-center justify-between">
        <div>
          <h4 className="font-display font-black text-sm uppercase text-gray-900 tracking-wide">
            {editingMedicine ? 'Edit Product Card' : 'Create New Specialty Product'}
          </h4>
          <p className="text-[10px] text-gray-400 mt-0.5">Fill out product details below. All info stores live to Firestore.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!!slugWarning || isSaving}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-black bg-primary-yellow hover:bg-amber-400 rounded-lg border-2 border-black transition-all cursor-pointer ${!!slugWarning || isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : editingMedicine ? (
              'Save Changes'
            ) : (
              'Publish Product'
            )}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8 divide-y divide-gray-100 max-h-[75vh] overflow-y-auto">
        {/* SECTION 1: IDENTITY */}
        <div className="space-y-4">
          <h5 className="font-display font-bold text-xs uppercase tracking-wide text-gray-900 flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-blue-500 rounded-sm"></span>
            1. Product Identification
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Product Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.name || ''}
                onChange={handleNameChange}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-yellow-400 focus:outline-none font-semibold text-gray-900"
                placeholder="e.g. Erlonat 150mg"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">URL Slug <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.slug || ''}
                onChange={handleSlugChange}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-yellow-400 focus:outline-none font-mono text-gray-950"
                placeholder="e.g. erlonat-150-mg-tablet"
                required
              />
              {slugWarning ? (
                <div className="text-[10px] text-red-600 font-bold mt-1 bg-red-50 px-2.5 py-1 rounded-md border border-red-100">{slugWarning}</div>
              ) : (
                <div className="text-[9px] text-gray-400">Autogenerated but editable. Must be unique.</div>
              )}
            </div>
          </div>



          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase">Composition / Active Salt Name <span className="text-red-500">*</span></label>
            <textarea
              value={form.saltName || ''}
              onChange={(e) => setForm({ ...form, saltName: e.target.value })}
              rows={2}
              className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none text-gray-900 font-medium"
              placeholder="e.g. Erlotinib Hydrochloride (150mg)"
              required
            />
          </div>
        </div>

        {/* SECTION 2: ATTRIBUTES */}
        <div className="space-y-4 pt-6">
          <h5 className="font-display font-bold text-xs uppercase tracking-wide text-gray-900 flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-purple-500 rounded-sm"></span>
            2. Classification & Attributes
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Category Group</label>
                <button
                  type="button"
                  onClick={handleAutoDetectCategory}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200 transition-colors"
                  title="Auto-detect category from salt composition and therapeutic uses"
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Auto-Detect</span>
                </button>
              </div>
              <select
                value={form.category || ''}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none text-gray-900 font-semibold"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>

              {autoDetectFeedback && (
                <div className="text-[10px] text-emerald-800 bg-emerald-50/90 border border-emerald-200 p-2 rounded-lg flex items-start gap-1.5 animate-in fade-in">
                  <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Detected: {autoDetectFeedback.category}</span>
                    <span className="text-emerald-700 block text-[9px]">Matched: {autoDetectFeedback.reason} ({autoDetectFeedback.confidence} Confidence)</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Packaging Unit</label>
              <input
                type="text"
                value={form.packaging || ''}
                onChange={(e) => setForm({ ...form, packaging: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none text-gray-900"
                placeholder="e.g. Strip of 30 Tablets"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Manufacturer Company <span className="text-red-500">*</span></label>
              <input
                type="text"
                list="manufacturers-list"
                value={form.manufacturer || ''}
                onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none text-gray-900 font-medium"
                placeholder="Type manufacturer company name manually (e.g. Cipla, Roche...)"
                required
              />
              <datalist id="manufacturers-list">
                {allManufacturers.map((m, idx) => (
                  <option key={idx} value={m} />
                ))}
              </datalist>
              <p className="text-[9px] text-gray-400">Type any company name manually. Suggestions will filter dynamically as you type.</p>
            </div>
          </div>
        </div>

        {/* SECTION 3: STORAGE & CONTROLS */}
        <div className="space-y-4 pt-6">
          <h5 className="font-display font-bold text-xs uppercase tracking-wide text-gray-900 flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-amber-500 rounded-sm"></span>
            3. Regulatory & Storage Conditions
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Prescription Req.</label>
              <select
                value={form.prescriptionRequired || 'Yes'}
                onChange={(e) => setForm({ ...form, prescriptionRequired: e.target.value as any })}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none font-semibold"
              >
                <option value="Yes">Yes (Rx Required)</option>
                <option value="No">No (Over The Counter)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Cold Chain Storage</label>
              <select
                value={form.coldStorage || 'No'}
                onChange={(e) => {
                  const val = e.target.value as 'Yes' | 'No';
                  setForm({
                    ...form,
                    coldStorage: val,
                    storageTemperature: val === 'Yes' ? '2°C–8°C' : '15°C–30°C'
                  });
                }}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none font-semibold"
              >
                <option value="Yes">Yes (Keep Cold)</option>
                <option value="No">No (Room Temp)</option>
              </select>
            </div>
          </div>


        </div>

        {/* SECTION 4: PRICING & DISCOUNTS */}
        <div className="space-y-4 pt-6 bg-yellow-50/20 p-4 rounded-xl border border-yellow-100/50">
          <h5 className="font-display font-bold text-xs uppercase tracking-wide text-gray-900 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-emerald-500 rounded-sm"></span>
              4. Real-time Pricing Matrix (Bidirectionally Linked)
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Editing Discount or Final Price auto-updates the other
            </span>
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Maximum Retail Price (MRP ₹) <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={form.mrp !== undefined ? form.mrp : ''}
                onChange={(e) => handleMrpChange(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-400 text-gray-950 font-bold"
                placeholder="₹"
                min="0"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Discount Percentage (%)</label>
              <input
                type="number"
                step="0.01"
                value={form.discountPercentage !== undefined ? form.discountPercentage : ''}
                onChange={(e) => handleDiscountChange(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-400 text-gray-950 font-bold"
                placeholder="%"
                min="0"
                max="100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-emerald-800 uppercase flex justify-between items-center">
                <span>Final Price (Selling Price ₹)</span>
                <span className="text-[9px] text-emerald-600 font-normal">Editable</span>
              </label>
              <input
                type="number"
                value={currentFinalPrice}
                onChange={(e) => handleFinalPriceChange(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs bg-emerald-50/60 border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-950 font-black text-sm"
                placeholder="₹"
                min="0"
                max={currentMrp > 0 ? currentMrp : undefined}
              />
            </div>
          </div>

          {/* Savings Badge */}
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-900">
              Customer Savings: ₹{Math.max(0, currentMrp - currentFinalPrice).toLocaleString('en-IN')}
            </span>
            <span className="bg-emerald-200/80 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
              {currentDiscountPercent.toFixed(1)}% OFF
            </span>
          </div>
        </div>

        {/* SECTION 5: MEDIA & MEDICAL GUIDELINES */}
        <div className="space-y-6 pt-6">
          <h5 className="font-display font-bold text-xs uppercase tracking-wide text-gray-900 flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-indigo-500 rounded-sm"></span>
            5. Media & Medical Guidelines
          </h5>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Product Image (Google Drive/Public Link)</label>
                <input
                  type="text"
                  value={form.images?.[0] || ''}
                  onChange={(e) => setForm({ ...form, images: [e.target.value] })}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none text-gray-900"
                  placeholder="Paste direct URL path here..."
                />
              </div>
            </div>

            {/* Live Image Preview panel */}
            <div className="border border-gray-200 rounded-2xl bg-gray-50/50 p-4 flex flex-col items-center justify-center min-h-[120px] text-center">
              {form.images?.[0] ? (
                <div className="relative group max-h-[140px] overflow-hidden rounded-lg">
                  <img
                    src={getDirectImageUrl(form.images[0])}
                    alt="Preview"
                    referrerPolicy="no-referrer"
                    className="object-contain max-h-[130px] rounded"
                    onError={(e) => {
                      (e.target as any).src = 'https://placehold.co/180x180/F3F4F6/9CA3AF?text=Invalid+Image';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, images: [''] })}
                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:scale-105"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="text-gray-400 text-xs">
                  <div className="text-lg mb-1">🖼️</div>
                  <span>No live image link configured.</span>
                </div>
              )}
            </div>
          </div>

          {/* Primary Uses & Benefits and Side Effects List Editors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            {/* Uses / Benefits editor */}
            <div className="space-y-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-200/60">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase text-gray-700 tracking-wider">Primary Uses & Benefits</label>
                <span className="text-[9px] font-bold text-gray-400 font-mono">{(form.uses || []).length} items</span>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newUse}
                  onChange={(e) => setNewUse(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddUse();
                    }
                  }}
                  className="flex-1 px-3.5 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none text-gray-900"
                  placeholder="e.g. Treatment of metastatic lung cancer..."
                />
                <button
                  type="button"
                  onClick={handleAddUse}
                  className="px-3 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Add
                </button>
              </div>

              {/* Added Uses list */}
              <div className="space-y-1.5 max-h-[180px] overflow-y-auto pt-2">
                {(form.uses || []).length > 0 ? (
                  (form.uses || []).map((useItem, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-lg text-xs text-gray-800">
                      <span className="font-semibold break-all text-[11px] leading-tight">• {useItem}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveUse(idx)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded-lg shrink-0"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-[10px] italic py-1">No uses or benefits specified. Add at least one.</p>
                )}
              </div>
            </div>

            {/* Side Effects editor */}
            <div className="space-y-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-200/60">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase text-gray-700 tracking-wider">Possible Side Effects</label>
                <span className="text-[9px] font-bold text-gray-400 font-mono">{(form.sideEffects || []).length} items</span>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSideEffect}
                  onChange={(e) => setNewSideEffect(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSideEffect();
                    }
                  }}
                  className="flex-1 px-3.5 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none text-gray-900"
                  placeholder="e.g. Nausea or vomiting..."
                />
                <button
                  type="button"
                  onClick={handleAddSideEffect}
                  className="px-3 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Add
                </button>
              </div>

              {/* Added Side Effects list */}
              <div className="space-y-1.5 max-h-[180px] overflow-y-auto pt-2">
                {(form.sideEffects || []).length > 0 ? (
                  (form.sideEffects || []).map((seItem, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-lg text-xs text-gray-800">
                      <span className="font-semibold break-all text-[11px] leading-tight">• {seItem}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSideEffect(idx)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded-lg shrink-0"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-[10px] italic py-1">No side effects specified. Add if any.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6: ALTERNATES AUTOCATEGORIZATION */}
        <div className="space-y-4 pt-6">
          <h5 className="font-display font-bold text-xs uppercase tracking-wide text-gray-900 flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-sky-500 rounded-sm"></span>
            6. Bi-directional Alternate Medicines
          </h5>

          <div className="relative">
            <label className="text-[10px] font-bold text-gray-500 uppercase">Search for substitute/related medicines</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 mt-1 focus-within:bg-white focus-within:ring-1 focus-within:ring-yellow-400">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchAlternate}
                onChange={(e) => {
                  setSearchAlternate(e.target.value);
                  setShowAlternateDropdown(true);
                }}
                onFocus={() => setShowAlternateDropdown(true)}
                placeholder="Type name or composition to link alternatives..."
                className="w-full text-xs bg-transparent focus:outline-none text-gray-900"
              />
              {searchAlternate && (
                <button type="button" onClick={() => setSearchAlternate('')}>
                  <X className="w-3.5 h-3.5 text-gray-400" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown popup */}
            {showAlternateDropdown && searchAlternate && (
              <div className="absolute z-50 left-0 right-0 bg-white border border-gray-200 rounded-xl mt-1 shadow-lg max-h-[180px] overflow-y-auto divide-y divide-gray-100">
                {filteredAlternates.length > 0 ? (
                  filteredAlternates.map(med => (
                    <button
                      key={med.id}
                      type="button"
                      onClick={() => handleAddAlternate(med.slug)}
                      className="w-full text-left px-4 py-2 hover:bg-yellow-50 text-xs transition-colors flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-gray-900">{med.name}</span>
                        <span className="text-[10px] text-gray-400 ml-1.5 font-mono">({med.brandName} - {med.strength})</span>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Link</span>
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-xs text-gray-400 italic text-center">No other unlinked medicines match search.</div>
                )}
              </div>
            )}
          </div>

          {/* Active linked list */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {(form.relatedMedicines || []).length > 0 ? (
              (form.relatedMedicines || []).map(slug => {
                const medMatch = medicines.find(m => m.slug === slug);
                return (
                  <span key={slug} className="inline-flex items-center gap-1 px-2.5 py-1 bg-sky-50 border border-sky-100 rounded-lg text-[10px] font-bold text-sky-800">
                    <span>{medMatch ? medMatch.name : slug}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAlternate(slug)}
                      className="hover:bg-sky-200 p-0.5 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })
            ) : (
              <p className="text-gray-400 text-[10px] italic">No alternate medicines linked yet. They will display as alternatives on this product page.</p>
            )}
          </div>
        </div>

        {/* SECTION 7: SEO DECK */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h5 className="font-display font-bold text-xs uppercase tracking-wide text-gray-900 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-teal-500 rounded-sm"></span>
              7. Organic SEO Configuration (Search Rankings)
            </h5>
            <button
              type="button"
              onClick={regenerateSEO}
              className="inline-flex items-center gap-1 px-2.5 py-1 border border-gray-200 rounded-lg text-[10px] font-bold bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Regenerate SEO</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Page Meta Title Tag</label>
              <input
                type="text"
                value={form.seoTitle || ''}
                onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none text-gray-900 font-semibold"
                placeholder="Google Search Snippet Header"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Page Meta Description Tag</label>
              <textarea
                value={form.seoDescription || ''}
                onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                rows={2}
                className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none text-gray-900"
                placeholder="Brief summary used by Google index..."
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
