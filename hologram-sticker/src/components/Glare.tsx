import React from 'react';
import { useHologram } from './HologramContext';

export interface GlareProps {
  className?: string;
  animate?: boolean;
}

const Glare: React.FC<GlareProps> = ({ 
  className = '', 
  animate = true, 
  ...props 
}) => {
  const { isActive, showGlare } = useHologram();

  if (!showGlare && animate) return null;

  return (
    <div className={`sticker-glare-container ${className}`} {...props}>
      <div
        className={`sticker-glare ${animate && !isActive ? 'animate' : ''}`}
      />
    </div>
  );
};

export default Glare;