import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ZeldaGame } from '../../types';
import { BarChart } from './BarChart';
import { GameSlide } from './GameSlide';

interface MyCompositionProps {
  data: ZeldaGame[];
}

export const MyComposition: React.FC<MyCompositionProps> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Configuration constants
  const INTRO_DURATION = 80;
  const SLIDE_DURATION = 100;
  
  // Intro Animations
  const titleY = spring({ frame, fps, from: -50, to: 0, config: { damping: 12 } });
  const titleOpacity = interpolate(frame, [0, 30], [0, 1]);
  const introExit = interpolate(frame, [INTRO_DURATION - 15, INTRO_DURATION], [1, 0]);

  // Calculate Max Sales for scaling
  const maxSales = Math.max(...data.map(d => d.naSales)) * 1.2;
  const totalSales = data.reduce((acc, curr) => acc + curr.naSales, 0).toFixed(1);

  return (
    <AbsoluteFill className="bg-slate-950 text-white">
      
      {/* Global Background Overlay (Scanlines/Noise) */}
      <AbsoluteFill className="opacity-[0.03] pointer-events-none bg-white" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 50%, #000 50%)',
          backgroundSize: '100% 4px'
      }}/>

      {/* INTRO SEQUENCE */}
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <AbsoluteFill className="flex items-center justify-center bg-slate-950">
            <div 
                className="text-center z-10" 
                style={{ opacity: titleOpacity * introExit, transform: `translateY(${titleY}px)` }}
            >
                <div className="mb-4">
                    <span className="text-yellow-500 text-6xl cinzel font-bold tracking-[0.2em] drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                        LEGEND OF ZELDA
                    </span>
                </div>
                <div className="h-px w-64 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mb-6" />
                <h2 className="text-3xl text-emerald-100 font-light tracking-widest uppercase mb-8 font-mono">
                    Sales History
                </h2>
                <div className="text-slate-500 font-mono text-sm">
                    Total Volume: {totalSales} Million Units
                </div>
                <div className="text-slate-600 text-[10px] font-mono mt-12">
                    Source: vgsales.fandom.com/wiki/The_Legend_of_Zelda
                </div>
            </div>
             {/* Intro BG particles or glowing orb could go here */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950 -z-10" />
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
        <AbsoluteFill className="bg-slate-900">
            <div className="absolute top-8 left-0 w-full text-center z-20">
                <h2 className="text-4xl text-yellow-500 cinzel font-bold tracking-widest drop-shadow-md">
                    SERIES OVERVIEW
                </h2>
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
