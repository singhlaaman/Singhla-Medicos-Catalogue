import React from 'react';
import * as Icons from 'lucide-react';
import { Category, Medicine } from '../types';

interface CategoriesProps {
  categories: Category[];
  medicines: Medicine[];
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
}

export default function Categories({
  categories,
  medicines,
  selectedCategory,
  onSelectCategory
}: CategoriesProps) {
  
  // Calculate medicine counts dynamically per category
  const getCategoryCount = (categoryName: string) => {
    if (categoryName === 'All Medicines') {
      return medicines.length;
    }
    return medicines.filter((med) => med.category === categoryName).length;
  };

  // Helper to render Lucide Icons dynamically
  const renderIcon = (iconName: string, className: string) => {
    // Falls back to Database if icon name doesn't match
    const IconComponent = (Icons as any)[iconName] || Icons.Database;
    return <IconComponent className={className} />;
  };

  // Helper to get beautiful, vibrant color schemes for unselected categories
  const getCategoryColor = (categoryName: string) => {
    switch (categoryName) {
      case 'Cancer Medicines':
        return {
          bg: 'bg-rose-50',
          border: 'border-rose-200 group-hover:border-rose-400',
          text: 'text-rose-600',
          hoverBg: 'group-hover:bg-rose-100'
        };
      case 'Heart Medicines':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200 group-hover:border-red-400',
          text: 'text-red-600',
          hoverBg: 'group-hover:bg-red-100'
        };
      case 'Diabetes Medicines':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200 group-hover:border-orange-400',
          text: 'text-orange-600',
          hoverBg: 'group-hover:bg-orange-100'
        };
      case 'Kidney Medicines':
        return {
          bg: 'bg-indigo-50',
          border: 'border-indigo-200 group-hover:border-indigo-400',
          text: 'text-indigo-600',
          hoverBg: 'group-hover:bg-indigo-100'
        };
      case 'Liver Medicines':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200 group-hover:border-emerald-400',
          text: 'text-emerald-600',
          hoverBg: 'group-hover:bg-emerald-100'
        };
      case 'Neurology Medicines':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200 group-hover:border-purple-400',
          text: 'text-purple-600',
          hoverBg: 'group-hover:bg-purple-100'
        };
      case 'Gastro Medicines':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200 group-hover:border-amber-400',
          text: 'text-amber-600',
          hoverBg: 'group-hover:bg-amber-100'
        };
      case 'Respiratory Medicines':
        return {
          bg: 'bg-sky-50',
          border: 'border-sky-200 group-hover:border-sky-400',
          text: 'text-sky-600',
          hoverBg: 'group-hover:bg-sky-100'
        };
      case 'Dermatology Medicines':
        return {
          bg: 'bg-fuchsia-50',
          border: 'border-fuchsia-200 group-hover:border-fuchsia-400',
          text: 'text-fuchsia-600',
          hoverBg: 'group-hover:bg-fuchsia-100'
        };
      case 'Antibiotics':
        return {
          bg: 'bg-rose-50/60',
          border: 'border-rose-300 group-hover:border-rose-400',
          text: 'text-rose-700',
          hoverBg: 'group-hover:bg-rose-100'
        };
      case 'Pain Relief':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200 group-hover:border-yellow-400',
          text: 'text-yellow-600',
          hoverBg: 'group-hover:bg-yellow-100'
        };
      case 'Hormonal Medicines':
        return {
          bg: 'bg-teal-50',
          border: 'border-teal-200 group-hover:border-teal-400',
          text: 'text-teal-600',
          hoverBg: 'group-hover:bg-teal-100'
        };
      case 'Vaccines':
        return {
          bg: 'bg-emerald-50/60',
          border: 'border-emerald-300 group-hover:border-emerald-400',
          text: 'text-emerald-700',
          hoverBg: 'group-hover:bg-emerald-100'
        };
      case 'Vitamins & Supplements':
        return {
          bg: 'bg-lime-50',
          border: 'border-lime-200 group-hover:border-lime-400',
          text: 'text-lime-600',
          hoverBg: 'group-hover:bg-lime-100'
        };
      case 'Surgical Products':
        return {
          bg: 'bg-slate-50',
          border: 'border-slate-200 group-hover:border-slate-400',
          text: 'text-slate-600',
          hoverBg: 'group-hover:bg-slate-100'
        };
      case 'Medical Devices':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200 group-hover:border-blue-400',
          text: 'text-blue-600',
          hoverBg: 'group-hover:bg-blue-100'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200 group-hover:border-gray-400',
          text: 'text-dark-grey',
          hoverBg: 'group-hover:bg-primary-yellow/10'
        };
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h3 className="font-display font-black text-2xl sm:text-3xl text-dark-grey uppercase tracking-tighter">
          Browse by Speciality
        </h3>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
          Select a category to view specialty drugs, generic chemical alternatives, and specific storage instructions.
        </p>
      </div>

      {/* Grid Layout of Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
        {categories.map((cat) => {
          const count = getCategoryCount(cat.name);
          const isSelected = selectedCategory === cat.name || (cat.name === 'All Medicines' && selectedCategory === null);
          const colors = getCategoryColor(cat.name);
          
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name === 'All Medicines' ? null : cat.name)}
              className={`flex flex-col items-center p-5 rounded-2xl text-center transition-all cursor-pointer group select-none ${
                isSelected
                  ? 'bg-primary-yellow text-gray-900 shadow-md ring-2 ring-amber-400/40 font-bold scale-[1.02]'
                  : 'bg-white border border-gray-100 hover:border-amber-200 hover:bg-amber-50/40 text-gray-800 shadow-xs hover:shadow-sm'
              }`}
            >
              {/* Icon Container */}
              <div
                className={`flex items-center justify-center w-11 h-11 rounded-xl mb-3 transition-all group-hover:scale-105 ${
                  isSelected
                    ? 'bg-gray-900 text-primary-yellow'
                    : `${colors.bg} ${colors.text}`
                }`}
              >
                {renderIcon(cat.iconName, 'w-5 h-5')}
              </div>

              {/* Category Name */}
              <h4 className="font-sans font-bold text-xs uppercase tracking-wide line-clamp-1">
                {cat.name}
              </h4>

              {/* Count Indicator */}
              <span
                className={`text-[10px] font-semibold uppercase mt-1.5 px-2.5 py-0.5 rounded-full ${
                  isSelected 
                    ? 'bg-black/10 text-gray-900' 
                    : 'bg-gray-100/80 text-gray-500 group-hover:bg-amber-100 group-hover:text-amber-900'
                }`}
              >
                {count} {count === 1 ? 'Item' : 'Items'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
