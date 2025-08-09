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
  // 直接显示，无需等待active状态
  return (
    <div
      className={`sticker-spotlight ${className}`}
      style={{ '--spotlight-intensity': intensity } as React.CSSProperties}
      {...props}
    />
  );
};

export default Spotlight;