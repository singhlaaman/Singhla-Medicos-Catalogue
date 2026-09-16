import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Patient Trust First
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 uppercase tracking-tight">
              Patient & Doctor Testimonials
            </h3>
            <p className="text-gray-500 text-xs font-medium tracking-wide leading-relaxed">
              Read how our rapid response, cold chain integrity, and honest pricing have helped thousands of families navigate critical illnesses.
            </p>
          </div>

          {/* Google Summary Badge */}
          <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-2xl flex items-center gap-4 shrink-0 shadow-2xs">
            <div className="text-center">
              <div className="font-display font-bold text-2xl text-gray-900">4.9</div>
              <div className="text-[9px] uppercase font-bold text-amber-800 tracking-wider">Out of 5</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                Based on 230+ Google Reviews
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50/40 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-xs transition-all"
            >
              <div className="space-y-3">
                {/* Stars Row */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {/* Review Text */}
                <p className="text-xs text-gray-600 leading-relaxed font-sans font-medium italic">
                  "{t.text}"
                </p>
              </div>

              {/* Reviewer Meta */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                <div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider">{t.date}</div>
                </div>

                {t.verified && (
                  <span className="inline-flex items-center gap-1 text-[8px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
