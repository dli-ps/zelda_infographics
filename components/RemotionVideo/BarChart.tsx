import React, { useMemo } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ZeldaGame } from '../../types';

interface BarChartProps {
  data: ZeldaGame[];
}

interface PlatformData {
  name: string;
  sales: number;
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Aggregate data by platform
  const platformData: PlatformData[] = useMemo(() => {
    const salesMap = new Map<string, number>();

    data.forEach((game) => {
      const current = salesMap.get(game.platform) || 0;
      salesMap.set(game.platform, current + game.naSales);
    });

    return Array.from(salesMap.entries())
      .map(([name, sales]) => ({ name, sales }))
      .sort((a, b) => b.sales - a.sales); // Sort descending
  }, [data]);

  // Dimensions
  const chartHeight = height * 0.5;
  const barWidth = (width * 0.85) / platformData.length;
  const maxSales = Math.max(...platformData.map((d) => d.sales)) * 1.1;

  // Render bars
  const bars = platformData.map((platform, index) => {
    // Stagger animation
    const delay = index * 3; 
    
    const progress = spring({
      frame: frame - delay,
      fps,
      config: { damping: 15, stiffness: 120 },
    });

    const barHeight = interpolate(progress, [0, 1], [0, (platform.sales / maxSales) * chartHeight], {
      extrapolateRight: 'clamp',
    });

    const opacity = interpolate(progress, [0, 0.5], [0, 1], {
        extrapolateRight: 'clamp'
    });

    return (
      <div
        key={platform.name}
        className="flex flex-col items-center justify-end group relative"
        style={{
          width: barWidth,
          height: chartHeight,
          margin: '0 4px',
        }}
      >
        {/* Label (Sales Number) */}
        <div 
            style={{ opacity, transform: 'translateY(-5px)' }} 
            className="mb-2 text-sm md:text-lg font-bold text-yellow-400 font-mono"
        >
            {platform.sales.toFixed(1)}
        </div>

        {/* The Bar */}
        <div
          className="w-full rounded-t-md bg-gradient-to-t from-emerald-900 to-emerald-500 border-t border-emerald-300/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          style={{
            height: barHeight,
          }}
        />

        {/* X-Axis Label (Platform Name) */}
        <div 
            style={{ opacity }} 
            className="mt-4 text-sm md:text-base text-slate-300 font-bold font-mono tracking-wider"
        >
          {platform.name}
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-row items-end justify-center w-full h-full px-4 pb-32 border-b border-slate-800 mx-auto max-w-[95%]">
      {bars}
    </div>
  );
};