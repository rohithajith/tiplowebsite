import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#030712] text-slate-400 border-t border-slate-800/80 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Tiplo"
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </div>

          {/* Links & Copyright */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <a href="#problem" className="hover:text-slate-300 transition-colors">
              Problem
            </a>
            <a href="#platform" className="hover:text-slate-300 transition-colors">
              Platform
            </a>
            <a href="#impact" className="hover:text-slate-300 transition-colors">
              Impact
            </a>
            <span>© 2026 Tiplo. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
