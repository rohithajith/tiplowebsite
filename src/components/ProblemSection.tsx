import React from 'react';
import { TrendingDown, Clock, Users, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { SpotlightCard } from './SpotlightCard';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: TrendingDown,
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-200/80',
      spotlight: 'rgba(59, 130, 246, 0.12)',
      borderGlow: 'rgba(59, 130, 246, 0.4)',
      title: 'Adherence Crisis',
      description:
        'Only 30% of MSK patients follow through with home exercises. Non-engaging tools and zero personalisation leave patients unmotivated.',
      metric: '30% Drop-off Rate',
    },
    {
      icon: Clock,
      iconBg: 'bg-purple-50 text-purple-600 border border-purple-200/80',
      spotlight: 'rgba(147, 51, 234, 0.12)',
      borderGlow: 'rgba(147, 51, 234, 0.4)',
      title: "Clinics Can't Scale",
      description:
        'MSK demand outpaces the physio workforce 3:1. Clinics are drowning in waitlists with no way to grow without hiring.',
      metric: '3:1 Demand vs Supply',
    },
    {
      icon: Users,
      iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-200/80',
      spotlight: 'rgba(99, 102, 241, 0.12)',
      borderGlow: 'rgba(99, 102, 241, 0.4)',
      title: 'Corporate Productivity Loss',
      description:
        '$2.7–$3 trillion in global economic losses from MSK-related workplace absence. Employers lack visibility into recovery progress.',
      metric: '$3 Trillion Impact',
    },
    {
      icon: AlertTriangle,
      iconBg: 'bg-red-50 text-red-500 border border-red-200/80',
      spotlight: 'rgba(239, 68, 68, 0.12)',
      borderGlow: 'rgba(239, 68, 68, 0.4)',
      title: 'Insurer Cost Pressure',
      description:
        'Lengthy recoveries mean higher payouts for PMIs. Without remote oversight, unnecessary in-person visits pile up costs.',
      metric: 'Escalating Claims',
    },
  ];

  return (
    <section
      id="problem"
      className="relative py-28 bg-[#f8fafc] text-slate-900 overflow-hidden"
    >
      {/* Soft background grid & subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-b from-[#050b14] to-transparent opacity-10 pointer-events-none" />

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
            THE PROBLEM
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            MSK recovery is{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
              broken
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            The current model fails patients, overwhelms clinics, and bleeds money from insurers and employers.
          </p>
        </motion.div>

        {/* 2x2 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {problems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <SpotlightCard
                  spotlightColor={item.spotlight}
                  borderGlowColor={item.borderGlow}
                  enableTilt={true}
                  className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 h-full flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    {/* Icon & Mini tag */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.iconBg} shadow-sm group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wide text-slate-400 bg-slate-100/80 px-3 py-1 rounded-full">
                        {item.metric}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2.5">
                      <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center gap-2 text-xs font-semibold text-brand-600">
                    <span>Clinical Impact Area</span>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
