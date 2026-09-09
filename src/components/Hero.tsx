import React from 'react';
import { ArrowRight, Sparkles, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroCanvas } from './HeroCanvas';
import { AnimatedCounter } from './AnimatedCounter';

interface HeroProps {
  onRequestDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestDemo }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-between">
      {/* Full-screen Background Anatomy Glow Photo */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-0">
        <img
          src="/hero-bg.jpg"
          alt="Anatomical AI visualization"
          className="w-full h-full object-cover object-center lg:object-[center_30%] opacity-80 sm:opacity-85 mix-blend-lighten filter brightness-105 contrast-120 saturate-125 drop-shadow-[0_0_100px_rgba(56,189,248,0.5)]"
        />
        {/* Balanced edge blending for crisp text contrast without hiding the glowing figure */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/88 via-[#030712]/30 to-[#030712]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/65" />
      </div>

      {/* Dynamic Background Glowing Orbs to amplify neon lighting */}
      <div className="absolute top-1/4 right-1/4 w-[750px] h-[550px] bg-gradient-to-tr from-brand-500/30 via-purple-600/25 to-cyan-400/25 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-indigo-600/20 blur-[130px] pointer-events-none rounded-full animate-pulse-slow" />

      {/* Cyber Grid Subtle Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4"
        >
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 space-y-7 text-left z-20">
            {/* Pill Tag */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-950/80 border border-brand-500/30 text-xs font-semibold text-brand-300 shadow-inner shadow-brand-500/20 backdrop-blur-md hover:border-brand-400 transition-colors">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse shadow-[0_0_8px_#38bdf8]"></span>
                <span>Digital Physiotherapy Platform</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.1rem] font-extrabold tracking-tight text-white leading-[1.12]"
            >
              Recovery that{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent underline decoration-indigo-500/30 underline-offset-8">
                works
              </span>{' '}
              because patients{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 bg-clip-text text-transparent">
                engage
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl"
            >
              Tiplo transforms musculoskeletal rehabilitation with AI-driven guidance, gamification, and real-time clinical oversight — cutting recovery times and skyrocketing patient adherence from 30% to exceptional.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://tiplo.rohithajith2405.workers.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-brand-600 rounded-2xl shadow-xl shadow-brand-600/30 hover:bg-brand-500 hover:shadow-brand-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden"
              >
                {/* Shimmer light sweep on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <span>Try Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#problem"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 rounded-2xl backdrop-blur-md hover:text-white transition-all duration-200 hover:border-slate-600"
              >
                Learn More
              </a>
            </motion.div>
          </div>

          {/* Right Column: Holographic 3D Anatomical Visual Canvas with Image Backdrop */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] sm:min-h-[540px]"
          >
            <HeroCanvas />
          </motion.div>
        </motion.div>

        {/* Stats Glassmorphism Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 sm:mt-24"
        >
          <div className="relative rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-700/40 backdrop-blur-2xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-black/40 overflow-hidden">
            {/* Ambient top inner glow line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-brand-400/50 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
              {/* Stat 1 */}
              <div className="space-y-2">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-400 tracking-tight font-sans">
                  <AnimatedCounter prefix="£" value={23} suffix="Bn" duration={2} />
                </div>
                <p className="text-xs sm:text-sm text-slate-400 font-medium leading-snug">
                  Lost UK economic value in 2025 from MSK absence
                </p>
              </div>

              {/* Stat 2 */}
              <div className="space-y-2 sm:pl-6 pt-4 sm:pt-0">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-400 tracking-tight font-sans">
                  <AnimatedCounter value={52} suffix="%" duration={2} />
                </div>
                <p className="text-xs sm:text-sm text-slate-400 font-medium leading-snug">
                  Of all UK work absences caused by MSK issues
                </p>
              </div>

              {/* Stat 3 */}
              <div className="space-y-2 sm:pl-6 pt-4 sm:pt-0">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-400 tracking-tight font-sans">
                  <AnimatedCounter value={30} suffix="%" duration={2} />
                </div>
                <p className="text-xs sm:text-sm text-slate-400 font-medium leading-snug">
                  Current patient adherence outside the clinic
                </p>
              </div>

              {/* Stat 4 */}
              <div className="space-y-2 sm:pl-6 pt-4 sm:pt-0">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-400 tracking-tight font-sans">
                  3:1
                </div>
                <p className="text-xs sm:text-sm text-slate-400 font-medium leading-snug">
                  MSK demand vs. physio supply ratio
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
