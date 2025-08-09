import React, { createContext, useContext } from 'react';
import { HologramContextType } from './types';

const HologramContext = createContext<HologramContextType | null>(null);

export const useHologram = () => {
  const context = useContext(HologramContext);
  if (!context) {
    throw new Error('Hologram components must be used within HologramSticker.Root');
  }
  return context;
};

export const HologramProvider = HologramContext.Provider;