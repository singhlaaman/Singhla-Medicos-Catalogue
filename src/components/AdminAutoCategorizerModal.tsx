import React, { useState, useMemo } from 'react';
import { Medicine, Category } from '../types';
import { 
  Sparkles, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Search, 
  Layers, 
  Filter, 
  Save, 
  RotateCw,
  Info,
  Check,
  Zap,
  Activity,
  Flame
} from 'lucide-react';
import { batchEstimateCategories } from '../utils/categoryEstimator';
import { batchUpdateMedicines } from '../db';

interface AdminAutoCategorizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicines: Medicine[];
  categories: Category[];
  selectedMedicineIds?: string[];
  onApplyUpdates: (updatedMedicines: Medicine[]) => void;
}

export default function AdminAutoCategorizerModal({
  isOpen,
  onClose,
  medicines,
  categories,
  selectedMedicineIds = [],
  onApplyUpdates
}: AdminAutoCategorizerModalProps) {
  const [scope, setScope] = useState<'unassigned' | 'all' | 'selected'>(
    selectedMedicineIds.length > 0 ? 'selected' : 'unassigned'
  );
  const [searchPreview, setSearchPreview] = useState('');
  const [filterChangedOnly, setFilterChangedOnly] = useState(false);
  const [selectedPreviewCategory, setSelectedPreviewCategory] = useState('ALL');

  // Saving state
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number; percentage: number; message: string }>({
    current: 0,
    total: 0,
    percentage: 0,
    message: ''
  });
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');
  const [saveErrorMessage, setSaveErrorMessage] = useState('');

  // Calculate items to target based on scope
  const targetMedicines = useMemo(() => {
    if (scope === 'selected' && selectedMedicineIds.length > 0) {
      const selectedSet = new Set(selectedMedicineIds);
      return medicines.filter(m => selectedSet.has(m.id));
    }
    return medicines;
  }, [medicines, scope, selectedMedicineIds]);

  // Run categorization preview
  const estimationResult = useMemo(() => {
    const onlyUnassigned = scope === 'unassigned';
    const overrideExisting = scope === 'all' || scope === 'selected';

    return batchEstimateCategories(targetMedicines, categories, {
      onlyUncategorized: onlyUnassigned,
      overrideExisting
    });
  }, [targetMedicines, categories, scope]);

  // Filter preview list
  const filteredPreview = useMemo(() => {
    return estimationResult.previewList.filter(item => {
      if (filterChangedOnly && !item.changed) return false;
      if (selectedPreviewCategory !== 'ALL' && item.newCategory !== selectedPreviewCategory) return false;

      if (!searchPreview) return true;
      const q = searchPreview.toLowerCase();
      return (
        item.medicine.name.toLowerCase().includes(q) ||
        (item.medicine.saltName && item.medicine.saltName.toLowerCase().includes(q)) ||
        item.newCategory.toLowerCase().includes(q) ||
        (item.medicine.uses && item.medicine.uses.join(' ').toLowerCase().includes(q))
      );
    });
  }, [estimationResult.previewList, filterChangedOnly, selectedPreviewCategory, searchPreview]);

  // Overall counts
  const unassignedCount = useMemo(() => {
    return medicines.filter(m => !m.category || m.category === 'All Medicines' || m.category === 'Uncategorized').length;
  }, [medicines]);

  if (!isOpen) return null;

  const handleApplyAndSave = async () => {
    setIsProcessing(true);
    setSaveErrorMessage('');
    setSaveSuccessMessage('');

    try {
      // Build updated full list
      const targetMap = new Map<string, Medicine>();
      estimationResult.updatedMedicines.forEach(m => targetMap.set(m.id, m));

      const finalMedicinesList = medicines.map(m => targetMap.get(m.id) || m);

      // Save to Firestore in batches
      const itemsToPersist = estimationResult.updatedMedicines.filter(m => {
        const original = medicines.find(orig => orig.id === m.id);
        return !original || original.category !== m.category;
      });

      if (itemsToPersist.length === 0) {
        setSaveSuccessMessage('All target products already match their estimated categories.');
        setIsProcessing(false);
        return;
      }

      setProgress({
        current: 0,
        total: itemsToPersist.length,
        percentage: 0,
        message: `Starting database sync for ${itemsToPersist.length.toLocaleString()} products...`
      });

      const res = await batchUpdateMedicines(itemsToPersist, (prog) => {
        setProgress(prog);
      });

      if (!res.success) {
        throw new Error(res.error || 'Failed to batch save categories in Firestore.');
      }

      // Update parent state
      onApplyUpdates(finalMedicinesList);
      setSaveSuccessMessage(`🎉 Successfully categorized and updated ${itemsToPersist.length.toLocaleString()} products in database!`);
    } catch (err: any) {
      console.error('Auto-categorization save failed:', err);
      setSaveErrorMessage(`❌ Error saving categories: ${err?.message || String(err)}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                Smart Auto-Categorizer
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  AI & Salt Composition Matching
                </span>
              </h2>
              <p className="text-xs text-gray-500">
                Automatically estimate and assign medical categories to products by analyzing therapeutic uses and active salt formulas.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Summary Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Products In Catalog</div>
              <div className="text-2xl font-black text-gray-900 mt-1">{medicines.length.toLocaleString()}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">Scanned from database & catalog</div>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                Unassigned / Default Category
              </div>
              <div className="text-2xl font-black text-amber-900 mt-1">{unassignedCount.toLocaleString()}</div>
              <div className="text-[11px] text-amber-700 mt-0.5">Need specific category mapping</div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Ready to Auto-Update
              </div>
              <div className="text-2xl font-black text-emerald-900 mt-1">
                {estimationResult.changedCount.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-700 mt-0.5">Estimated with high precision matches</div>
            </div>
          </div>

          {/* Scope Selector */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <div className="text-xs font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wider">
              <Filter className="w-4 h-4 text-emerald-600" />
              Select Products to Categorize:
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setScope('unassigned')}
                disabled={isProcessing}
                className={`flex flex-col text-left p-3.5 rounded-xl border transition-all ${
                  scope === 'unassigned'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-1 ring-emerald-600'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-gray-900">Unassigned Only</span>
                  {scope === 'unassigned' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  Only update medicines currently set to 'All Medicines' or blank ({unassignedCount.toLocaleString()} items).
                </span>
              </button>

              <button
                type="button"
                onClick={() => setScope('all')}
                disabled={isProcessing}
                className={`flex flex-col text-left p-3.5 rounded-xl border transition-all ${
                  scope === 'all'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-1 ring-emerald-600'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-gray-900">Re-Evaluate Entire Catalog</span>
                  {scope === 'all' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  Re-classify all {medicines.length.toLocaleString()} products based on their therapeutic salt & uses.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setScope('selected')}
                disabled={isProcessing || selectedMedicineIds.length === 0}
                className={`flex flex-col text-left p-3.5 rounded-xl border transition-all ${
                  scope === 'selected'
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-1 ring-emerald-600'
                    : selectedMedicineIds.length === 0
                    ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-gray-900">Selected Products Only</span>
                  {scope === 'selected' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {selectedMedicineIds.length > 0 
                    ? `Update only the ${selectedMedicineIds.length} checked rows from the admin table.` 
                    : 'No products currently checked in admin table.'}
                </span>
              </button>
            </div>
          </div>

          {/* Category Distribution Breakdown */}
          <div className="bg-gray-50/80 rounded-xl border border-gray-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-emerald-600" />
                Estimated Category Breakdown ({Object.keys(estimationResult.categoryStats).length} categories detected)
              </div>
              <button
                type="button"
                onClick={() => setSelectedPreviewCategory('ALL')}
                className={`text-xs font-semibold px-2 py-1 rounded-md transition-colors ${
                  selectedPreviewCategory === 'ALL' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Show All Categories
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {(Object.entries(estimationResult.categoryStats) as [string, number][])
                .sort((a, b) => Number(b[1]) - Number(a[1]))
                .map(([catName, count]) => {
                  const isSelected = selectedPreviewCategory === catName;
                  return (
                    <button
                      key={catName}
                      type="button"
                      onClick={() => setSelectedPreviewCategory(isSelected ? 'ALL' : catName)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50'
                      }`}
                    >
                      <span>{catName}</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isSelected ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {count.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Preview Table & Search */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden space-y-0">
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search preview by medicine name, salt formulation, or uses..."
                  value={searchPreview}
                  onChange={(e) => setSearchPreview(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer bg-white px-3 py-2 border border-gray-200 rounded-lg select-none hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={filterChangedOnly}
                    onChange={(e) => setFilterChangedOnly(e.target.checked)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Show only modified ({estimationResult.changedCount.toLocaleString()})</span>
                </label>
                <div className="text-xs text-gray-500 font-mono">
                  Showing {filteredPreview.length.toLocaleString()} of {estimationResult.previewList.length.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto divide-y divide-gray-100">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 sticky top-0 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-3">Medicine & Salt Formulation</th>
                    <th className="p-3">Therapeutic Uses</th>
                    <th className="p-3">Current Category</th>
                    <th className="p-3">Estimated Category</th>
                    <th className="p-3">Match Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {filteredPreview.slice(0, 100).map(({ medicine, oldCategory, newCategory, confidence, reason, changed }) => (
                    <tr key={medicine.id} className={`hover:bg-gray-50/80 ${changed ? 'bg-emerald-50/20' : ''}`}>
                      <td className="p-3 max-w-[220px]">
                        <div className="font-bold text-gray-900">{medicine.name}</div>
                        <div className="text-[10px] text-gray-500 font-mono truncate" title={medicine.saltName}>
                          {medicine.saltName || medicine.genericName || 'No salt specified'}
                        </div>
                      </td>
                      <td className="p-3 max-w-[220px]">
                        <div className="text-gray-600 truncate text-[11px]" title={medicine.uses?.join(', ')}>
                          {medicine.uses && medicine.uses.length > 0 ? medicine.uses.join(', ') : 'No uses specified'}
                        </div>
                      </td>
                      <td className="p-3 text-gray-500 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[11px]">
                          {oldCategory}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                            changed 
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {newCategory}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-bold w-max ${
                            confidence === 'High'
                              ? 'bg-emerald-100 text-emerald-800'
                              : confidence === 'Medium'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {confidence === 'High' && <Sparkles className="w-2.5 h-2.5" />}
                            {confidence} Confidence
                          </span>
                          <span className="text-[9px] text-gray-400 truncate max-w-[130px]" title={reason}>
                            {reason}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredPreview.length === 0 && (
                <div className="p-8 text-center text-gray-400 text-xs">
                  No preview records found matching your filters.
                </div>
              )}
            </div>

            {filteredPreview.length > 100 && (
              <div className="p-2.5 text-center text-[11px] bg-gray-50 text-gray-500 border-t border-gray-100">
                Displaying first 100 preview entries of {filteredPreview.length.toLocaleString()}. All {estimationResult.updatedMedicines.length.toLocaleString()} products will be updated upon saving.
              </div>
            )}
          </div>

          {/* Progress Bar when saving */}
          {isProcessing && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                <span className="flex items-center gap-2">
                  <RotateCw className="w-4 h-4 animate-spin text-emerald-600" />
                  {progress.message || 'Updating categories in database...'}
                </span>
                <span>{progress.percentage}%</span>
              </div>
              <div className="w-full bg-emerald-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Success / Error Messages */}
          {saveSuccessMessage && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{saveSuccessMessage}</span>
            </div>
          )}

          {saveErrorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-900 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{saveErrorMessage}</span>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-gray-400" />
            Updates are saved permanently in Firestore in safe batches of 400 items.
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
            >
              {saveSuccessMessage ? 'Done / Close' : 'Cancel'}
            </button>

            <button
              type="button"
              onClick={handleApplyAndSave}
              disabled={isProcessing || estimationResult.changedCount === 0}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-md shadow-emerald-200"
            >
              {isProcessing ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Saving to Database...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>
                    Apply & Save {estimationResult.changedCount.toLocaleString()} Categories
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
