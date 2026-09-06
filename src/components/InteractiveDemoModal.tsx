import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Building, User, Stethoscope, ArrowRight, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

interface InteractiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveDemoModal: React.FC<InteractiveDemoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [role, setRole] = useState<'clinic' | 'insurer' | 'patient'>('clinic');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const targetRecipient = 'adam@tiplo.ai';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2b98ff', '#8b5cf6', '#06b6d4', '#157cfa'],
      });
    } catch (err) {
      // ignore
    }

    // Trigger email client directly to adam@tiplo.ai
    const roleLabels = {
      clinic: 'Clinician / NHS',
      insurer: 'Insurer / Corporate',
      patient: 'Patient / User',
    };
    const subject = encodeURIComponent(`Tiplo Demo Request - ${name || 'Inquiry'}`);
    const body = encodeURIComponent(
      `Hello Adam,\n\nI would like to request a Tiplo demo with the following details:\n\nName: ${name}\nEmail: ${email}\nOrganization: ${organization}\nInterest: ${roleLabels[role]}\n\nLooking forward to connecting!`
    );

    // Open mailto link
    window.location.href = `mailto:${targetRecipient}?subject=${subject}&body=${body}`;
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setOrganization('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={handleResetAndClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-[#0b1324] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-brand-500/10 text-white z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Experience Tiplo</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Request a Demo
              </h3>
              <p className="text-sm text-slate-300">
                Connect directly with <strong className="text-brand-300 font-semibold">{targetRecipient}</strong> to schedule a clinical demo and walkthrough.
              </p>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                I am interested as a:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('clinic')}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                    role === 'clinic'
                      ? 'border-brand-500 bg-brand-500/20 text-brand-300'
                      : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Clinician / NHS</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('insurer')}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                    role === 'insurer'
                      ? 'border-brand-500 bg-brand-500/20 text-brand-300'
                      : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>Insurer / Corp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('patient')}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                    role === 'patient'
                      ? 'border-brand-500 bg-brand-500/20 text-brand-300'
                      : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Patient / User</span>
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Sarah Jenkins"
                  className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@healthclinic.co.uk"
                  className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Clinic / Organization Name
                </label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="London MSK & Physio Group"
                  className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all mt-6"
              >
                <span>Send Demo Request to {targetRecipient}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <a
                  href={`mailto:${targetRecipient}?subject=Tiplo%20Demo%20Request`}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-300 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Or email directly: {targetRecipient}</span>
                </a>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-brand-500/20 text-brand-400 border border-brand-500/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Demo Request Sent!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="text-white font-semibold">{name}</span>. Your request has been directed to <span className="text-brand-300 font-semibold">{targetRecipient}</span>. We will follow up with you shortly.
            </p>
            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
