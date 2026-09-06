import React, { useState } from 'react';
import {
  Smartphone,
  Gamepad2,
  Brain,
  MessageSquare,
  BarChart3,
  ClipboardList,
  Eye,
  Monitor,
  TrendingUp,
  CircleDollarSign,
  UserCheck,
  Building2,
  LineChart,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Play,
  Flame,
  ArrowUpRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpotlightCard } from './SpotlightCard';

export const PlatformSection: React.FC = () => {
  const [activeRepCount, setActiveRepCount] = useState(3);
  const [clinicianFilter, setClinicianFilter] = useState<'all' | 'priority'>('all');

  const pillars = [
    {
      badge: 'FOR PATIENTS',
      badgeColor: 'text-brand-600 bg-brand-50 border-brand-200',
      title: 'An app patients actually want to use',
      subtitle:
        'AI-driven guidance, gamification, and real-time feedback make recovery feel like progress — not a chore.',
      borderColor: 'border-t-4 border-t-brand-500',
      spotlight: 'rgba(59, 130, 246, 0.08)',
      borderGlow: 'rgba(59, 130, 246, 0.3)',
      features: [
        {
          icon: Smartphone,
          text: "Step-by-step exercise instructions using your phone's existing tech",
        },
        {
          icon: Gamepad2,
          text: 'Gamified, psychologically adaptive experience that drives adherence',
        },
        {
          icon: Brain,
          text: 'Real-time AI feedback on movement quality and form',
        },
        {
          icon: MessageSquare,
          text: 'Conversational AI for qualitative reporting and adaptive progression',
        },
        {
          icon: BarChart3,
          text: 'Automated logging of adherence, pain, quality, and psychological drivers',
        },
      ],
      interactiveWidget: (
        <div className="mt-8 p-5 bg-slate-900 rounded-2xl border border-slate-800 text-white shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-300">Live Patient Session</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
              <Flame className="w-3.5 h-3.5" />
              <span>5 Day Streak</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 items-center">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-medium">Current Exercise</span>
              <p className="text-sm font-bold text-white">Eccentric Squats</p>
            </div>

            <div className="space-y-1 text-left sm:text-center">
              <span className="text-[11px] text-slate-400 font-medium">Real-Time Form</span>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                <span>99% Form Score</span>
              </div>
            </div>

            <div className="flex items-center justify-start sm:justify-end gap-2">
              <button
                onClick={() => setActiveRepCount((prev) => (prev < 12 ? prev + 1 : 1))}
                className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-1 shadow-md shadow-brand-600/30"
              >
                <span>Rep {activeRepCount} / 10</span>
                <Play className="w-3 h-3 fill-current" />
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      badge: 'FOR CLINICIANS',
      badgeColor: 'text-purple-600 bg-purple-50 border-purple-200',
      title: 'A command centre for scalable care',
      subtitle:
        'Manage larger caseloads with minimal daily input. See everything that matters — nothing that doesn\'t.',
      borderColor: 'border-t-4 border-t-purple-500',
      spotlight: 'rgba(147, 51, 234, 0.08)',
      borderGlow: 'rgba(147, 51, 234, 0.3)',
      features: [
        {
          icon: ClipboardList,
          text: 'Prescribe and adjust personalised rehab plans with safety constraints',
        },
        {
          icon: Eye,
          text: 'Remote monitoring of progress, adherence, and patient-reported outcomes',
        },
        {
          icon: Monitor,
          text: 'Real-time quantitative movement data and qualitative AI reports',
        },
        {
          icon: TrendingUp,
          text: 'Efficiently manage vastly more patients without additional staff',
        },
      ],
      interactiveWidget: (
        <div className="mt-8 p-5 bg-slate-900 rounded-2xl border border-slate-800 text-white shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-semibold text-slate-300">Triage & Oversight Dashboard</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setClinicianFilter('all')}
                className={`px-2 py-0.5 rounded-md ${
                  clinicianFilter === 'all'
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All (142)
              </button>
              <button
                onClick={() => setClinicianFilter('priority')}
                className={`px-2 py-0.5 rounded-md ${
                  clinicianFilter === 'priority'
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Needs Review (2)
              </button>
            </div>
          </div>

          <div className="pt-3 space-y-2">
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-semibold text-white">ACL Reconstruction (Week 6)</span>
              </div>
              <span className="text-emerald-300 font-medium">Adherence: 94% • ROM Target Met</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-purple-500/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="font-semibold text-white">Rotator Cuff Impingement</span>
              </div>
              <span className="text-purple-300 font-medium">Progression Ready • +15° Flexion</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      badge: 'FOR CORPORATES & INSURERS',
      badgeColor: 'text-sky-600 bg-sky-50 border-sky-200',
      title: 'Measurable ROI from day one',
      subtitle:
        'Anonymised dashboards show adherence, recovery trends, and cost savings at a portfolio level.',
      borderColor: 'border-t-4 border-t-cyan-500',
      spotlight: 'rgba(6, 182, 212, 0.08)',
      borderGlow: 'rgba(6, 182, 212, 0.3)',
      features: [
        {
          icon: CircleDollarSign,
          text: 'Lower insurer payouts by reducing in-person treatment needs',
        },
        {
          icon: UserCheck,
          text: 'Shorter employee recovery times and reduced workplace absence',
        },
        {
          icon: Building2,
          text: 'Anonymised reporting on adherence, recovery trends, and outcomes',
        },
        {
          icon: LineChart,
          text: 'Large-scale deployment across insured populations and workforces',
        },
        {
          icon: ShieldCheck,
          text: 'Building the largest anonymised MSK recovery dataset ever created',
        },
      ],
      interactiveWidget: (
        <div className="mt-8 p-5 bg-slate-900 rounded-2xl border border-slate-800 text-white shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <LineChart className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-300">Portfolio Cost Reduction Engine</span>
            </div>
            <span className="text-xs font-bold text-cyan-300 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
              Avg -42% Claim Costs
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block text-[10px]">Absence Reduction</span>
              <strong className="text-base text-white font-extrabold">-3.4 Weeks</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block text-[10px]">Episode Payout</span>
              <strong className="text-base text-emerald-400 font-extrabold">£780 Saved</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 col-span-2 sm:col-span-1">
              <span className="text-slate-400 block text-[10px]">Patient Adherence</span>
              <strong className="text-base text-cyan-300 font-extrabold">88.6%</strong>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="platform"
      className="relative py-28 bg-[#f1f5f9] text-slate-900 overflow-hidden"
    >
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-20"
        >
          <div className="inline-block text-xs sm:text-sm font-bold tracking-widest text-brand-600 uppercase font-sans">
            THE PLATFORM
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Three pillars.{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent">
              One integrated system.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Tiplo connects patients, clinicians, and stakeholders through a seamless digital ecosystem designed for clinical outcomes.
          </p>
        </motion.div>

        {/* 3 Pillar Stacked Cards */}
        <div className="space-y-10 max-w-5xl mx-auto">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <SpotlightCard
                spotlightColor={pillar.spotlight}
                borderGlowColor={pillar.borderGlow}
                className={`bg-white rounded-3xl p-7 sm:p-10 md:p-12 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] border border-slate-200/90 ${pillar.borderColor} hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.12)] transition-all duration-300`}
              >
                {/* Pillar Header */}
                <div className="space-y-3 mb-8">
                  <span
                    className={`inline-block text-xs font-bold tracking-wider px-3.5 py-1 rounded-full border ${pillar.badgeColor}`}
                  >
                    {pillar.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-3xl">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* Pillar Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
                  {pillar.features.map((feat, fIdx) => {
                    const Icon = feat.icon;
                    return (
                      <div
                        key={fIdx}
                        className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all duration-200 group hover:translate-x-1"
                      >
                        <div className="p-2.5 rounded-xl bg-slate-100 text-brand-600 flex-shrink-0 border border-slate-200/60 shadow-xs group-hover:scale-110 group-hover:bg-brand-50 transition-all">
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className="text-sm sm:text-base text-slate-700 leading-snug font-medium pt-1">
                          {feat.text}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Interactive live preview widget */}
                {pillar.interactiveWidget}
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
