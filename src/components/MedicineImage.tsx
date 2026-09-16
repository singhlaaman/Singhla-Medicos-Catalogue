import React, { useState } from 'react';
import { ShieldAlert, Snowflake, Pill, Syringe, Layers, Activity } from 'lucide-react';

export function getDirectImageUrl(url: string | undefined): string {
  if (!url) return '';
  const trimmedUrl = url.trim();

  // Match Google Drive file patterns
  // Pattern 1: https://drive.google.com/file/d/FILE_ID/view...
  const driveFileRegex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const driveFileMatch = trimmedUrl.match(driveFileRegex);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveFileMatch[1]}`;
  }

  // Pattern 2: https://drive.google.com/open?id=FILE_ID or similar query param
  const driveIdRegex = /[?&]id=([a-zA-Z0-9_-]+)/;
  const driveIdMatch = trimmedUrl.match(driveIdRegex);
  if (driveIdMatch && driveIdMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveIdMatch[1]}`;
  }

  return trimmedUrl;
}

interface MedicineImageProps {
  brandName: string;
  genericName: string;
  strength: string;
  dosageForm: 'Tablet' | 'Capsule' | 'Injection' | 'Syrup' | 'Cream';
  coldStorage: 'Yes' | 'No';
  className?: string;
  allowZoom?: boolean;
  imageUrl?: string;
  onClick?: () => void;
}

export default function MedicineImage({
  brandName,
  genericName,
  strength,
  dosageForm,
  coldStorage,
  className = '',
  allowZoom = false,
  imageUrl,
  onClick
}: MedicineImageProps) {
  
  // Decide colors based on cold storage and dosage form
  const isOncology = genericName.toLowerCase().endsWith('nib') || genericName.toLowerCase().endsWith('mab') || genericName.toLowerCase().includes('mide');
  const primaryBg = isOncology ? 'from-amber-500 to-yellow-500' : 'from-blue-500 to-indigo-500';
  const badgeColor = isOncology ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-blue-100 text-blue-800 border-blue-200';

  const renderFormIcon = () => {
    switch (dosageForm) {
      case 'Tablet':
        return <Pill className="w-8 h-8 text-slate-700 rotate-45" />;
      case 'Capsule':
        return <Pill className="w-8 h-8 text-emerald-600" />;
      case 'Injection':
        return <Syringe className="w-8 h-8 text-blue-600 -rotate-45" />;
      case 'Syrup':
        return <Activity className="w-8 h-8 text-rose-600" />;
      default:
        return <Layers className="w-8 h-8 text-indigo-600" />;
    }
  };

  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!allowZoom) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2.2)',
    });
  };

  const handleMouseLeave = () => {
    if (!allowZoom) return;
    setZoomStyle({
      transformOrigin: 'center center',
      transform: 'scale(1)',
      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform-origin 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    });
  };

  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 rounded-xl aspect-square flex flex-col justify-between p-4 group select-none ${className} ${allowZoom || onClick ? 'cursor-zoom-in' : ''}`}
    >
      {/* Top Bar with Badges */}
      <div className="flex justify-end items-center z-10">
        {coldStorage === 'Yes' && (
          <span className="inline-flex items-center gap-0.5 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm bg-cyan-100 text-cyan-700 border border-cyan-200 shadow-2xs">
            <Snowflake className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '6s' }} />
            Cold Chain
          </span>
        )}
      </div>

      {/* Main Box Graphic or Real Product Image */}
      <div 
        className="flex-1 flex flex-col items-center justify-center py-2 relative w-full h-full min-h-0 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {imageUrl ? (
          <img
            src={getDirectImageUrl(imageUrl)}
            alt={brandName}
            referrerPolicy="no-referrer"
            className="object-contain max-h-[140px] w-full rounded transition-all duration-100"
            style={zoomStyle}
            onError={(e) => {
              // fallback if the image fails to load or is invalid
              (e.target as any).style.display = 'none';
            }}
          />
        ) : (
          <div style={zoomStyle} className="transition-all duration-100 flex flex-col items-center justify-center w-full h-full">
            {/* Abstract Box Base */}
            <div className="w-32 h-20 bg-white rounded-lg shadow-sm border border-gray-100 p-2.5 flex flex-col justify-between relative overflow-hidden">
              {/* Aesthetic Stripe */}
              <div className={`absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-b ${primaryBg}`} />
              
              <div className="pl-2.5 flex justify-between items-start">
                <div>
                  <div className="font-display font-black text-xs text-gray-900 tracking-tight leading-none line-clamp-1">
                    {brandName}
                  </div>
                  <div className="text-[7px] text-gray-400 font-sans italic mt-0.5 line-clamp-1">
                    {genericName}
                  </div>
                </div>
                {renderFormIcon()}
              </div>

              <div className="pl-2.5 flex justify-between items-end border-t border-gray-50 pt-1">
                <span className="text-[9px] font-bold text-gray-800 bg-gray-100 px-1 py-0.2 rounded-xs">
                  {strength}
                </span>
                <span className="text-[6px] text-gray-400 font-mono">
                  S.M. CERTIFIED
                </span>
              </div>
            </div>

            {/* Shadow Overlay */}
            <div className="w-32 h-2 bg-black/5 rounded-full blur-xs mt-1.5" />
          </div>
        )}
      </div>
    </div>
  );
}
