import React, { useState, useEffect, useMemo } from 'react';
import { Medicine, Category, FAQItem, Testimonial } from '../types';
import { 
  getAdminPasswordHash, 
  updateAdminPassword, 
  hashPassword,
  saveMedicine, 
  deleteMedicine, 
  saveCategory, 
  deleteCategory, 
  saveFAQ, 
  deleteFAQ, 
  saveTestimonial, 
  deleteTestimonial,
  forceSyncAllDataToFirestore
} from '../db';
import { 
  X, ShieldCheck, Database, Layers, HelpCircle, Star, LogOut, 
  Search, ArrowUpDown, Trash2, Copy, Edit2, Plus, Download, 
  Upload, FileText, ChevronDown, ChevronUp, CheckSquare, Square, Eye, RefreshCw, Key, Loader2,
  Filter, ChevronLeft, ChevronRight, Clock, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  INITIAL_MEDICINES, 
  INITIAL_CATEGORIES, 
  INITIAL_FAQS, 
  INITIAL_TESTIMONIALS 
} from '../data';

// Modular Sub-Components
import AdminDashboardOverview from './AdminDashboardOverview';
import AdminMedicineForm from './AdminMedicineForm';
import AdminAutoCategorizerModal from './AdminAutoCategorizerModal';

function EditableNumberCell({
  value,
  min = 0,
  max,
  onSave,
  prefix = '',
  suffix = '',
  className = ''
}: {
  value: number;
  min?: number;
  max?: number;
  onSave: (val: number) => Promise<void> | void;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [draft, setDraft] = useState<string>(value.toString());
  const [isSaving, setIsSaving] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setDraft(value.toString());
    }
  }, [value, isFocused]);

  const handleCommit = async () => {
    setIsFocused(false);
    let num = parseFloat(draft);
    if (isNaN(num)) {
      setDraft(value.toString());
      return;
    }
    if (min !== undefined && num < min) num = min;
    if (max !== undefined && num > max) num = max;

    if (num !== value) {
      setIsSaving(true);
      try {
        await onSave(num);
      } catch (err) {
        console.error('Failed to save inline update:', err);
        setDraft(value.toString());
      } finally {
        setIsSaving(false);
      }
    } else {
      setDraft(num.toString());
    }
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      {prefix && (
        <span className="absolute left-2 text-gray-400 select-none text-[11px] font-bold">
          {prefix}
        </span>
      )}
      <input
        type="number"
        value={draft}
        min={min}
        max={max}
        onFocus={() => setIsFocused(true)}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={handleCommit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur();
          }
        }}
        disabled={isSaving}
        className={`w-full py-1.5 text-xs font-semibold rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white hover:bg-gray-50 transition-all ${
          prefix ? 'pl-5' : 'pl-2'
        } ${suffix ? 'pr-6' : 'pr-2'} ${
          isSaving ? 'bg-gray-100 text-gray-400' : 'text-gray-950'
        }`}
      />
      {suffix && (
        <span className="absolute right-2 text-gray-400 select-none text-[11px] font-bold">
          {suffix}
        </span>
      )}
      {isSaving && (
        <span className="absolute right-5 text-[9px] text-blue-500 font-bold animate-pulse">
          ⏳
        </span>
      )}
    </div>
  );
}

const formatLastModifiedTime = (updatedAt?: string, createdAt?: string) => {
  const timestampStr = updatedAt || createdAt;
  if (!timestampStr) return { primary: 'Not modified yet', secondary: '', full: 'Not modified yet' };

  try {
    const date = new Date(timestampStr);
    if (isNaN(date.getTime())) {
      return { primary: timestampStr, secondary: '', full: timestampStr };
    }

    const fullDate = date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) {
      return { primary: fullDate, secondary: '', full: fullDate };
    }

    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    let relative = '';
    if (diffMins < 1) {
      relative = 'Just now';
    } else if (diffMins < 60) {
      relative = `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      relative = `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays === 1) {
      relative = 'Yesterday';
    } else if (diffDays < 7) {
      relative = `${diffDays} days ago`;
    } else {
      relative = date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    const timeOnly = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    return {
      primary: relative,
      secondary: timeOnly,
      full: fullDate
    };
  } catch (e) {
    return { primary: timestampStr, secondary: '', full: timestampStr };
  }
};

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  medicines: Medicine[];
  onUpdateMedicines: (newList: Medicine[]) => void;
  categories: Category[];
  onUpdateCategories: (newList: Category[]) => void;
  faqs: FAQItem[];
  onUpdateFAQs: (newList: FAQItem[]) => void;
  testimonials: Testimonial[];
  onUpdateTestimonials: (newList: Testimonial[]) => void;
  onLoginSuccess: () => void;
  isLoggedIn: boolean;
  isLoadingAllMeds?: boolean;
}

export default function AdminPanel({
  isOpen,
  onClose,
  medicines,
  onUpdateMedicines,
  categories,
  onUpdateCategories,
  faqs,
  onUpdateFAQs,
  testimonials,
  onUpdateTestimonials,
  onLoginSuccess,
  isLoggedIn,
  isLoadingAllMeds = false
}: AdminPanelProps) {
  // Gate authentication states
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Dashboard & tabs
  const [activeTab, setActiveTab] = useState<'dashboard' | 'medicines' | 'categories' | 'faqs' | 'testimonials' | 'bulk' | 'settings'>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Medicines Catalog Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterManufacturer, setFilterManufacturer] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterMrpOver1000, setFilterMrpOver1000] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'mrp' | 'date_added'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Multi-item bulk deletion selection registry
  const [selectedMeds, setSelectedMeds] = useState<string[]>([]);

  // Pagination for Medicines Catalog
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  // Reset page when any filter or sorting option changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterCategory, filterManufacturer, filterStatus, sortBy, sortOrder, filterMrpOver1000]);

  // Add / Edit Forms triggers
  const [isAddingMedicine, setIsAddingMedicine] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [isSavingMedicine, setIsSavingMedicine] = useState(false);
  const [isAutoCategorizerOpen, setIsAutoCategorizerOpen] = useState(false);

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState<Partial<Category>>({ name: '', iconName: 'Layers', icon: 'Layers', count: 0 });
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [isRearrangingCategories, setIsRearrangingCategories] = useState(false);

  const [isAddingFAQ, setIsAddingFAQ] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [faqForm, setFaqForm] = useState<Partial<FAQItem>>({ question: '', answer: '' });

  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [testForm, setTestForm] = useState<Partial<Testimonial>>({ name: '', rating: 5, text: '', date: 'Today', verified: true });

  const [csvFeedback, setCsvFeedback] = useState({ type: '', message: '' });
  const [isImportingCsv, setIsImportingCsv] = useState(false);

  // Settings
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [settingsFeedback, setSettingsFeedback] = useState('');

  // Database Force Sync States
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [syncSuccess, setSyncSuccess] = useState<boolean | null>(null);

  // Extract unique manufacturers dynamically
  const availableManufacturers = Array.from(new Set(medicines.map(m => m.manufacturer).filter(Boolean))).sort();

  if (!isOpen) return null;

  // Hashing security login verify
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput) return;

    setIsLoggingIn(true);
    setLoginError('');
    try {
      const storedHash = await getAdminPasswordHash();
      const enteredHash = await hashPassword(passwordInput);

      if (enteredHash === storedHash) {
        onLoginSuccess();
        setPasswordInput('');
      } else {
        setLoginError('❌ Incorrect Master Password. Access denied.');
      }
    } catch (err) {
      console.error('Password hash verification failed:', err);
      setLoginError('Error authenticating. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('singhla_admin_logged');
    window.location.reload();
  };

  // --- MEDICINES OPERATIONS ---
  const handleSaveMedicine = async (med: Medicine) => {
    setIsSavingMedicine(true);
    try {
      const auditMed = {
        ...med,
        updatedAt: new Date().toISOString(),
        createdAt: med.createdAt || new Date().toISOString(),
        status: med.status || 'Published',
        lastEditedBy: 'Administrator'
      };

      await saveMedicine(auditMed);

      let updatedList: Medicine[];
      if (editingMedicine) {
        updatedList = medicines.map(m => m.id === editingMedicine.id ? auditMed : m);
      } else {
        updatedList = [auditMed, ...medicines];
      }

      onUpdateMedicines(updatedList);
      setIsAddingMedicine(false);
      setEditingMedicine(null);
    } catch (error) {
      console.error('Error saving medicine to Firestore:', error);
      alert('Could not save product to database.');
    } finally {
      setIsSavingMedicine(false);
    }
  };

  const handleInlineUpdateMedicine = async (medId: string, updates: Partial<Medicine>) => {
    const med = medicines.find(m => m.id === medId);
    if (!med) return;

    let newMrp = updates.mrp !== undefined ? updates.mrp : med.mrp;
    let newDiscountPercentage = updates.discountPercentage !== undefined ? updates.discountPercentage : (med.discountPercentage || 0);
    let newDiscountPrice = updates.discountPrice !== undefined ? updates.discountPrice : (med.discountPrice ?? Math.round(newMrp * (1 - newDiscountPercentage / 100)));

    if (updates.discountPrice !== undefined) {
      // User explicitly changed Final Price directly
      newDiscountPrice = Math.max(0, updates.discountPrice);
      if (newMrp > 0) {
        newDiscountPrice = Math.min(newMrp, newDiscountPrice);
        newDiscountPercentage = Math.max(0, Math.min(100, Math.round((1 - newDiscountPrice / newMrp) * 100 * 100) / 100));
      } else {
        newDiscountPercentage = 0;
      }
    } else if (updates.discountPercentage !== undefined) {
      // User changed Discount %
      newDiscountPercentage = Math.max(0, Math.min(100, Math.round(updates.discountPercentage * 100) / 100));
      newDiscountPrice = Math.max(0, Math.round(newMrp * (1 - newDiscountPercentage / 100)));
    } else if (updates.mrp !== undefined) {
      // User changed MRP
      newMrp = Math.max(0, updates.mrp);
      newDiscountPrice = Math.max(0, Math.round(newMrp * (1 - newDiscountPercentage / 100)));
    }

    const updatedMed: Medicine = {
      ...med,
      ...updates,
      mrp: newMrp,
      discountPercentage: newDiscountPercentage,
      discountPrice: newDiscountPrice,
      updatedAt: new Date().toISOString(),
      lastEditedBy: 'Administrator (Inline Edit)'
    };

    try {
      await saveMedicine(updatedMed);
      const updatedList = medicines.map(m => m.id === medId ? updatedMed : m);
      onUpdateMedicines(updatedList);
    } catch (error) {
      console.error('Error saving inline update to Firestore:', error);
      alert('Could not update medicine pricing inside Firestore.');
      throw error;
    }
  };

  const handleDeleteMedicine = async (id: string) => {
    if (!confirm('Are you sure you want to delete this medicine? This is irreversible.')) return;
    try {
      await deleteMedicine(id);
      const updatedList = medicines.filter(m => m.id !== id);
      onUpdateMedicines(updatedList);
      setSelectedMeds(prev => prev.filter(mid => mid !== id));
    } catch (error) {
      console.error('Error deleting from Firestore:', error);
    }
  };

  const handleDuplicateMedicine = (med: Medicine) => {
    const clone: Medicine = {
      ...med,
      id: 'med-' + Date.now(),
      name: `${med.name} (Copy)`,
      slug: `${med.slug}-copy`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'Draft'
    };
    setEditingMedicine(null);
    setFormFromMedicine(clone);
    setIsAddingMedicine(true);
    setActiveTab('medicines');
  };

  const setFormFromMedicine = (med: Medicine) => {
    // Auxiliary helper for duplicate
    setEditingMedicine(cloneToEdit(med));
  };

  const cloneToEdit = (med: Medicine): Medicine => {
    return { ...med };
  };

  // --- CATEGORIES OPERATIONS ---
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name) return;

    setIsSavingCategory(true);
    try {
      const completeCat: Category = {
        id: editingCategory?.id || 'cat-' + Date.now(),
        name: categoryForm.name.trim(),
        iconName: categoryForm.iconName || 'Layers',
        icon: categoryForm.icon || 'Layers',
        count: editingCategory?.count || 0
      };

      // Save category in Firestore
      await saveCategory(completeCat);

      // If renaming an existing category, update all medicines in Firestore referencing the old category name
      let updatedMedicines = [...medicines];
      if (editingCategory && editingCategory.name !== completeCat.name) {
        const medicinesToUpdate = medicines.filter(m => m.category === editingCategory.name);
        if (medicinesToUpdate.length > 0) {
          await Promise.all(
            medicinesToUpdate.map(async (m) => {
              const updatedMed = { ...m, category: completeCat.name };
              await saveMedicine(updatedMed);
            })
          );
          updatedMedicines = medicines.map(m => m.category === editingCategory.name ? { ...m, category: completeCat.name } : m);
          onUpdateMedicines(updatedMedicines);
        }
      }

      let updatedList: Category[];
      if (editingCategory) {
        updatedList = categories.map(c => c.id === editingCategory.id ? completeCat : c);
      } else {
        updatedList = [...categories, completeCat];
      }

      onUpdateCategories(updatedList);
      setIsAddingCategory(false);
      setEditingCategory(null);
      setCategoryForm({ name: '', iconName: 'Layers', icon: 'Layers', count: 0 });
      alert('Category saved successfully to Firestore!');
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Could not save category. Please check your Firestore connection.');
    } finally {
      setIsSavingCategory(false);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    const usageCount = medicines.filter(m => m.category === name).length;
    if (usageCount > 0) {
      if (!confirm(`⚠️ Warning: There are ${usageCount} medicines registered under this category! Deleting this category group will leave those products without a valid folder group. Continue?`)) {
        return;
      }
    } else {
      if (!confirm('Are you sure you want to delete this category?')) return;
    }

    try {
      await deleteCategory(id);
      onUpdateCategories(categories.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleMoveCategory = async (id: string, direction: 'up' | 'down') => {
    setIsRearrangingCategories(true);
    try {
      // Sort current categories to find their accurate relative positions
      const sorted = [...categories].sort((a, b) => {
        const aOrder = a.order !== undefined ? a.order : 9999;
        const bOrder = b.order !== undefined ? b.order : 9999;
        if (aOrder !== bOrder) return aOrder - bOrder;
        return a.name.localeCompare(b.name);
      });

      // Normalize orders to simple index indices (0, 1, 2...)
      const normalized = sorted.map((c, idx) => ({
        ...c,
        order: idx
      }));

      const targetIndex = normalized.findIndex(c => c.id === id);
      if (targetIndex === -1) return;

      const swapIndex = direction === 'up' ? targetIndex - 1 : targetIndex + 1;
      if (swapIndex < 0 || swapIndex >= normalized.length) return;

      // Swap the order numbers
      const tempOrder = normalized[targetIndex].order!;
      normalized[targetIndex].order = normalized[swapIndex].order!;
      normalized[swapIndex].order = tempOrder;

      // Save the two modified categories to Firestore
      await Promise.all([
        saveCategory(normalized[targetIndex]),
        saveCategory(normalized[swapIndex])
      ]);

      // Update state in parent
      onUpdateCategories(normalized);
    } catch (error) {
      console.error('Error reordering categories:', error);
      alert('Could not update category order in Firestore.');
    } finally {
      setIsRearrangingCategories(false);
    }
  };

  // --- FAQS OPERATIONS ---
  const handleSaveFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question || !faqForm.answer) return;

    try {
      const completeFAQ: FAQItem = {
        id: editingFAQ?.id || 'faq-' + Date.now(),
        question: faqForm.question,
        answer: faqForm.answer
      };

      await saveFAQ(completeFAQ);

      let updatedList: FAQItem[];
      if (editingFAQ) {
        updatedList = faqs.map(f => f.id === editingFAQ.id ? completeFAQ : f);
      } else {
        updatedList = [...faqs, completeFAQ];
      }

      onUpdateFAQs(updatedList);
      setIsAddingFAQ(false);
      setEditingFAQ(null);
      setFaqForm({ question: '', answer: '' });
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    try {
      await deleteFAQ(id);
      onUpdateFAQs(faqs.filter(f => f.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // --- TESTIMONIALS OPERATIONS ---
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testForm.name || !testForm.text) return;

    try {
      const completeTest: Testimonial = {
        id: editingTestimonial?.id || 'test-' + Date.now(),
        name: testForm.name,
        rating: testForm.rating || 5,
        text: testForm.text,
        date: testForm.date || 'Today',
        verified: testForm.verified !== undefined ? testForm.verified : true
      };

      await saveTestimonial(completeTest);

      let updatedList: Testimonial[];
      if (editingTestimonial) {
        updatedList = testimonials.map(t => t.id === editingTestimonial.id ? completeTest : t);
      } else {
        updatedList = [...testimonials, completeTest];
      }

      onUpdateTestimonials(updatedList);
      setIsAddingTestimonial(false);
      setEditingTestimonial(null);
      setTestForm({ name: '', rating: 5, text: '', date: 'Today', verified: true });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Delete this review quote?')) return;
    try {
      await deleteTestimonial(id);
      onUpdateTestimonials(testimonials.filter(t => t.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // --- BULK MULTI-SELECTION DELETE ---
  const handleSelectAllMeds = () => {
    const visibleIds = sortedMedicines.map(m => m.id);
    const allSelected = visibleIds.every(id => selectedMeds.includes(id));

    if (allSelected) {
      setSelectedMeds(prev => prev.filter(id => !visibleIds.includes(id)));
    } else {
      setSelectedMeds(prev => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const handleSelectMed = (id: string) => {
    setSelectedMeds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkDeleteMedicines = async () => {
    if (selectedMeds.length === 0) return;
    if (!confirm(`⚠️ Are you sure you want to bulk-delete ${selectedMeds.length} selected medicines from Firestore? This action is absolutely permanent.`)) return;

    try {
      // Parallel delete
      await Promise.all(selectedMeds.map(id => deleteMedicine(id)));
      
      const remaining = medicines.filter(m => !selectedMeds.includes(m.id));
      onUpdateMedicines(remaining);
      setSelectedMeds([]);
      alert(`Successfully deleted ${selectedMeds.length} products.`);
    } catch (error) {
      console.error('Bulk deletion error:', error);
      alert('Error during bulk deletion.');
    }
  };

  // --- PASSWORD UPDATES ---
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setSettingsFeedback('❌ Error: New Password and Confirm Password fields must match.');
      return;
    }
    if (newPass.length < 6) {
      setSettingsFeedback('❌ Error: Password must be at least 6 characters long.');
      return;
    }

    try {
      await updateAdminPassword(newPass);
      setSettingsFeedback('✅ Master Password updated successfully in secure database storage!');
      setNewPass('');
      setConfirmPass('');
    } catch (error) {
      setSettingsFeedback('❌ Failed to update password: ' + (error as any).message);
    }
  };

  // --- FORCE FIRESTORE DATABASE SYNCHRONIZATION ---
  const handleForceDatabaseSync = async () => {
    setIsSyncing(true);
    setSyncSuccess(null);
    setSyncLogs([]);
    
    try {
      const result = await forceSyncAllDataToFirestore(
        INITIAL_MEDICINES,
        INITIAL_CATEGORIES,
        INITIAL_FAQS,
        INITIAL_TESTIMONIALS,
        (msg) => {
          setSyncLogs(prev => [...prev, msg]);
        }
      );
      
      if (result.success) {
        setSyncSuccess(true);
        // Sync locally filtered states
        const filteredCats = INITIAL_CATEGORIES.filter(cat => 
          cat.name !== 'Fertility Medicines' && 
          cat.name !== 'Ophthalmology' && 
          cat.name !== 'Psychiatry'
        );
        onUpdateMedicines(INITIAL_MEDICINES);
        onUpdateCategories(filteredCats);
        onUpdateFAQs(INITIAL_FAQS);
        onUpdateTestimonials(INITIAL_TESTIMONIALS);
      } else {
        setSyncSuccess(false);
      }
    } catch (err: any) {
      setSyncSuccess(false);
      setSyncLogs(prev => [...prev, `❌ Unexpected error: ${err?.message || String(err)}`]);
    } finally {
      setIsSyncing(false);
    }
  };

  // --- NATIVE BULK CSV MANAGER ---
  const handleDownloadTemplate = () => {
    const headers = [
      'Brand Name', 'MRP', 'Discount', 'Manufacturer', 'Packaging', 'Salt / Composition', 'Administered As', 'Used For', 'Side Effects', 'Images Link'
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + "Erlonat 150mg,18500,40,Cipla,Strip of 10 Tablets,Erlotinib Hydrochloride,Tablet,Non-small cell lung cancer;Pancreatic cancer,Rash;Diarrhea;Nausea,https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "singhla_medicos_catalog_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportCSV = () => {
    const headers = [
      'Brand Name', 'MRP', 'Discount', 'Manufacturer', 'Packaging', 'Salt / Composition', 'Administered As', 'Used For', 'Side Effects', 'Images Link'
    ];

    const escapeValue = (val: any) => {
      if (val === undefined || val === null) return '';
      if (Array.isArray(val)) val = val.join(';');
      const str = String(val).replace(/"/g, '""');
      return str.includes(',') || str.includes('\n') || str.includes('"') ? `"${str}"` : str;
    };

    let csvContent = headers.join(",") + "\n";
    medicines.forEach(med => {
      const row = [
        med.name || med.brandName || '',
        med.mrp || 0,
        med.discountPercentage || 0,
        med.manufacturer || '',
        med.packaging || '',
        med.saltName || med.genericName || '',
        med.dosageForm || 'Tablet',
        med.uses || [],
        med.sideEffects || [],
        (med.images && med.images[0]) || ''
      ];
      csvContent += row.map(escapeValue).join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `singhla_medicos_catalog_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>, mergeMode: 'merge' | 'replace') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImportingCsv(true);
    setCsvFeedback({ type: '', message: '' });

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const text = evt.target?.result as string;
        if (!text) throw new Error('Empty CSV file.');

        // Robust CSV row splitter
        const lines: string[][] = [];
        let row: string[] = [];
        let inQuotes = false;
        let currentField = '';

        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const nextChar = text[i + 1];

          if (char === '"') {
            if (inQuotes && nextChar === '"') {
              // Escaped quote
              currentField += '"';
              i++; // skip next quote
            } else {
              inQuotes = !inQuotes;
            }
          } else if (char === ',' && !inQuotes) {
            row.push(currentField);
            currentField = '';
          } else if ((char === '\r' || char === '\n') && !inQuotes) {
            if (char === '\r' && nextChar === '\n') i++; // CRLF
            row.push(currentField);
            if (row.length > 1 || row[0] !== '') {
              lines.push(row);
            }
            row = [];
            currentField = '';
          } else {
            currentField += char;
          }
        }
        if (currentField || row.length > 0) {
          row.push(currentField);
          lines.push(row);
        }

        if (lines.length < 2) throw new Error('No catalog rows found besides headers.');

        const headers = lines[0].map(h => h.trim());
        const importedMedicines: Medicine[] = [];

        for (let r = 1; r < lines.length; r++) {
          const line = lines[r];
          if (line.length < 2) continue; // skip empty lines

          const rowData: any = {};
          headers.forEach((header, index) => {
            rowData[header] = line[index] || '';
          });

          const getValue = (keys: string[], fallback: string = '') => {
            for (const k of keys) {
              if (rowData[k] !== undefined) return rowData[k];
              const cleanK = k.toLowerCase().replace(/[^a-z0-9]/g, '');
              const matchedKey = Object.keys(rowData).find(
                key => key.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanK
              );
              if (matchedKey !== undefined) return rowData[matchedKey];
            }
            return fallback;
          };

          const brandName = getValue(['Brand Name', 'brandName', 'name'], 'CSV Unnamed');
          const slug = getValue(['slug'], generateSlug(brandName));
          const id = getValue(['id'], 'med-' + slug);

          const mrp = Number(getValue(['MRP', 'mrp'])) || 0;
          const discountVal = getValue(['Discount', 'discountPercentage', 'discount']);
          let discountPercentage = 0;
          if (discountVal) {
            const cleanVal = String(discountVal).replace(/%/g, '').trim();
            const numVal = Number(cleanVal);
            if (!isNaN(numVal)) {
              if (numVal > 0 && numVal < 1) {
                discountPercentage = numVal * 100;
              } else {
                discountPercentage = numVal;
              }
            }
          }

          const saltName = getValue(['Salt / Composition', 'saltName', 'genericName', 'Salt Formulation'], 'Unspecified active ingredient');
          const genericName = saltName;

          const manufacturer = getValue(['Manufacturer', 'manufacturer'], '');
          const packaging = getValue(['Packaging', 'packaging'], 'Strip of 10 Tablets');

          let dosageFormInput = getValue(['Administered As', 'dosageForm', 'dosage_form', 'Form', 'dosageForm']);
          let dosageForm: any = 'Tablet';
          if (dosageFormInput) {
            const normalized = dosageFormInput.trim().toLowerCase();
            if (normalized.includes('inject')) dosageForm = 'Injection';
            else if (normalized.includes('capsule')) dosageForm = 'Capsule';
            else if (normalized.includes('syrup')) dosageForm = 'Syrup';
            else if (normalized.includes('cream') || normalized.includes('ointment')) dosageForm = 'Cream';
            else if (normalized.includes('tablet')) dosageForm = 'Tablet';
            else {
              dosageForm = dosageFormInput.charAt(0).toUpperCase() + dosageFormInput.slice(1);
            }
          }

          const usesInput = getValue(['Used For', 'uses']);
          let uses: string[] = [];
          if (usesInput) {
            if (String(usesInput).includes(';')) {
              uses = String(usesInput).split(';').map(s => s.trim()).filter(Boolean);
            } else {
              uses = String(usesInput).split(',').map(s => s.trim()).filter(Boolean);
            }
          }

          const sideEffectsInput = getValue(['Side Effects', 'sideEffects']);
          let sideEffects: string[] = [];
          if (sideEffectsInput) {
            if (String(sideEffectsInput).includes(';')) {
              sideEffects = String(sideEffectsInput).split(';').map(s => s.trim()).filter(Boolean);
            } else {
              sideEffects = String(sideEffectsInput).split(',').map(s => s.trim()).filter(Boolean);
            }
          }

          const imagesInput = getValue(['Images Link', 'images', 'image']);
          let images: string[] = [''];
          if (imagesInput) {
            images = [String(imagesInput).trim()];
          }

          const parsedMed: Medicine = {
            id,
            name: brandName,
            brandName,
            genericName,
            saltName,
            strength: getValue(['strength'], ''),
            category: getValue(['category'], 'Oncology'),
            manufacturer,
            descriptionShort: getValue(['descriptionShort', 'Short Summary'], ''),
            descriptionLong: getValue(['descriptionLong', 'Long Description'], ''),
            uses,
            sideEffects,
            dosage: getValue(['dosage'], ''),
            storageInstructions: getValue(['storageInstructions'], ''),
            coldStorage: (getValue(['coldStorage']) === 'Yes' ? 'Yes' : 'No') as any,
            storageTemperature: getValue(['storageTemperature'], '15°C–30°C'),
            prescriptionRequired: (getValue(['prescriptionRequired']) === 'No' ? 'No' : 'Yes') as any,
            packaging,
            images,
            faqs: [],
            relatedMedicines: getValue(['relatedMedicines']) ? String(getValue(['relatedMedicines'])).split(';') : [],
            seoTitle: getValue(['seoTitle'], `${brandName} | Singhla Medicos`),
            seoDescription: getValue(['seoDescription'], ''),
            slug,
            mrp,
            discountPercentage,
            discountPrice: Math.max(0, Math.round(mrp * (1 - discountPercentage / 100))),
            availability: (getValue(['availability'], 'In Stock')) as any,
            countryOfOrigin: getValue(['countryOfOrigin'], 'India'),
            dosageForm,
            status: (getValue(['status']) === 'Draft' ? 'Draft' : 'Published') as any,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          importedMedicines.push(parsedMed);
        }

        // Write batch in Firestore
        if (mergeMode === 'replace') {
          // Erase all existing medicines on Firestore first
          await Promise.all(medicines.map(m => deleteMedicine(m.id)));
          // Upload import
          await Promise.all(importedMedicines.map(m => saveMedicine(m)));
          onUpdateMedicines(importedMedicines);
          setCsvFeedback({ type: 'success', message: `✅ Successfully REPLACED entire catalog. Loaded ${importedMedicines.length} items to database.` });
        } else {
          // Merge: update matching IDs or append new
          await Promise.all(importedMedicines.map(m => saveMedicine(m)));
          
          const mergedList = [...medicines];
          importedMedicines.forEach(imp => {
            const idx = mergedList.findIndex(m => m.id === imp.id);
            if (idx >= 0) {
              mergedList[idx] = imp;
            } else {
              mergedList.push(imp);
            }
          });
          onUpdateMedicines(mergedList);
          setCsvFeedback({ type: 'success', message: `✅ Successfully MERGED. Updated or Added ${importedMedicines.length} products inside Firestore.` });
        }
      } catch (err) {
        console.error('Import failure:', err);
        setCsvFeedback({ type: 'error', message: '❌ Error: Failed to parse or upload CSV catalog. Make sure headers are correct.' });
      } finally {
        setIsImportingCsv(false);
      }
    };
    reader.readAsText(file);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // --- FILTERS & SEARCH PROCESSOR ---
  const processedMedicines = medicines.filter(med => {
    // 1. Search Query
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      med.name.toLowerCase().includes(query) ||
      med.brandName.toLowerCase().includes(query) ||
      med.saltName.toLowerCase().includes(query) ||
      med.manufacturer.toLowerCase().includes(query) ||
      med.slug.toLowerCase().includes(query);

    // 2. Category
    const matchesCategory = filterCategory === 'ALL' || med.category === filterCategory;

    // 3. Manufacturer
    const matchesManufacturer = filterManufacturer === 'ALL' || med.manufacturer === filterManufacturer;

    // 4. Status
    const matchesStatus = filterStatus === 'ALL' || 
      (filterStatus === 'Published' && (med.status === 'Published' || !med.status)) ||
      (filterStatus === 'Draft' && med.status === 'Draft');

    // 5. MRP > 1000
    const matchesMrpOver1000 = !filterMrpOver1000 || (med.mrp !== undefined && med.mrp > 1000);

    return matchesSearch && matchesCategory && matchesManufacturer && matchesStatus && matchesMrpOver1000;
  });

  // Sort processor
  const sortedMedicines = [...processedMedicines].sort((a, b) => {
    let comp = 0;
    if (sortBy === 'name') {
      comp = a.name.localeCompare(b.name);
    } else if (sortBy === 'mrp') {
      comp = a.mrp - b.mrp;
    } else if (sortBy === 'date_added') {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      comp = da - db;
    }
    return sortOrder === 'asc' ? comp : -comp;
  });

  const totalPages = Math.ceil(sortedMedicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMedicines = useMemo(() => {
    return sortedMedicines.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedMedicines, startIndex, itemsPerPage]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full" id="admin-panel-portal">
      {/* AUTHENTICATION GATE PANEL */}
      {!isLoggedIn ? (
        <div className="flex-1 flex items-center justify-center p-4 bg-gray-100 min-h-screen">
          <div className="bg-white rounded-3xl border-2 border-black w-full max-w-md overflow-hidden relative shadow-2xl">
            {/* Decorative Top header */}
            <div className="bg-dark-grey text-white py-6 px-8 flex justify-between items-center border-b-2 border-black">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-primary-yellow w-6 h-6 shrink-0 animate-pulse" />
                <div>
                  <h3 className="font-display font-black uppercase text-sm tracking-widest text-primary-yellow">Owner Console</h3>
                  <p className="text-[10px] text-gray-300 font-bold uppercase tracking-wider mt-0.5">Singhla Medicos Secure Core</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-1 text-gray-300 hover:text-white hover:bg-white/15 rounded-lg cursor-pointer transition-all"
                title="Return to Home"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLogin} className="p-8 space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Master Admin Password</label>
                <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-yellow-400 focus-within:bg-white transition-all overflow-hidden">
                  <span className="pl-4 text-gray-400">
                    <Key className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-3 pr-4 py-3 text-sm bg-transparent border-none focus:outline-none placeholder-gray-300 text-gray-900"
                    required
                    autoFocus
                  />
                </div>
                <p className="text-[9px] text-gray-400 uppercase tracking-wide font-medium">Session logs automatically expire upon logout.</p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-800 text-center">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 bg-primary-yellow border-2 border-black font-black uppercase text-xs tracking-widest text-black hover:bg-amber-400 active:translate-y-0.5 rounded-xl cursor-pointer shadow-md shadow-amber-100 flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Verifying Hash...</span>
                  </>
                ) : (
                  <span>Access Console</span>
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* MAIN AUTHENTICATED PANEL WORKSPACE */
        <div className="flex-1 flex flex-col min-h-screen bg-gray-50 relative">
          
          {/* Top Panel Header */}
          <header className="bg-dark-grey text-white px-6 py-4 flex items-center justify-between border-b-2 border-black shrink-0">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-yellow-400/10 rounded-lg text-primary-yellow">
                <ShieldCheck className="w-5 h-5 text-primary-yellow" />
              </span>
              <div>
                <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">Singhla Medicos</h3>
                <p className="text-[9px] text-primary-yellow font-bold uppercase tracking-widest mt-0.5">Secure Core Database Manager</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-black text-[10px] uppercase tracking-wider rounded-lg cursor-pointer transition-all border border-black/10"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
              <button
                onClick={onClose}
                className="p-1 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
            {/* MOBILE TOP NAVIGATION BAR (Visible on screens < md) */}
            <div className="md:hidden bg-white border-b border-gray-200 p-2 flex items-center justify-between overflow-x-auto gap-1 scrollbar-none shrink-0">
              <button
                onClick={() => { setActiveTab('dashboard'); setIsAddingMedicine(false); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-gray-900 text-white' : 'text-gray-700 bg-gray-100'}`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => { setActiveTab('medicines'); setIsAddingMedicine(false); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${activeTab === 'medicines' ? 'bg-gray-900 text-white' : 'text-gray-700 bg-gray-100'}`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Products</span>
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${activeTab === 'categories' ? 'bg-gray-900 text-white' : 'text-gray-700 bg-gray-100'}`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Categories</span>
              </button>
              <button
                onClick={() => setActiveTab('faqs')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${activeTab === 'faqs' ? 'bg-gray-900 text-white' : 'text-gray-700 bg-gray-100'}`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>FAQs</span>
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${activeTab === 'testimonials' ? 'bg-gray-900 text-white' : 'text-gray-700 bg-gray-100'}`}
              >
                <Star className="w-3.5 h-3.5" />
                <span>Reviews</span>
              </button>
              <button
                onClick={() => setActiveTab('bulk')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${activeTab === 'bulk' ? 'bg-gray-900 text-white' : 'text-gray-700 bg-gray-100'}`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${activeTab === 'settings' ? 'bg-gray-900 text-white' : 'text-gray-700 bg-gray-100'}`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>Password</span>
              </button>
            </div>

            {/* DESKTOP COLLAPSIBLE SIDEBAR NAVIGATION */}
            <aside 
              className={`bg-white border-r border-gray-200 flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out hidden md:flex ${
                isSidebarCollapsed ? 'w-16' : 'w-52'
              }`}
            >
              <div className="p-2.5 space-y-2">
                {/* Header Toggle Row */}
                <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} pb-2 border-b border-gray-100`}>
                  {!isSidebarCollapsed && (
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider pl-1 select-none">Navigation Menu</span>
                  )}
                  <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all cursor-pointer border border-gray-200/60 flex items-center justify-center"
                    title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    aria-label={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                  >
                    {isSidebarCollapsed ? (
                      <ChevronRight className="w-4 h-4 text-gray-700" />
                    ) : (
                      <ChevronLeft className="w-4 h-4 text-gray-700" />
                    )}
                  </button>
                </div>

                <nav className="space-y-1">
                  {/* Dashboard Tab link */}
                  <button
                    onClick={() => { setActiveTab('dashboard'); setIsAddingMedicine(false); }}
                    title={isSidebarCollapsed ? "Dashboard" : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                      activeTab === 'dashboard' 
                        ? 'bg-gray-900 text-white shadow-xs' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <RefreshCw className={`w-4 h-4 shrink-0 ${activeTab === 'dashboard' ? 'animate-spin-slow' : ''}`} />
                    {!isSidebarCollapsed && <span className="truncate">Dashboard</span>}
                  </button>

                  {/* Medicines Tab link */}
                  <button
                    onClick={() => { setActiveTab('medicines'); setIsAddingMedicine(false); }}
                    title={isSidebarCollapsed ? "Products" : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                      activeTab === 'medicines' 
                        ? 'bg-gray-900 text-white shadow-xs' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Database className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span className="truncate">Products</span>}
                  </button>

                  {/* Categories Tab link */}
                  <button
                    onClick={() => setActiveTab('categories')}
                    title={isSidebarCollapsed ? "Category List" : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                      activeTab === 'categories' 
                        ? 'bg-gray-900 text-white shadow-xs' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Layers className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span className="truncate">Category List</span>}
                  </button>

                  {/* FAQs Tab link */}
                  <button
                    onClick={() => setActiveTab('faqs')}
                    title={isSidebarCollapsed ? "Help FAQs" : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                      activeTab === 'faqs' 
                        ? 'bg-gray-900 text-white shadow-xs' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <HelpCircle className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span className="truncate">Help FAQs</span>}
                  </button>

                  {/* Testimonials Tab link */}
                  <button
                    onClick={() => setActiveTab('testimonials')}
                    title={isSidebarCollapsed ? "Reviews" : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                      activeTab === 'testimonials' 
                        ? 'bg-gray-900 text-white shadow-xs' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Star className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span className="truncate">Reviews</span>}
                  </button>

                  {/* CSV Import / Export Tab link */}
                  <button
                    onClick={() => setActiveTab('bulk')}
                    title={isSidebarCollapsed ? "CSV Manager" : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                      activeTab === 'bulk' 
                        ? 'bg-gray-900 text-white shadow-xs' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Upload className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span className="truncate">CSV Manager</span>}
                  </button>
                </nav>
              </div>

              {/* Password configuration link & collapse toggle at bottom */}
              <div className="p-2.5 border-t border-gray-100 space-y-1.5">
                <button
                  onClick={() => setActiveTab('settings')}
                  title={isSidebarCollapsed ? "Master Password" : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                    activeTab === 'settings' 
                      ? 'bg-gray-900 text-white shadow-xs' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Key className="w-4 h-4 shrink-0" />
                  {!isSidebarCollapsed && <span className="truncate">Master Password</span>}
                </button>

                {/* Bottom expand/collapse toggle pill */}
                <button
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className={`w-full flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-gray-500 hover:text-gray-900 text-[11px] font-bold transition-all cursor-pointer ${
                    isSidebarCollapsed ? 'justify-center px-0' : 'justify-between'
                  }`}
                  title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                  {!isSidebarCollapsed && <span className="truncate">Collapse Menu</span>}
                  {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
              </div>
            </aside>

            {/* CENTRAL INTERACTIVE WORKSPACE VIEWPORT */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50/50 min-h-0">
              
              {/* DASHBOARD TAB */}
              {activeTab === 'dashboard' && (
                <AdminDashboardOverview
                  medicines={medicines}
                  categories={categories}
                  onQuickAdd={() => {
                    setEditingMedicine(null);
                    setIsAddingMedicine(true);
                    setActiveTab('medicines');
                  }}
                  onEditMedicine={(med) => {
                    setEditingMedicine(med);
                    setIsAddingMedicine(true);
                    setActiveTab('medicines');
                  }}
                  onSearchQueryChange={(query) => {
                    setSearchQuery(query);
                    setActiveTab('medicines');
                  }}
                />
              )}

              {/* MEDICINES PRODUCT MANAGEMENT TAB */}
              {activeTab === 'medicines' && (
                <div className="space-y-6">
                  {isAddingMedicine ? (
                    <AdminMedicineForm
                      editingMedicine={editingMedicine}
                      medicines={medicines}
                      categories={categories}
                      onSave={handleSaveMedicine}
                      onCancel={() => {
                        setIsAddingMedicine(false);
                        setEditingMedicine(null);
                      }}
                      isSaving={isSavingMedicine}
                    />
                  ) : (
                    /* PRODUCTS LIST CATALOG VIEW */
                    <div className="space-y-4">
                      {/* Sub-header actions */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-display font-black text-base text-gray-900">Medicine Directory</h4>
                            {isLoadingAllMeds && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-sm font-bold text-[9px] border border-blue-200 animate-pulse">
                                <Loader2 className="w-2.5 h-2.5 animate-spin" />
                                <span>Loading full database...</span>
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-400">Total Filtered Results: {sortedMedicines.length} of {medicines.length} items</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsAutoCategorizerOpen(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs border border-emerald-700"
                            title="Auto-detect categories for products using salt composition and therapeutic uses"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Auto-Categorize ({medicines.length.toLocaleString()})</span>
                          </button>

                          <button
                            onClick={() => {
                              setEditingMedicine(null);
                              setIsAddingMedicine(true);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-yellow text-black font-bold text-xs rounded-lg cursor-pointer border-2 border-black"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add New Medicine</span>
                          </button>
                        </div>
                      </div>

                      {/* Unassigned Category Alert Banner */}
                      {medicines.some(m => !m.category || m.category === 'All Medicines' || m.category === 'Uncategorized') && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200/80 rounded-xl text-xs">
                          <div className="flex items-center gap-2.5 text-amber-950">
                            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>
                              <strong>Categorization Opportunity:</strong> Many products do not have specific categories assigned. Use Smart Auto-Categorize to automatically match them based on salt formulation &amp; uses.
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsAutoCategorizerOpen(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs shrink-0 transition-colors shadow-xs"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Run Auto-Categorizer</span>
                          </button>
                        </div>
                      )}

                      {/* Filter controls row */}
                      <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
                        <div className="flex flex-col lg:flex-row gap-3">
                          {/* Search input field */}
                          <div className="relative flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs">
                            <Search className="w-4 h-4 text-gray-400 shrink-0 mr-2" />
                            <input
                              type="text"
                              placeholder="Search medicine by name, brand, salt, company..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full bg-transparent border-none focus:outline-none placeholder-gray-400 text-gray-900 text-sm font-medium"
                            />
                          </div>

                          {/* MRP > 1000 Special Toggle */}
                          <button
                            type="button"
                            onClick={() => setFilterMrpOver1000(!filterMrpOver1000)}
                            className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg border-2 transition-all cursor-pointer flex items-center justify-center gap-2 select-none shrink-0 ${
                              filterMrpOver1000
                                ? 'bg-primary-yellow border-black text-black shadow-xs'
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <Filter className="w-3.5 h-3.5" />
                            <span>MRP &gt; ₹1000</span>
                            {filterMrpOver1000 ? (
                              <span className="bg-black text-white text-[9px] px-1.5 py-0.5 rounded-[4px] font-mono font-black uppercase animate-pulse">
                                Active
                              </span>
                            ) : (
                              <span className="bg-gray-100 text-gray-500 text-[9px] px-1.5 py-0.5 rounded-[4px] font-mono">
                                Off
                              </span>
                            )}
                          </button>
                        </div>

                        {/* Extra under-the-hood filters made visible for convenience */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-2 border-t border-gray-100">
                          {/* Category Filter */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Category</label>
                            <select
                              value={filterCategory}
                              onChange={(e) => setFilterCategory(e.target.value)}
                              className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:border-black cursor-pointer"
                            >
                              <option value="ALL">All Categories</option>
                              {categories.map(c => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                              ))}
                            </select>
                          </div>

                          {/* Manufacturer Filter */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Manufacturer</label>
                            <select
                              value={filterManufacturer}
                              onChange={(e) => setFilterManufacturer(e.target.value)}
                              className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:border-black cursor-pointer"
                            >
                              <option value="ALL">All Companies</option>
                              {availableManufacturers.map(m => (
                                <option key={m} value={m}>{m}</option>
                              ))}
                            </select>
                          </div>

                          {/* Status Filter */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Status</label>
                            <select
                              value={filterStatus}
                              onChange={(e) => setFilterStatus(e.target.value)}
                              className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:border-black cursor-pointer"
                            >
                              <option value="ALL">All Status</option>
                              <option value="Published">Published</option>
                              <option value="Draft">Draft</option>
                            </select>
                          </div>

                          {/* Sort By */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Sort By</label>
                            <select
                              value={sortBy}
                              onChange={(e) => setSortBy(e.target.value as any)}
                              className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none focus:border-black cursor-pointer"
                            >
                              <option value="name">Product Name</option>
                              <option value="mrp">MRP Price</option>
                              <option value="date_added">Date Added</option>
                            </select>
                          </div>

                          {/* Sort Order Toggle */}
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Sort Direction</label>
                            <button
                              type="button"
                              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                              className="w-full px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-black text-gray-700 flex items-center justify-between cursor-pointer select-none"
                            >
                              <span className="uppercase tracking-wider">{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
                              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            </button>
                          </div>
                        </div>

                        {/* Reset All Filters button if active */}
                        {(searchQuery || filterCategory !== 'ALL' || filterManufacturer !== 'ALL' || filterStatus !== 'ALL' || filterMrpOver1000) && (
                          <div className="flex justify-end pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                setSearchQuery('');
                                setFilterCategory('ALL');
                                setFilterManufacturer('ALL');
                                setFilterStatus('ALL');
                                setFilterMrpOver1000(false);
                                setSortBy('name');
                                setSortOrder('asc');
                              }}
                              className="text-[10px] font-black text-red-600 hover:text-red-700 uppercase tracking-widest flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <span>Reset All Active Filters &times;</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Bulk actions panel trigger */}
                      {selectedMeds.length > 0 && (
                        <div className="flex items-center justify-between p-3.5 bg-yellow-50 border border-yellow-200 rounded-xl">
                          <span className="text-xs font-bold text-yellow-950 flex items-center gap-1.5">
                            <span>Selected {selectedMeds.length} items for bulk operations</span>
                          </span>
                          <button
                            onClick={handleBulkDeleteMedicines}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete Selected</span>
                          </button>
                        </div>
                      )}

                      {/* TABLE WRAPPER CONTAINER */}
                      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                              <th className="p-3 w-10 text-center">
                                <button type="button" onClick={handleSelectAllMeds} className="text-gray-400 hover:text-gray-900">
                                  {sortedMedicines.length > 0 && sortedMedicines.every(m => selectedMeds.includes(m.id)) ? (
                                    <CheckSquare className="w-4 h-4 text-gray-900" />
                                  ) : (
                                    <Square className="w-4 h-4" />
                                  )}
                                </button>
                              </th>
                              <th className="p-3">Medicine Info</th>
                              <th className="p-3">Last Modified</th>
                              <th className="p-3">MRP</th>
                              <th className="p-3">Discount</th>
                              <th className="p-3">Final Price</th>
                              <th className="p-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 text-gray-700 font-sans">
                            {sortedMedicines.length > 0 ? (
                              paginatedMedicines.map(med => (
                                <tr key={med.id} className="hover:bg-gray-50/50">
                                  <td className="p-3 text-center">
                                    <button type="button" onClick={() => handleSelectMed(med.id)} className="text-gray-400">
                                      {selectedMeds.includes(med.id) ? (
                                        <CheckSquare className="w-4 h-4 text-gray-950" />
                                      ) : (
                                        <Square className="w-4 h-4" />
                                      )}
                                    </button>
                                  </td>
                                  <td className="p-3 space-y-1">
                                    <div className="font-bold text-gray-950 text-xs">{med.name}</div>
                                    {(med.saltName || med.genericName) && (
                                      <div className="text-[11px] text-gray-600 font-medium leading-tight">
                                        {med.saltName || med.genericName}
                                      </div>
                                    )}
                                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                                      <span className={`inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                        !med.category || med.category === 'All Medicines' || med.category === 'Uncategorized'
                                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                      }`}>
                                        {med.category || 'Unassigned'}
                                      </span>
                                      {med.manufacturer && (
                                        <span className="text-[10px] text-gray-400 font-medium">
                                          {med.manufacturer}
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="p-3 text-gray-700 min-w-[140px] max-w-[190px]">
                                    {(() => {
                                      const timeInfo = formatLastModifiedTime(med.updatedAt, med.createdAt);
                                      return (
                                        <div className="flex flex-col" title={`Exact timestamp: ${timeInfo.full}${med.lastEditedBy ? ` • ${med.lastEditedBy}` : ''}`}>
                                          <div className="flex items-center gap-1 font-bold text-gray-900 text-xs">
                                            <Clock className="w-3 h-3 text-emerald-600 shrink-0" />
                                            <span>{timeInfo.primary}</span>
                                          </div>
                                          {timeInfo.secondary && (
                                            <div className="text-[10px] text-gray-400 font-mono pl-4">
                                              {timeInfo.secondary}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })()}
                                  </td>
                                  <td className="p-3 min-w-[100px] max-w-[120px]">
                                    <EditableNumberCell
                                      value={med.mrp}
                                      min={0}
                                      onSave={(newMrp) => handleInlineUpdateMedicine(med.id, { mrp: newMrp })}
                                      prefix="₹"
                                    />
                                  </td>
                                  <td className="p-3 min-w-[90px] max-w-[110px]">
                                    <EditableNumberCell
                                      value={med.discountPercentage || 0}
                                      min={0}
                                      max={100}
                                      onSave={(newDiscount) => handleInlineUpdateMedicine(med.id, { discountPercentage: newDiscount })}
                                      suffix="%"
                                    />
                                  </td>
                                  <td className="p-3 min-w-[100px] max-w-[120px]">
                                    <EditableNumberCell
                                      value={med.discountPrice ?? Math.round(med.mrp * (1 - (med.discountPercentage || 0) / 100))}
                                      min={0}
                                      max={med.mrp > 0 ? med.mrp : undefined}
                                      onSave={(newFinalPrice) => handleInlineUpdateMedicine(med.id, { discountPrice: newFinalPrice })}
                                      prefix="₹"
                                    />
                                  </td>
                                  <td className="p-3 text-right">
                                    <div className="flex items-center justify-end gap-1 shrink-0">
                                      <button
                                        onClick={() => { setEditingMedicine(med); setIsAddingMedicine(true); }}
                                        className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg"
                                        title="Edit Product Card"
                                      >
                                        <Edit2 className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteMedicine(med.id)}
                                        className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                                        title="Delete Permanently"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-400 italic">
                                  No medicines matches your search or active filters.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Premium Pagination Controls for Admin */}
                      {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                            Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, sortedMedicines.length)} of {sortedMedicines.length} products
                          </p>
                          <div className="flex items-center gap-1 flex-wrap justify-center">
                            {/* Prev Button */}
                            <button
                              disabled={currentPage === 1}
                              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                              className={`px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                                currentPage === 1
                                  ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              &larr; Prev
                            </button>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }).map((_, idx) => {
                              const pageNum = idx + 1;
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
                                  onClick={() => setCurrentPage(pageNum)}
                                  className={`w-7 h-7 flex items-center justify-center text-[10px] font-black uppercase rounded-lg border transition-all cursor-pointer ${
                                    currentPage === pageNum
                                      ? 'bg-primary-yellow border-black text-black font-black shadow-xs'
                                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}

                            {/* Next Button */}
                            <button
                              disabled={currentPage === totalPages}
                              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                              className={`px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                                currentPage === totalPages
                                  ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              Next &rarr;
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* CATEGORIES TAB */}
              {activeTab === 'categories' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
                    <div>
                      <h4 className="font-display font-black text-lg text-gray-900">Category Folders</h4>
                      <p className="text-xs text-gray-400">Add, rename, delete classification categories, or auto-assign products.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAutoCategorizerOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow-xs border border-emerald-700"
                        title="Auto-assign categories across the entire catalog"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Smart Categorize Products</span>
                      </button>

                      {!isAddingCategory && (
                        <button
                          onClick={() => {
                            setEditingCategory(null);
                            setCategoryForm({ name: '', iconName: 'Layers', icon: 'Layers', count: 0 });
                            setIsAddingCategory(true);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-400 text-black font-bold text-xs rounded-lg cursor-pointer border border-black"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Create Category</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {isAddingCategory ? (
                    <form onSubmit={handleSaveCategory} className="bg-white p-5 rounded-2xl border border-gray-200 max-w-sm space-y-4">
                      <h5 className="font-bold text-xs text-gray-800">
                        {editingCategory ? 'Edit Category Name' : 'Create Custom Category Group'}
                      </h5>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Category Name</label>
                        <input
                          type="text"
                          value={categoryForm.name || ''}
                          onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                          placeholder="e.g. Critical Care"
                          required
                        />
                      </div>
                      <div className="flex justify-end gap-2 border-t border-gray-100 pt-3">
                        <button
                          type="button"
                          onClick={() => setIsAddingCategory(false)}
                          className="px-3 py-1.5 text-xs bg-gray-50 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSavingCategory}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-yellow-400 text-black rounded transition-all ${isSavingCategory ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {isSavingCategory ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            'Save Group'
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categories.map((cat, index) => {
                        const count = medicines.filter(m => m.category === cat.name).length;
                        return (
                          <div key={cat.id} className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5 min-w-0">
                              {/* Reorder Buttons */}
                              <div className="flex flex-col gap-0.5 shrink-0 bg-gray-50 border border-gray-100 p-0.5 rounded-lg">
                                <button
                                  type="button"
                                  onClick={() => handleMoveCategory(cat.id, 'up')}
                                  disabled={index === 0 || isRearrangingCategories}
                                  className="p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-30 disabled:pointer-events-none rounded transition-all cursor-pointer"
                                  title="Move Up"
                                >
                                  <ChevronUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMoveCategory(cat.id, 'down')}
                                  disabled={index === categories.length - 1 || isRearrangingCategories}
                                  className="p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-30 disabled:pointer-events-none rounded transition-all cursor-pointer"
                                  title="Move Down"
                                >
                                  <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="min-w-0">
                                <div className="font-bold text-xs text-gray-900 truncate flex items-center gap-1.5">
                                  <span>{cat.name}</span>
                                  <span className="text-[9px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded shrink-0">
                                    Pos {index + 1}
                                  </span>
                                </div>
                                <div className="text-[10px] text-gray-400 mt-0.5">{count} Registered medicines</div>
                              </div>
                            </div>
                            <div className="flex gap-1 shrink-0">
                              <button
                                onClick={() => { setEditingCategory(cat); setCategoryForm({ ...cat }); setIsAddingCategory(true); }}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(cat.id, cat.name)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* FAQS TAB */}
              {activeTab === 'faqs' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div>
                      <h4 className="font-display font-black text-lg text-gray-900">Manage FAQs</h4>
                      <p className="text-xs text-gray-400">Configure frequently asked questions rendered in home section.</p>
                    </div>
                    {!isAddingFAQ && (
                      <button
                        onClick={() => {
                          setEditingFAQ(null);
                          setFaqForm({ question: '', answer: '' });
                          setIsAddingFAQ(true);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-400 text-black font-bold text-xs rounded-lg cursor-pointer border border-black"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add FAQ Item</span>
                      </button>
                    )}
                  </div>

                  {isAddingFAQ ? (
                    <form onSubmit={handleSaveFAQ} className="bg-white p-5 rounded-2xl border border-gray-200 max-w-lg space-y-4">
                      <h5 className="font-bold text-xs text-gray-800">
                        {editingFAQ ? 'Edit FAQ Item' : 'Create FAQ Item'}
                      </h5>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Question</label>
                          <input
                            type="text"
                            value={faqForm.question || ''}
                            onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                            placeholder="e.g. Do you require prescriptions?"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Answer text</label>
                          <textarea
                            value={faqForm.answer || ''}
                            onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                            placeholder="Type response guidelines..."
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 border-t border-gray-100 pt-3">
                        <button
                          type="button"
                          onClick={() => setIsAddingFAQ(false)}
                          className="px-3 py-1.5 text-xs bg-gray-50 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1.5 text-xs font-bold bg-yellow-400 text-black rounded"
                        >
                          Save FAQ
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-3">
                      {faqs.map(faq => (
                        <div key={faq.id} className="bg-white p-4 rounded-xl border border-gray-200 flex items-start justify-between">
                          <div className="space-y-1 pr-6 text-xs">
                            <div className="font-bold text-gray-900">Q: {faq.question}</div>
                            <div className="text-gray-500 font-sans">A: {faq.answer}</div>
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <button
                              onClick={() => { setEditingFAQ(faq); setFaqForm({ ...faq }); setIsAddingFAQ(true); }}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteFAQ(faq.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TESTIMONIALS TAB */}
              {activeTab === 'testimonials' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div>
                      <h4 className="font-display font-black text-lg text-gray-900">Manage Patient Reviews</h4>
                      <p className="text-xs text-gray-400">Control testimonials displayed on website.</p>
                    </div>
                    {!isAddingTestimonial && (
                      <button
                        onClick={() => {
                          setEditingTestimonial(null);
                          setTestForm({ name: '', rating: 5, text: '', date: 'Today', verified: true });
                          setIsAddingTestimonial(true);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-400 text-black font-bold text-xs rounded-lg cursor-pointer border border-black"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Testimonial</span>
                      </button>
                    )}
                  </div>

                  {isAddingTestimonial ? (
                    <form onSubmit={handleSaveTestimonial} className="bg-white p-5 rounded-2xl border border-gray-200 max-w-lg space-y-4">
                      <h5 className="font-bold text-xs text-gray-800">
                        {editingTestimonial ? 'Edit Testimonial' : 'Create Testimonial'}
                      </h5>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Reviewer Name</label>
                            <input
                              type="text"
                              value={testForm.name || ''}
                              onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                              placeholder="e.g. Dr. Malik"
                              required
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Rating Stars (1-5)</label>
                            <input
                              type="number"
                              min="1"
                              max="5"
                              value={testForm.rating || 5}
                              onChange={(e) => setTestForm({ ...testForm, rating: Number(e.target.value) })}
                              className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Date Tag</label>
                            <input
                              type="text"
                              value={testForm.date || ''}
                              onChange={(e) => setTestForm({ ...testForm, date: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                              placeholder="e.g. 1 week ago"
                              required
                            />
                          </div>
                          <div className="flex items-center gap-2 pt-4">
                            <input
                              type="checkbox"
                              checked={!!testForm.verified}
                              onChange={(e) => setTestForm({ ...testForm, verified: e.target.checked })}
                              id="verified-buyer-chk"
                              className="w-4 h-4 text-yellow-400 bg-gray-100 rounded border-gray-300 focus:ring-yellow-400 animate-none"
                            />
                            <label htmlFor="verified-buyer-chk" className="text-xs font-bold text-gray-600">Verified Buyer</label>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Review Quote</label>
                          <textarea
                            value={testForm.text || ''}
                            onChange={(e) => setTestForm({ ...testForm, text: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                            placeholder="Type quote..."
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 border-t border-gray-100 pt-3">
                        <button
                          type="button"
                          onClick={() => setIsAddingTestimonial(false)}
                          className="px-3 py-1.5 text-xs bg-gray-50 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1.5 text-xs font-bold bg-yellow-400 text-black rounded"
                        >
                          Save Review
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-3">
                      {testimonials.map(t => (
                        <div key={t.id} className="bg-white p-4 rounded-xl border border-gray-200 flex items-start justify-between">
                          <div className="space-y-1 pr-6 text-xs">
                            <div className="font-bold text-gray-900 flex items-center gap-1">
                              <span>{t.name}</span>
                              <span className="text-[10px] text-yellow-600">({t.rating} ★)</span>
                              {t.verified && <span className="text-[9px] px-1 bg-emerald-100 text-emerald-800 rounded">Verified</span>}
                            </div>
                            <div className="text-gray-400 text-[10px]">{t.date}</div>
                            <div className="text-gray-500 italic mt-1 font-sans">"{t.text}"</div>
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <button
                              onClick={() => { setEditingTestimonial(t); setTestForm({ ...t }); setIsAddingTestimonial(true); }}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTestimonial(t.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* BULK CSV TAB */}
              {activeTab === 'bulk' && (
                <div className="bg-white p-6 border border-gray-200 rounded-2xl max-w-2xl space-y-6">
                  <div>
                    <h4 className="font-display font-black text-lg text-gray-900 flex items-center gap-1.5">
                      <Upload className="text-yellow-500 w-5 h-5" />
                      Bulk Medicine Inventory CSV Manager
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Upload standard Excel/CSV files directly to bulk-add medicines to the database catalog or overwrite current data.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Export catalog */}
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/50 flex flex-col justify-between space-y-3">
                      <div>
                        <h5 className="font-bold text-xs text-gray-800 uppercase tracking-wide">Export Medicine Catalog</h5>
                        <p className="text-[10px] text-gray-500 mt-0.5">Download your active inventory list to save offline.</p>
                      </div>
                      <button
                        onClick={handleExportCSV}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs rounded-lg cursor-pointer border border-black"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export CSV</span>
                      </button>
                    </div>

                    {/* Download schema */}
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/50 flex flex-col justify-between space-y-3">
                      <div>
                        <h5 className="font-bold text-xs text-gray-800 uppercase tracking-wide">Blank Schema CSV Template</h5>
                        <p className="text-[10px] text-gray-500 mt-0.5">Download pre-formatted Excel columns blueprint.</p>
                      </div>
                      <button
                        onClick={handleDownloadTemplate}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-900 hover:bg-black text-white font-bold text-xs rounded-lg cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Download Template</span>
                      </button>
                    </div>
                  </div>

                  {/* Upload Block with Merge/Replace Options */}
                  <div className="border border-gray-200 p-5 rounded-2xl bg-gray-50 space-y-4">
                    <h5 className="font-bold text-xs text-gray-800 uppercase tracking-wider">Upload New CSV Dataset</h5>
                    
                    <div className="relative">
                      {/* Merge option */}
                      <div className="relative border-2 border-dashed border-gray-300 rounded-xl bg-white hover:bg-gray-50 p-6 text-center cursor-pointer overflow-hidden group">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <span className="font-bold text-sm text-gray-800 block">Upload & Merge Dataset</span>
                        <span className="text-xs text-gray-400 block mt-1 max-w-md mx-auto">
                          Keeps current products, updates existing ones with matching IDs/names, and appends new products securely to Firestore.
                        </span>
                        <input
                          type="file"
                          accept=".csv"
                          disabled={isImportingCsv}
                          onChange={(e) => handleCSVUpload(e, 'merge')}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    {isImportingCsv && (
                      <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-600 bg-white py-3 border border-gray-200 rounded-xl">
                        <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
                        <span>Uploading batch writes to secure Firestore database...</span>
                      </div>
                    )}
                  </div>

                  {/* Feedback Message */}
                  {csvFeedback.message && (
                    <div className={`p-4 rounded-xl text-xs font-semibold ${
                      csvFeedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {csvFeedback.message}
                    </div>
                  )}
                </div>
              )}

              {/* SETTINGS MASTER PASSWORD & DATABASE FORCE SYNC TAB */}
              {activeTab === 'settings' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
                  {/* Left Column: Update Password */}
                  <div className="bg-white p-6 border border-gray-200 rounded-2xl space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-display font-black text-lg text-gray-900 flex items-center gap-1.5">
                          <Key className="text-yellow-500 w-5 h-5 animate-bounce" />
                          Update Master Password
                        </h4>
                        <p className="text-xs text-gray-400 mt-1 font-medium">
                          Modify the secure master password used to authenticate owners console. Minimum 6 characters required.
                        </p>
                      </div>

                      <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">New Master Password</label>
                          <input
                            type="password"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:ring-1 focus:ring-yellow-400 font-semibold text-gray-900"
                            placeholder="••••••••"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Confirm Password</label>
                          <input
                            type="password"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:ring-1 focus:ring-yellow-400 font-semibold text-gray-900"
                            placeholder="••••••••"
                            required
                          />
                        </div>

                        {settingsFeedback && (
                          <div className={`p-3 rounded-xl text-xs font-semibold ${
                            settingsFeedback.includes('✅') ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-red-50 text-red-800 border border-red-100'
                          }`}>
                            {settingsFeedback}
                          </div>
                        )}

                        <button
                          type="submit"
                          className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
                        >
                          Update Password
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Right Column: Database Force Sync / Feed */}
                  <div className="bg-white p-6 border border-gray-200 rounded-2xl space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-display font-black text-lg text-gray-900 flex items-center gap-1.5">
                          <Database className="text-blue-500 w-5 h-5 shrink-0" />
                          Firestore Database Seeder
                        </h4>
                        <p className="text-xs text-gray-400 mt-1 font-medium">
                          Feed all standard medicines, categories, FAQs, and reviews from <code className="font-mono text-blue-600 bg-blue-50 px-1 py-0.5 rounded text-[10px]">src/data.ts</code> into your Cloud Firestore collections. This is required to initialize your database.
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 border border-gray-200 rounded-xl text-xs space-y-2">
                        <div className="font-bold text-gray-700">Dataset Payload:</div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500 font-semibold uppercase">
                          <div className="bg-white p-2 border border-gray-100 rounded-lg">
                            <span>📦 Medicines: </span>
                            <span className="text-blue-600 font-bold">{INITIAL_MEDICINES.length} items</span>
                          </div>
                          <div className="bg-white p-2 border border-gray-100 rounded-lg">
                            <span>🏷️ Categories: </span>
                            <span className="text-purple-600 font-bold">{INITIAL_CATEGORIES.length} items</span>
                          </div>
                          <div className="bg-white p-2 border border-gray-100 rounded-lg">
                            <span>❓ FAQs: </span>
                            <span className="text-amber-600 font-bold">{INITIAL_FAQS.length} items</span>
                          </div>
                          <div className="bg-white p-2 border border-gray-100 rounded-lg">
                            <span>⭐ Reviews: </span>
                            <span className="text-emerald-600 font-bold">{INITIAL_TESTIMONIALS.length} items</span>
                          </div>
                        </div>
                      </div>

                      {syncLogs.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Synchronization Logs:</span>
                          <div className="bg-slate-950 text-slate-100 text-[10px] p-3 rounded-xl font-mono overflow-y-auto max-h-[160px] border border-slate-800 space-y-1 scrollbar-thin">
                            {syncLogs.map((log, idx) => (
                              <div key={idx} className={
                                log.startsWith('✓') || log.includes('✓') ? 'text-emerald-400 font-semibold' :
                                log.startsWith('🎉') ? 'text-emerald-300 font-bold' :
                                log.startsWith('❌') ? 'text-red-400 font-bold' :
                                log.startsWith('-') ? 'text-slate-400 pl-2' : 'text-slate-300'
                              }>
                                {log}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {syncSuccess !== null && (
                        <div className={`p-3 rounded-xl text-xs font-semibold ${
                          syncSuccess ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-red-50 text-red-800 border border-red-100'
                        }`}>
                          {syncSuccess 
                            ? '✅ Collections successfully created and loaded into Firestore!' 
                            : '❌ Sync failed. Please verify Firestore provisioning in Firebase.'
                          }
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleForceDatabaseSync}
                      disabled={isSyncing}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black uppercase text-xs tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                    >
                      {isSyncing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Writing to Firestore...</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4 text-white animate-spin-slow" />
                          <span>Feed & Sync to Firebase</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      )}

      {/* Smart Auto-Categorizer Modal */}
      <AdminAutoCategorizerModal
        isOpen={isAutoCategorizerOpen}
        onClose={() => setIsAutoCategorizerOpen(false)}
        medicines={medicines}
        categories={categories}
        selectedMedicineIds={selectedMeds}
        onApplyUpdates={(updated) => {
          onUpdateMedicines(updated);
        }}
      />
    </div>
  );
}
