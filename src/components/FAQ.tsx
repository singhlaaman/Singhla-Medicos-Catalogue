import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQProps {
  faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white border-b border-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs font-bold text-amber-700 uppercase tracking-widest">
            Common Inquiries
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 uppercase tracking-tight">
            Frequently Asked Questions
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm font-medium tracking-wide max-w-xl mx-auto leading-relaxed">
            Got questions about prescription verification, cold storage transport, or how to place order? Find answers below or contact our pharmacist desk.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden transition-all shadow-2xs hover:border-amber-200"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-sans font-bold text-sm text-gray-900 uppercase tracking-wide hover:bg-amber-50/50 transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  <div className="shrink-0 text-gray-500">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Answer body */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-3 border-t border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-medium bg-amber-50/20">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
