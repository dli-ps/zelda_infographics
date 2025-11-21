import React, { useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import { fetchZeldaData } from './services/geminiService';
import { ZeldaGame, AppState } from './types';
import { MyComposition } from './components/RemotionVideo/Composition';

const FPS = 30;

// Timing constants must match Composition.tsx
const INTRO_DURATION = 80;
const SLIDE_DURATION = 100;
const SUMMARY_DURATION = 150; // 5 seconds

const App: React.FC = () => {
  const [data, setData] = useState<ZeldaGame[]>([]);
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setState(AppState.LOADING);
    setError(null);
    try {
      const games = await fetchZeldaData();
      setData(games);
      setState(AppState.READY);
    } catch (err) {
      console.error(err);
      setError("Failed to load Zelda sales data. Please check your API key or try again.");
      setState(AppState.ERROR);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const downloadData = () => {
    if (data.length === 0) return;
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'zelda_sales_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadVideo = () => {
    alert("To download this video as an MP4, you would typically use the `npx remotion render` command in your terminal. This web preview is for visualization only.");
  };

  // Calculate dynamic video duration
  const videoDuration = state === AppState.READY 
    ? INTRO_DURATION + (data.length * SLIDE_DURATION) + SUMMARY_DURATION
    : 300; // Default placeholder duration

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500 selection:text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(234,179,8,0.5)]">
              <span className="text-slate-900 font-bold cinzel text-lg">Z</span>
            </div>
            <span className="font-bold text-xl tracking-tight cinzel text-yellow-500">Hyrule Analytics</span>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-xs font-mono text-slate-500 uppercase border border-slate-700 px-2 py-1 rounded">v1.3.0</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Player */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl relative aspect-video group">
              
              {state === AppState.LOADING && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-900">
                  <div className="w-16 h-16 border-4 border-emerald-900 border-t-emerald-400 rounded-full animate-spin mb-4"></div>
                  <p className="text-emerald-400 font-mono animate-pulse">Consulting the Sheikah Slate...</p>
                  <p className="text-xs text-slate-500 mt-2">Finding artifacts...</p>
                </div>
              )}

              {state === AppState.ERROR && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-900 p-8 text-center">
                   <div className="text-red-500 text-5xl mb-4">⚠️</div>
                   <p className="text-slate-300 mb-4">{error}</p>
                   <button 
                    onClick={loadData}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold transition-colors"
                   >
                     Retry Connection
                   </button>
                </div>
              )}

              {state === AppState.READY && (
                <Player
                  component={MyComposition}
                  inputProps={{ data }}
                  durationInFrames={videoDuration}
                  fps={FPS}
                  compositionWidth={1920}
                  compositionHeight={1080}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  controls
                  autoPlay
                  loop
                />
              )}
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      About This Timeline
                  </h3>
                  <p className="text-slate-400 text-xs md:text-sm mb-2">
                      Visualizing sales history with platform context and box art.
                  </p>
                  <a 
                    href="https://vgsales.fandom.com/wiki/The_Legend_of_Zelda" 
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-500 hover:text-emerald-400 text-xs underline"
                  >
                    Source: vgsales.fandom.com
                  </a>
                </div>
                {state === AppState.READY && (
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={downloadData}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm font-medium transition-colors border border-slate-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Download JSON
                    </button>
                    <button 
                      onClick={downloadVideo}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-sm font-medium transition-colors border border-emerald-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      Download Video
                    </button>
                  </div>
                )}
            </div>
          </div>

          {/* Right Column: Data Table */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-xl border border-slate-800 h-full flex flex-col shadow-lg max-h-[800px]">
              <div className="p-4 border-b border-slate-800 bg-slate-800/30 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-yellow-500 cinzel">Chronicles</h2>
                  <p className="text-xs text-slate-500">Data parsed from Fandom Wiki</p>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-0 custom-scrollbar">
                {state === AppState.READY ? (
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 text-slate-400 sticky top-0 z-10 shadow-sm">
                      <tr>
                        <th className="p-3 font-medium pl-4">Game</th>
                        <th className="p-3 font-medium text-right">Year</th>
                        <th className="p-3 font-medium text-right pr-4">Sales</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {data.map((game, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/50 transition-colors group">
                          <td className="p-3 pl-4">
                            <div className="font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">{game.title}</div>
                            <div className="text-xs text-slate-500 inline-flex items-center gap-2 mt-1">
                                <span className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px] font-mono">{game.platform}</span>
                            </div>
                          </td>
                          <td className="p-3 text-right font-mono text-slate-400">{game.year}</td>
                          <td className="p-3 text-right font-mono text-yellow-500 font-bold pr-4">{game.naSales}m</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center text-slate-600 italic">
                    {state === AppState.LOADING ? "Translating Hylian Text..." : "Waiting for data..."}
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-slate-800 bg-slate-800/30 text-xs text-center text-slate-500">
                 Figures in millions of units.
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;