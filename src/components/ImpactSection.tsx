import React from 'react';
import { Heart, Scale, Zap, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { SpotlightCard } from './SpotlightCard';

export const ImpactSection: React.FC = () => {
  const impactCards = [
    {
      icon: Heart,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50 border-blue-200/80',
      spotlight: 'rgba(59, 130, 246, 0.1)',
      borderGlow: 'rgba(59, 130, 246, 0.4)',
      dotColor: 'bg-blue-500',
      title: 'For Patients',
      benefits: [
        'Engaging, personalised recovery',
        'Faster return to work and life',
        'Dramatically lower treatment costs',
      ],
    },
    {
      icon: Scale,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50 border-purple-200/80',
      spotlight: 'rgba(147, 51, 234, 0.1)',
      borderGlow: 'rgba(147, 51, 234, 0.4)',
      dotColor: 'bg-purple-600',
      title: 'For Clinics',
      benefits: [
        'Scale revenue without hiring',
        'Onboard corporate contracts',
        'Remote oversight saves chair-time',
      ],
    },
    {
      icon: Zap,
      iconColor: 'text-fuchsia-600',
      iconBg: 'bg-fuchsia-50 border-fuchsia-200/80',
      spotlight: 'rgba(217, 70, 239, 0.1)',
      borderGlow: 'rgba(217, 70, 239, 0.4)',
      dotColor: 'bg-fuchsia-600',
      title: 'For Corporates',
      benefits: [
        'Reduce MSK-related absence',
        'Drive workforce productivity',
        'Anonymised recovery insights',
      ],
    },
    {
      icon: Database,
      iconColor: 'text-sky-600',
      iconBg: 'bg-sky-50 border-sky-200/80',
      spotlight: 'rgba(14, 165, 233, 0.1)',
      borderGlow: 'rgba(14, 165, 233, 0.4)',
      dotColor: 'bg-sky-600',
      title: 'For Insurers',
      benefits: [
        'Cut per-patient costs',
        'Fewer unnecessary appointments',
        'Population-level outcome data',
      ],
    },
  ];

  return (
    <section
      id="impact"
      className="relative py-28 bg-[#f8fafc] text-slate-900 overflow-hidden"
    >
      {/* Background subtleties */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-block text-xs sm:text-sm font-bold tracking-widest text-brand-600 uppercase font-sans">
            IMPACT
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everyone wins with{' '}
            <span className="text-brand-500 font-extrabold inline-block">
              Tiplo
            </span>
          </h2>
        </motion.div>

        {/* 4 Cards in 1 row (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <SpotlightCard
                  spotlightColor={card.spotlight}
                  borderGlowColor={card.borderGlow}
                  enableTilt={true}
                  className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 h-full flex flex-col justify-start group"
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${card.iconBg} ${card.iconColor} mb-6 shadow-xs group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-5">
                    {card.title}
                  </h3>

                  {/* Benefits List */}
                  <ul className="space-y-3.5 flex-1">
                    {card.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3">
                        <span
                          className={`w-2 h-2 rounded-full ${card.dotColor} flex-shrink-0 mt-2 group-hover:scale-125 transition-transform duration-200`}
                        />
                        <span className="text-sm text-slate-600 font-medium leading-relaxed">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
