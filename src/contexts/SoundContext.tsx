"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface SoundContextType {
  soundOn: boolean;
  toggleSound: () => void;
  play: (fn: () => void) => void; // Only plays if soundOn
}

const SoundContext = createContext<SoundContextType>({
  soundOn: true,
  toggleSound: () => {},
  play: () => {},
});

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundOn, setSoundOn] = useState(true);

  const toggleSound = useCallback(() => setSoundOn(s => !s), []);

  const play = useCallback((fn: () => void) => {
    if (soundOn) fn();
  }, [soundOn]);

  return (
    <SoundContext.Provider value={{ soundOn, toggleSound, play }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  return useContext(SoundContext);
}
