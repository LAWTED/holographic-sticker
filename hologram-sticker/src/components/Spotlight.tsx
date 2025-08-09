import React from 'react';
import { useHologram } from './HologramContext';

export interface SpotlightProps {
  className?: string;
  intensity?: number;
}

const Spotlight: React.FC<SpotlightProps> = ({ 
  className = '', 
  intensity = 1,
  ...props 
}) => {
  const { isActive } = useHologram();

  return (
    <div
      className={`sticker-spotlight ${className} ${isActive ? 'active' : ''}`}
      style={{ '--spotlight-intensity': intensity } as React.CSSProperties}
      {...props}
    />
  );
};

export default Spotlight;