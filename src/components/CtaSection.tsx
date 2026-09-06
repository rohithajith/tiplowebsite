import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface CtaSectionProps {
  onRequestDemo: () => void;
  onGetInTouch: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onRequestDemo,
  onGetInTouch,
}) => {
  return (
    <section className="relative py-32 bg-[#050b14] text-white overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[420px] bg-gradient-to-tr from-brand-600/20 via-purple-600/20 to-transparent blur-[140px] pointer-events-none rounded-full animate-pulse-slow" />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Ready to transform{' '}
            <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
              MSK
            </span>{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
              recovery
            </span>
            ?
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Whether you're a clinic, insurer, or employer — Tiplo makes physiotherapy scalable, engaging, and measurable.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="https://tiplo.rohithajith2405.workers.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-brand-600 rounded-2xl shadow-xl shadow-brand-600/30 hover:bg-brand-500 hover:shadow-brand-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden"
            >
              {/* Shimmer sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <span>Try Demo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="mailto:adam@tiplo.ai?subject=Tiplo%20Inquiry"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/70 rounded-2xl backdrop-blur-md hover:text-white transition-all duration-200 hover:border-slate-500"
            >
              <Mail className="w-4 h-4 text-slate-400" />
              <span>Get in Touch</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
