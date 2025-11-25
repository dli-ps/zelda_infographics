import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { ZeldaGame } from '../../types';

// Static map for stable console images (Wikimedia Commons)
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

interface GameSlideProps {
  game: ZeldaGame;
  maxSales: number;
  index: number;
}


const getAssetUrl = (path: string): string => {
  let apiKey
  try {
    
    apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  } catch(e) {

  }

  // Check if we are running in a browser environment (development/web preview).
  // This check is necessary if the local web server setup (like Remotion's
  // preview server) doesn't resolve static files correctly without an explicit '/assets' prefix,
  // even after staticFile() has resolved the path.
  if (apiKey) {
      // Assuming your Remotion preview environment serves assets from '/assets'
      return `zelda_infographics/${path}`; 
  }

  // In production render or standard Remotion preview, staticFile() is sufficient.
  return path;
};

export const GameSlide: React.FC<GameSlideProps> = ({ game, maxSales, index }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // --- STAGGERED ANIMATIONS ---

  // 1. Platform & Year Badge (Enters first)
  const detailsSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const detailsOpacity = interpolate(detailsSpring, [0, 1], [0, 1]);
  const detailsTranslateX = interpolate(detailsSpring, [0, 1], [-50, 0]);

  // 2. Game Title (Enters second)
  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleTranslateX = interpolate(titleSpring, [0, 1], [-50, 0]);

  // 3. Sales Container (Enters third)
  const salesContainerSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const salesContainerOpacity = interpolate(salesContainerSpring, [0, 1], [0, 1]);
  const salesContainerTranslateY = interpolate(salesContainerSpring, [0, 1], [20, 0]);

  // 4. Sales Counter & Bar (Counts up)
  const salesProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  
  const currentSales = interpolate(salesProgress, [0, 1], [0, game.naSales]);
  const barWidth = interpolate(salesProgress, [0, 1], [0, (game.naSales / maxSales) * 100]);

  // 5. Visuals Entrance (Right Side)
  const visualsEntrance = spring({
      frame,
      fps,
      config: { damping: 14, stiffness: 80 }
  });
  const slideInRight = interpolate(visualsEntrance, [0, 1], [50, 0]);
  const boxArtOpacity = interpolate(visualsEntrance, [0, 1], [0, 1]);

  // Console Image
  const consoleUrl = CONSOLE_IMAGES[game.platform] || CONSOLE_IMAGES['NES']; // Fallback

  return (
    <div className="w-full h-full flex flex-row relative overflow-hidden bg-slate-950 text-white">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black z-0" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#34d399 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* LEFT SIDE: INFO */}
      <div className="w-1/2 h-full p-16 flex flex-col justify-center z-10 relative border-r border-slate-800/50 backdrop-blur-sm bg-slate-900/20">
        
        {/* Platform & Year */}
        <div 
            style={{ 
                opacity: detailsOpacity, 
                transform: `translateX(${detailsTranslateX}px)` 
            }}
            className="flex items-center gap-3 mb-6"
        >
            <span className="bg-yellow-500 text-black px-3 py-1 rounded font-bold font-mono text-lg shadow-lg shadow-yellow-500/20">
                {game.platform}
            </span>
            <span className="text-slate-400 font-mono text-xl border border-slate-700 px-3 py-1 rounded">
                {game.year}
            </span>
        </div>

        {/* Title */}
        <h1 
            style={{ 
                opacity: titleOpacity, 
                transform: `translateX(${titleTranslateX}px)` 
            }}
            className="text-6xl font-bold mb-8 cinzel text-white drop-shadow-xl leading-tight"
        >
            {game.title}
        </h1>

        {/* Sales Section */}
        <div 
            style={{ 
                opacity: salesContainerOpacity, 
                transform: `translateY(${salesContainerTranslateY}px)` 
            }}
            className="mt-8"
        >
            <div className="flex justify-between items-end mb-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm">Units Sold</span>
                <span className="text-5xl font-mono font-bold text-white">
                    {currentSales.toFixed(2)}<span className="text-xl text-slate-500 ml-1">m</span>
                </span>
            </div>
            <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden ring-1 ring-slate-700">
                <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                    style={{ width: `${Math.min(barWidth, 100)}%` }}
                />
            </div>
        </div>
      </div>

      {/* RIGHT SIDE: VISUALS */}
      <div className="w-1/2 h-full relative flex items-center justify-center z-10">
         
         {/* Console Image (Shifted Left) */}
         <div 
            className="absolute bottom-10 left-10 w-[80%] h-[50%] opacity-80 flex items-end justify-start"
            style={{ 
                opacity: interpolate(frame, [10, 30], [0, 0.5]),
                transform: `translateY(${interpolate(frame, [10, 40], [50, 0])}px)`
            }}
         >
            <Img 
                src={consoleUrl} 
                className="object-contain w-full h-full drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] grayscale-[0.3]"
            />
         </div>

         {/* Game Box Art (Shifted Right and Up) */}
         <div className="translate-x-16 -translate-y-36">
            <div 
                className="relative z-20"
                style={{ 
                    opacity: boxArtOpacity, 
                    transform: `scale(${interpolate(visualsEntrance, [0, 1], [0.8, 1])}) rotate(${interpolate(visualsEntrance, [0, 1], [-5, 0])}deg) translateX(${slideInRight}px)` 
                }}
            >
                <div className="w-[400px] bg-slate-800 rounded-lg shadow-2xl shadow-black relative overflow-hidden border border-slate-700 flex items-center justify-center group">
                    {game.boxArtUrl ? (
                        <Img 
                            src={game.boxArtUrl}
                            className="w-full h-auto" 
                            onError={(e: any) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    ) : (
                        // Fallback Placeholder
                        <div className="text-center p-8 w-full aspect-[3/4] flex flex-col items-center justify-center">
                            <div className="text-6xl mb-4">⚔️</div>
                            <div className="cinzel text-yellow-600 font-bold text-xl">{game.title}</div>
                        </div>
                    )}
                    {/* Sheen effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
                </div>
            </div>
         </div>

      </div>
    </div>
  );
};