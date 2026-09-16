// import React from 'react';

// interface LogoProps {
//   className?: string;
//   iconOnly?: boolean;
//   darkBg?: boolean;
// }

// export default function Logo({ className = 'h-10', iconOnly = false, darkBg = false }: LogoProps) {
//   return (
//     <div className={`flex items-center gap-3 ${className}`}>
//       {/* Sleek Simple "S" Brandmark Badge */}
//       <div className="relative flex items-center justify-center w-10 h-10 rounded-[6px] bg-primary-yellow text-black font-display font-black text-xl shadow-xs shrink-0 select-none transition-transform">
//         S
//         <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white font-bold border border-white">
//           ✓
//         </span>
//       </div>

//       {!iconOnly && (
//         <div className="flex flex-col justify-center select-none">
//           <div className="flex items-center gap-1.5">
//             <span className={`font-display font-black text-lg sm:text-xl uppercase tracking-tighter leading-none ${darkBg ? 'text-white' : 'text-dark-grey'}`}>
//               Singhla
//             </span>
//             <span className="font-display font-black text-lg sm:text-xl text-primary-yellow uppercase tracking-tighter leading-none">
//               Medicos
//             </span>
//           </div>
//           <span className="text-[9px] sm:text-[10px] text-gray-500 font-sans font-bold uppercase tracking-wider mt-0.5 leading-none">
//             Super Speciality Pharmacy
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }
import React from 'react';
// Adjust this path based on where you placed the file relative to this component
import logoImage from '../assets/SM_Logo.png';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  darkBg?: boolean;
}

export default function Logo({ className = '', iconOnly = false, darkBg = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      
      {/* Replaced the CSS badge with the actual image file */}
      <img 
        src={logoImage} 
        alt="Singhla Medicos Logo" 
        className="w-20 h-20 object-contain shrink-0 select-none transition-transform"
      />

      {!iconOnly && (
        <div className="flex flex-col justify-center select-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-display font-black text-lg sm:text-xl uppercase tracking-tighter leading-none ${darkBg ? 'text-white' : 'text-dark-grey'}`}>
              Singhla
            </span>
            <span className="font-display font-black text-lg sm:text-xl text-primary-yellow uppercase tracking-tighter leading-none">
              Medicos
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] text-gray-500 font-sans font-bold uppercase tracking-wider mt-0.5 leading-none">
            Super Speciality Pharmacy
          </span>
        </div>
      )}
    </div>
  );
}
