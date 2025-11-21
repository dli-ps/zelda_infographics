import React, { useEffect, useState } from 'react';
import { Composition, continueRender, delayRender } from 'remotion';
import { MyComposition } from './components/RemotionVideo/Composition';
import { fetchZeldaData } from './services/geminiService';
import { ZeldaGame } from './types';
import './style.css';

export const RemotionRoot: React.FC = () => {
  const [data, setData] = useState<ZeldaGame[]>([]);
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    fetchZeldaData()
      .then((d) => {
        setData(d);
        continueRender(handle);
      })
      .catch((err) => {
        console.error("Error loading data for remotion render:", err);
        continueRender(handle);
      });
  }, [handle]);

  // Constants must match App.tsx / Composition.tsx
  const INTRO_DURATION = 80;
  const SLIDE_DURATION = 100;
  const SUMMARY_DURATION = 150;

  // Calculate duration based on data length
  const durationInFrames =
    data.length > 0
      ? INTRO_DURATION + data.length * SLIDE_DURATION + SUMMARY_DURATION
      : 300;

  return (
    <>
      <Composition
        id="ZeldaSales"
        component={MyComposition}
        durationInFrames={durationInFrames}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          data: data,
        }}
      />
    </>
  );
};