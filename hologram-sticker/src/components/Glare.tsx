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
  // Glare动画独立运行，不依赖isActive状态
  if (!animate) return null;

  return (
    <div className={`sticker-glare-container ${className}`} {...props}>
      <div className="sticker-glare animate" />
    </div>
  );
};

export default Glare;