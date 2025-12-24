
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
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Environmental Depth (Grid & Glow) */}
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}></div>

        <div className={`absolute inset-0 transition-colors duration-1000 ${
          isStage1 ? 'bg-[#a3e635]/5' : isStage2 ? 'bg-[#fbbf24]/5' : 'bg-blue-500/5'
        }`}></div>

        {/* Central Sensor Visualization */}
        <div 
          className="relative z-10 transition-all duration-700 ease-out will-change-transform"
          style={{
            transform: `
              perspective(2000px) 
              rotateY(${(scrollProgress - 0.5) * 80}deg) 
              rotateZ(${(scrollProgress - 0.5) * 15}deg)
              scale(${0.8 + scrollProgress * 0.2})
              translateX(${(isStage1 ? -15 : isStage3 ? 15 : 0)}%)
            `
          }}
        >
          <svg width="320" height="580" viewBox="0 0 320 580" fill="none" className="w-auto h-[65vh] drop-shadow-[0_0_100px_rgba(0,0,0,1)]">
            <defs>
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#16a34a" />
                <stop offset="50%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#14532d" />
              </linearGradient>
            </defs>
            {/* Top Cap */}
            <path d="M110 60C110 54.4772 114.477 50 120 50H170C175.523 50 180 54.4772 180 60V150H110V60Z" fill="url(#bodyGrad)" />
            {/* Body */}
            <rect x="110" y="150" width="70" height="110" fill="#16a34a" />
            {/* Lora Antenna Branch */}
            <path d="M180 140L280 80C285 77 292 78 295 83L310 108C313 113 311 120 306 123L206 183L180 140Z" fill="#22c55e" />
            {/* Probe Blade */}
            <rect x="115" y="260" width="60" height="280" rx="30" fill="#0a0a0a" />
            <rect x="135" y="280" width="20" height="220" rx="10" fill="#000" fillOpacity="0.4" />
            
            {/* Scanning Laser Line (Active in Stage 2) */}
            <rect 
              x="115" y="260" width="60" height="2" fill="#fbbf24" 
              className={`transition-opacity duration-300 ${isStage2 ? 'opacity-100' : 'opacity-0'}`}
              style={{ transform: `translateY(${(Math.sin(Date.now() / 200) + 1) * 130}px)` }}
            />
          </svg>

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
