import React from 'react';
import { Award, ShieldCheck, Ribbon, Snowflake, Truck, Headphones } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Award className="w-5 h-5 text-amber-900" />,
      title: '25+ Years Experience',
      description: 'Serving oncology patients and speciality medical requirements with unbroken integrity and trusted pharmaceutical expertise since 2001.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-900" />,
      title: '100% Genuine Medicines',
      description: 'Every medicine in our inventory is backed by complete traceability, sourced directly from certified original manufacturers with official tax invoices.'
    },
    {
      icon: <Ribbon className="w-5 h-5 text-amber-900" />,
      title: 'Cancer Specialists',
      description: 'Extensive inventory of life-saving cancer drugs. We stock hard-to-find targeted therapy inhibitors, monoclonal antibodies, and biologics.'
    },
    {
      icon: <Snowflake className="w-5 h-5 text-amber-900" />,
      title: 'Cold Chain Management',
      description: 'Medical-grade cold-storage boxes and constant backup generators preserve critical injections at a flawless 2°C–8°C from dispatch to doorstep.'
    },
    {
      icon: <Truck className="w-5 h-5 text-amber-900" />,
      title: 'PAN India Delivery',
      description: 'Partnered with fast-priority medical couriers and air cargo. We ship safely to major cities, districts, and rural addresses across the nation.'
    },
    {
      icon: <Headphones className="w-5 h-5 text-amber-900" />,
      title: 'Expert Support',
      description: 'Consult our qualified, friendly pharmacists on WhatsApp or Phone to verify salt substitutions, storage conditions, and dosage guidelines.'
    }
  ];

  return (
    <section className="bg-white border-b border-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-bold text-amber-700 uppercase tracking-widest">
            Uncompromising Standards
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 uppercase tracking-tight">
            Why Choose Singhla Medicos?
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm font-medium tracking-wide max-w-xl mx-auto leading-relaxed">
            We are more than a pharmacy; we are a dedicated lifecare partner, ensuring that specialized, affordable medicines reach you when every second matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50/50 hover:bg-amber-50/40 p-6 rounded-2xl border border-gray-100/80 hover:border-amber-200 transition-all flex items-start gap-4 text-left group shadow-2xs hover:shadow-xs"
            >
              <div className="w-11 h-11 rounded-xl bg-primary-yellow flex items-center justify-center shrink-0 group-hover:scale-105 transition-all shadow-2xs">
                {React.cloneElement(item.icon, { className: 'w-5 h-5 text-gray-900' })}
              </div>
              <div className="space-y-1.5">
                <h4 className="font-display font-bold text-sm sm:text-base text-gray-900 uppercase tracking-tight leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-sans font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
