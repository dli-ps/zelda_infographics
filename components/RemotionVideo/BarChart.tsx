import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Img } from 'remotion';
import { ZeldaGame } from '../../types';

// Reusing console images for the timeline axis
const CONSOLE_IMAGES: Record<string, string> = {
  'NES': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/NES-Console-Set.jpg/640px-NES-Console-Set.jpg',
  'SNES': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/SNES-Mod1-Console-Set.jpg/640px-SNES-Mod1-Console-Set.jpg',
  'GB': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Game-Boy-FL.jpg/480px-Game-Boy-FL.jpg',
  'GBC': 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Game-Boy-Color-Purple.png',
  'N64': 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Nintendo-64DD-docked.jpg',
  'GBA': 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Nintendo-Game-Boy-Advance-Purple-FL.jpg',
  'GC': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/GameCube-Set.jpg/640px-GameCube-Set.jpg',
  'DS': 'https://upload.wikimedia.org/wikipedia/commons/6/6d/DS_Lite_Black.jpg',
  'Wii': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Wii_console.png/640px-Wii_console.png',
  '3DS': 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Nintendo-3DS-AquaOpen.png',
  'Wii U': 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Wii_U_Console_and_Gamepad.png',
  'Switch': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Nintendo_Switch_Console.png/640px-Nintendo_Switch_Console.png',
};

interface BarChartProps {
  data: ZeldaGame[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  data.sort((a, b) => a.year - b.year);
  // Dimensions
  const chartHeight = height * 0.45; // Slightly shorter to make room for images
  const itemWidth = (width * 0.9) / data.length;
  const maxSales = Math.max(...data.map((d) => d.naSales)) * 1.1;

  return (
    <div className="flex flex-row items-end justify-center w-full h-full px-4 pb-32 border-b border-slate-800 mx-auto max-w-[95%]">
      {data.map((game, index) => {
        const delay = index * 3; // Stagger effect
        
        // Animation Springs
        const progress = spring({
          frame: frame - delay,
          fps,
          config: { damping: 15, stiffness: 120 },
        });

        const barHeight = interpolate(progress, [0, 1], [0, (game.naSales / maxSales) * chartHeight], {
          extrapolateRight: 'clamp',
        });

        const opacity = interpolate(progress, [0, 0.5], [0, 1], {
            extrapolateRight: 'clamp'
        });

        const scale = interpolate(progress, [0, 1], [0, 1], {
            extrapolateRight: 'clamp'
        });

        return (
          <div
            key={game.title + index}
            className="flex flex-col items-center justify-end relative group"
            style={{
              width: itemWidth,
              height: '100%', // Occupy full height to align bottom
              margin: '0 1px',
            }}
          >
            {/* Box Art (Floating on top of bar) */}
            <div 
                style={{ 
                    transform: `scale(${scale}) translateY(-10px)`,
                    opacity,
                    marginBottom: '5px'
                }}
                className="relative z-10 transition-transform group-hover:scale-150 group-hover:z-50 origin-bottom"
            >
                <div className="w-12 h-16 md:w-16 md:h-20 bg-slate-800 rounded shadow-lg overflow-hidden border border-slate-600">
                     {game.boxArtUrl && (
                        <Img src={game.boxArtUrl} className="w-full h-full object-cover" />
                     )}
                </div>
                {/* Sales Label popping out of box art */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-yellow-500/30 whitespace-nowrap">
                    {game.naSales}m
                </div>
            </div>

            {/* The Bar */}
            <div
              className="w-3/4 rounded-t-sm bg-gradient-to-t from-emerald-900 via-emerald-600 to-emerald-400 border-t border-emerald-200/50 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
              style={{
                height: barHeight,
                opacity,
              }}
            />

            {/* X-Axis Info */}
            <div 
                style={{ opacity }} 
                className="absolute -bottom-20 flex flex-col items-center w-full"
            >
                {/* Year */}
                <div className="text-[10px] md:text-xs text-slate-400 font-mono mb-1 rotate-0">
                    {game.year}
                </div>
                
                {/* Platform Icon (Small) - Removed Text Badge for cleaner look */}
                 <div className="w-6 h-4 opacity-50 grayscale">
                    {CONSOLE_IMAGES[game.platform] && <Img src={CONSOLE_IMAGES[game.platform]} className="w-full h-full object-contain" />}
                 </div>
            </div>
            
          </div>
        );
      })}
    </div>
  );
};