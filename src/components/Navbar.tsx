import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Activity } from 'lucide-react';

interface NavbarProps {
  onRequestDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestDemo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#040914]/85 backdrop-blur-xl border-b border-slate-800/60 shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="Tiplo"
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a
              href="#problem"
              className="hover:text-white transition-colors duration-200 hover:translate-y-[-1px]"
            >
              Problem
            </a>
            <a
              href="#platform"
              className="hover:text-white transition-colors duration-200 hover:translate-y-[-1px]"
            >
              Platform
            </a>
            <a
              href="#impact"
              className="hover:text-white transition-colors duration-200 hover:translate-y-[-1px]"
            >
              Impact
            </a>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://tiplo.rohithajith2405.workers.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 bg-brand-600 rounded-full shadow-md shadow-brand-600/30 hover:bg-brand-500 hover:shadow-brand-500/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              Try Demo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070e1c] border-b border-slate-800 px-6 py-5 space-y-4 animate-in fade-in slide-in-from-top-3">
          <nav className="flex flex-col space-y-3 text-base font-medium text-slate-300">
            <a
              href="#problem"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1 transition-colors"
            >
              Problem
            </a>
            <a
              href="#platform"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1 transition-colors"
            >
              Platform
            </a>
            <a
              href="#impact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1 transition-colors"
            >
              Impact
            </a>
          </nav>
          <div className="pt-2">
            <a
              href="https://tiplo.rohithajith2405.workers.dev/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-brand-600 rounded-full hover:bg-brand-500 shadow-md shadow-brand-600/30"
            >
              Try Demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
