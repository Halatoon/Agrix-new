
import React, { useEffect, useRef, useState } from 'react';
import { Droplets, ScanFace, Radio, Zap, Activity, Cpu } from 'lucide-react';

const SensorShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let requestRunning = false;
    const handleScroll = () => {
      if (requestRunning) return;
      requestRunning = true;
      requestAnimationFrame(() => {
        if (!containerRef.current) {
          requestRunning = false;
          return;
        }
        const rect = containerRef.current.getBoundingClientRect();
        const totalHeight = rect.height - window.innerHeight;
        const progress = Math.min(Math.max(-rect.top / totalHeight, 0), 1);
        setScrollProgress(progress);
        requestRunning = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stage threshold logic for snappier transitions
  const isStage1 = scrollProgress < 0.33;
  const isStage2 = scrollProgress >= 0.33 && scrollProgress < 0.66;
  const isStage3 = scrollProgress >= 0.66;

  return (
    <section 
      ref={containerRef} 
      id="tech" 
      className="relative h-[300vh] bg-[#0c0c0c] z-10"
    >
      {/* 1. STICKY BACKGROUND HARDWARE LAYER */}
    

  {/* Premium reflection (Apple-ish) */}
  <div
    className="pointer-events-none absolute inset-0 rounded-[2.5rem] opacity-70 mix-blend-screen"
    style={{
      background: `linear-gradient(
        120deg,
        rgba(255,255,255,0.00) 0%,
        rgba(255,255,255,0.10) 35%,
        rgba(255,255,255,0.00) 60%
      )`,
      transform: `translateX(${(scrollProgress - 0.5) * 40}px)`,
      transition: 'transform 120ms linear'
    }}
  />

  {/* Soft glow halo */}
  <div
    className="pointer-events-none absolute -inset-10 blur-3xl opacity-40"
    style={{
      background: isStage1
        ? 'rgba(163,230,53,0.25)'
        : isStage2
        ? 'rgba(251,191,36,0.25)'
        : 'rgba(59,130,246,0.25)',
    }}
  />
</div>
          {/* Orbiting Tech Specs */}
          <div className="absolute top-1/2 -right-32 flex flex-col gap-4">
            <div className="glass-dark border border-white/5 p-4 rounded-2xl flex items-center gap-4 min-w-[180px]">
              <div className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center text-[#a3e635]">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-stone-500 uppercase">Soil Water</p>
                <p className="text-white font-black text-sm">42.8 pF</p>
              </div>
            </div>
            <div className="glass-dark border border-white/5 p-4 rounded-2xl flex items-center gap-4 min-w-[180px]">
              <div className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center text-[#fbbf24]">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-stone-500 uppercase">Power</p>
                <p className="text-white font-black text-sm">Solar + LoRa</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FOREGROUND NARRATIVE CHAPTERS */}
      <div className="relative z-20 container mx-auto px-6 pointer-events-none">
        
        {/* Chapter 1: Smart Irrigation */}
        <div className="h-screen flex items-center justify-end">
          <div className="max-w-md pointer-events-auto bg-[#0c0c0c]/40 p-10 rounded-[3rem] backdrop-blur-md border border-stone-800 transition-all duration-500"
               style={{ opacity: isStage1 ? 1 : 0, transform: `translateX(${isStage1 ? 0 : 50}px)` }}>
            <div className="w-16 h-16 bg-[#a3e635]/10 rounded-2xl flex items-center justify-center text-[#a3e635] mb-8 border border-[#a3e635]/20">
              <Droplets className="w-8 h-8" />
            </div>
            <h4 className="text-4xl font-black text-white mb-6 italic">Precision <br/><span className="text-[#a3e635]">Hydrology.</span></h4>
            <p className="text-stone-400 font-medium text-lg leading-relaxed mb-8">
              Every drop counted. Our sensors measure soil water potential at root level, triggering irrigation systems only when absolutely necessary.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 bg-stone-900/50 p-4 rounded-2xl border border-stone-800">
                <p className="text-[10px] font-black text-stone-500 uppercase mb-1">Water Save</p>
                <p className="text-[#a3e635] font-black text-xl">40%+</p>
              </div>
              <div className="flex-1 bg-stone-900/50 p-4 rounded-2xl border border-stone-800">
                <p className="text-[10px] font-black text-stone-500 uppercase mb-1">Response</p>
                <p className="text-white font-black text-xl">Real-time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter 2: AI Diagnosis */}
        <div className="h-screen flex items-center justify-center">
          <div className="max-w-xl pointer-events-auto text-center bg-[#0c0c0c]/40 p-12 rounded-[3rem] backdrop-blur-md border border-[#fbbf24]/20 transition-all duration-500"
               style={{ opacity: isStage2 ? 1 : 0, transform: `translateY(${isStage2 ? 0 : 50}px)` }}>
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#fbbf24]/10 border border-[#fbbf24]/20 text-[#fbbf24] text-xs font-black uppercase mb-8">
              <ScanFace className="w-4 h-4" /> AI Diagnostics Active
            </div>
            <h4 className="text-5xl font-black text-white mb-6">Cognitive <span className="text-[#fbbf24]">Crop Vision.</span></h4>
            <p className="text-stone-400 font-medium text-xl leading-relaxed max-w-lg mx-auto mb-8">
              Using 500k+ local samples, our computer vision models detect Moroccan-specific pests and nutrient deficiencies in milliseconds.
            </p>
            <div className="grid grid-cols-3 gap-6">
               {['Rust', 'Mites', 'Deficit'].map((pest) => (
                 <div key={pest} className="bg-stone-900/80 p-4 rounded-2xl border border-stone-800">
                    <p className="text-white font-bold">{pest}</p>
                    <p className="text-[10px] text-[#fbbf24] font-black">DETECTION: 99%</p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Chapter 3: Connectivity */}
        <div className="h-screen flex items-center justify-start">
          <div className="max-w-md pointer-events-auto bg-[#0c0c0c]/40 p-10 rounded-[3rem] backdrop-blur-md border border-stone-800 transition-all duration-500"
               style={{ opacity: isStage3 ? 1 : 0, transform: `translateX(${isStage3 ? 0 : -50}px)` }}>
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-8 border border-blue-500/20">
              <Radio className="w-8 h-8" />
            </div>
            <h4 className="text-4xl font-black text-white mb-6">Valley-Wide <br/><span className="text-blue-400">Mesh Net.</span></h4>
            <p className="text-stone-400 font-medium text-lg leading-relaxed mb-8">
              No cellular bars? No problem. Our proprietary LoRaWAN mesh covers up to 15km in remote Moroccan valleys with zero data fees.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-black">
                <span className="text-stone-500 uppercase tracking-widest">Network Coverage</span>
                <span className="text-blue-400">EXTREME RANGE</span>
              </div>
              <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: isStage3 ? '92%' : '0%' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Progress HUD */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`h-1 rounded-full transition-all duration-500 ${
            (i === 0 && isStage1) || (i === 1 && isStage2) || (i === 2 && isStage3) 
            ? 'w-16 bg-white' : 'w-4 bg-stone-800'
          }`}></div>
        ))}
      </div>
    </section>
  );
};

export default SensorShowcase;
