import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { PlatformSection } from './components/PlatformSection';
import { ImpactSection } from './components/ImpactSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { InteractiveDemoModal } from './components/InteractiveDemoModal';

export function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white font-sans">
      {/* Top Navbar */}
      <Navbar onRequestDemo={() => setDemoModalOpen(true)} />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero onRequestDemo={() => setDemoModalOpen(true)} />
        <ProblemSection />
        <PlatformSection />
        <ImpactSection />
        <CtaSection
          onRequestDemo={() => setDemoModalOpen(true)}
          onGetInTouch={() => setDemoModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modal */}
      <InteractiveDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}

export default App;
