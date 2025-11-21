import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ZeldaGame } from '../../types';

interface BarChartProps {
  data: ZeldaGame[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Dimensions
  const chartHeight = height * 0.5;
  const barWidth = (width * 0.85) / data.length;
  const maxSales = Math.max(...data.map((d) => d.naSales)) * 1.1;

  // Render bars
  const bars = data.map((game, index) => {
    // Faster stagger for summary view
    const delay = index * 2; 
    
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

    return (
      <div
        key={game.title + index}
        className="flex flex-col items-center justify-end group relative"
        style={{
          width: barWidth,
          height: chartHeight,
          margin: '0 2px', // tighter margin
        }}
      >
        {/* Label (Sales Number) - Vertical if space is tight */}
        <div 
            style={{ opacity, transform: 'translateY(-5px)' }} 
            className="mb-1 text-[10px] md:text-sm font-bold text-yellow-400 font-mono rotate-0"
        >
            {game.naSales >= 1 ? Math.round(game.naSales) : ''}
        </div>

        {/* The Bar */}
        <div
          className="w-full rounded-t-sm bg-gradient-to-t from-emerald-900 to-emerald-500 border-t border-emerald-300/30"
          style={{
            height: barHeight,
          }}
        />

        {/* X-Axis Label (Year) */}
        <div 
            style={{ opacity }} 
            className="mt-2 text-[10px] text-slate-500 font-semibold -rotate-90 origin-top-left translate-y-4 translate-x-2 whitespace-nowrap"
        >
          {game.title.length > 10 ? game.title.substring(0,8)+'..' : game.title}
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-row items-end justify-center w-full h-full px-4 pb-40 border-b border-slate-800 mx-auto max-w-[90%]">
      {bars}
    </div>
  );
};
