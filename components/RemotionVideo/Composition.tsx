import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ZeldaGame } from '../../types';
import { BarChart } from './BarChart';
import { GameSlide } from './GameSlide';

interface MyCompositionProps {
  data: ZeldaGame[];
}

// Simple SVG Master Sword Component
const MasterSword = () => (
  <svg viewBox="0 0 100 300" className="w-full h-full drop-shadow-2xl">
    {/* Blade */}
    <path d="M45 260 L50 290 L55 260 L55 80 L45 80 Z" fill="#e2e8f0" />
    <path d="M50 290 L50 80" stroke="#cbd5e1" strokeWidth="1" />
    
    {/* Crossguard (Wings) */}
    <path d="M30 85 Q20 75 20 65 L50 75 L80 65 Q80 75 70 85 L50 95 Z" fill="#3b0764" /> 
    <path d="M30 85 L50 95 L70 85" fill="#4c1d95" />

    {/* Jewel */}
    <circle cx="50" cy="85" r="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />

    {/* Hilt/Grip */}
    <rect x="47" y="50" width="6" height="25" fill="#1e3a8a" rx="1" />
    
    {/* Pommel */}
    <circle cx="50" cy="48" r="3" fill="#94a3b8" />
  </svg>
);

export const MyComposition: React.FC<MyCompositionProps> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Configuration constants
  const INTRO_DURATION = 130; 
  const SLIDE_DURATION = 100;
  
  // --- Intro Animations ---

  // 1. Sword Animation Sequence
  
  // Phase A: Entry (Spinning & Falling to hover point)
  const entrySpring = spring({
    frame,
    fps,
    config: { stiffness: 60, damping: 10 },
  });
  
  // Phase B: Plunge (Quick vertical snap into pedestal)
  // We delay this until after the spin settles
  const plungeStartFrame = 45; 
  const plungeSpring = spring({
    frame: frame - plungeStartFrame,
    fps,
    config: { stiffness: 150, damping: 15, mass: 0.8 }, 
  });

  // Rotation: Only occurs during entry. Stops at 0 before plunge.
  const swordRotate = interpolate(entrySpring, [0, 1], [-1080, 0]); 
  
  // Y Position Strategy:
  // - Start: High up (-1200px)
  // - Hover: Just above pedestal (-100px relative to final)
  // - Final: 0 (Inserted)
  
  const entryY = interpolate(entrySpring, [0, 1], [-1200, -80]); // Falls to -80
  const plungeOffset = interpolate(plungeSpring, [0, 1], [0, 80]); // Adds 80 to reach 0
  
  const swordY = entryY + plungeOffset;
  
  // 2. Impact Shockwave (starts when sword hits pedestal)
  const impactFrame = plungeStartFrame + 5;
  const shockwave = spring({
    frame: frame - impactFrame,
    fps,
    config: { damping: 20 },
  });
  const shockwaveScale = interpolate(shockwave, [0, 1], [0.5, 3]);
  const shockwaveOpacity = interpolate(shockwave, [0, 1], [0.6, 0]);

  // 3. Title Text (Enter after sword lands)
  const titleStartFrame = impactFrame + 10;
  const titleY = spring({ frame: frame - titleStartFrame, fps, from: 50, to: 0, config: { damping: 12 } });
  const titleOpacity = interpolate(frame, [titleStartFrame, titleStartFrame + 20], [0, 1]);
  
  // Exit Intro
  const introExit = interpolate(frame, [INTRO_DURATION - 15, INTRO_DURATION], [1, 0]);
  const introBlur = interpolate(frame, [INTRO_DURATION - 15, INTRO_DURATION], [0, 20]);

  // Calculate Max Sales for scaling individual slides
  const maxSales = Math.max(...data.map(d => d.naSales)) * 1.2;
  const totalSales = data.reduce((acc, curr) => acc + curr.naSales, 0).toFixed(1);

  return (
    <AbsoluteFill className="bg-slate-950 text-white">
      
      {/* Global Background: Zelda-themed Emerald Dots */}
      <AbsoluteFill 
        className="bg-slate-950"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 2px, transparent 2px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0'
        }}
      />
      {/* Vignette */}
      <AbsoluteFill 
        style={{
            background: 'radial-gradient(circle, transparent 40%, #020617 100%)'
        }}
      />

      {/* INTRO SEQUENCE */}
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <AbsoluteFill 
            className="flex items-center justify-center overflow-hidden"
            style={{ opacity: introExit, filter: `blur(${introBlur}px)` }}
        >
            
            {/* --- Central Assembly: Sword & Pedestal --- */}
            {/* Moved upwards slightly (mb-32) to make room for title below */}
            <div className="relative flex items-center justify-center mb-32">
                
                {/* 1. Pedestal (Fixed Position) */}
                <div className="absolute top-[140px] z-0">
                     {/* Stone Block */}
                     <div className="w-48 h-24 bg-slate-800 clip-path-trapezoid mx-auto border-t-4 border-slate-700 shadow-2xl" 
                          style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }} 
                     />
                     {/* Slot Highlight */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-black/50 blur-sm" />
                </div>

                {/* 2. Shockwave (Behind Sword, On top of Pedestal) */}
                <div 
                    className="absolute top-[140px] rounded-full border-2 border-emerald-400/50 bg-emerald-400/10 z-0 pointer-events-none"
                    style={{
                        width: '250px',
                        height: '40px', 
                        transform: `scale(${shockwaveScale})`,
                        opacity: shockwaveOpacity,
                    }}
                />

                {/* 3. The Master Sword */}
                <div 
                    className="relative z-10 w-32 h-96 origin-bottom"
                    style={{ 
                        transform: `translateY(${swordY}px) rotate(${swordRotate}deg)`,
                    }}
                >
                    <MasterSword />
                </div>

            </div>

            {/* --- Title Section (Below Assembly) --- */}
            <div 
                className="absolute bottom-12 w-full text-center z-20" 
                style={{ 
                    opacity: titleOpacity, 
                    transform: `translateY(${titleY}px)` 
                }}
            >
                <div className="mb-4 relative inline-block">
                    {/* Text Shadow/Glow */}
                    <span className="absolute inset-0 blur-md text-yellow-500/50 text-6xl cinzel font-bold tracking-[0.2em]">
                        LEGEND OF ZELDA
                    </span>
                    <span className="text-yellow-500 text-6xl cinzel font-bold tracking-[0.2em] drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] relative">
                        LEGEND OF ZELDA
                    </span>
                </div>
                
                <div className="h-px w-64 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mb-6 shadow-[0_0_10px_#34d399]" />
                
                <div className="bg-black/60 backdrop-blur-sm py-2 px-6 rounded-full inline-block border border-emerald-900/50">
                    <h2 className="text-2xl text-emerald-100 font-light tracking-widest uppercase font-mono">
                        Sales History
                    </h2>
                </div>
                
                <div className="mt-6 text-slate-500 font-mono text-xs opacity-80 tracking-wider">
                    Total Volume: {totalSales} Million Units
                </div>
            </div>
            
             {/* Light Shafts/Atmosphere */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent_60%)] -z-10 pointer-events-none" />
        </AbsoluteFill>
      </Sequence>

      {/* MAIN CONTENT: GAME SLIDES */}
      {data.map((game, index) => (
        <Sequence 
            key={game.title} 
            from={INTRO_DURATION + (index * SLIDE_DURATION)} 
            durationInFrames={SLIDE_DURATION}
        >
            <GameSlide game={game} maxSales={maxSales} index={index} />
        </Sequence>
      ))}

      {/* SUMMARY SEQUENCE */}
      <Sequence from={INTRO_DURATION + (data.length * SLIDE_DURATION)}>
        <AbsoluteFill className="bg-slate-900"
            style={{
                backgroundImage: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 2px, transparent 2px)',
                backgroundSize: '40px 40px',
            }}
        >
            <div className="absolute top-8 left-0 w-full text-center z-20">
                <h2 className="text-4xl text-yellow-500 cinzel font-bold tracking-widest drop-shadow-md">
                    SALES TIMELINE
                </h2>
                <p className="text-slate-400 font-mono text-sm mt-2">Units Sold (Millions) by Release Year</p>
            </div>
            <div className="w-full h-full flex items-center justify-center pt-20 pb-10">
                <BarChart data={data} />
            </div>
             <div className="absolute bottom-4 right-4 text-slate-600 text-[10px] font-mono">
                Data: vgsales.fandom.com | Images: zelda.fandom.com
            </div>
        </AbsoluteFill>
      </Sequence>

    </AbsoluteFill>
  );
};