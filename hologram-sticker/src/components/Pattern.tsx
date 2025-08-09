import React from 'react';
import { useHologram } from './HologramContext';

export interface PatternProps {
  children?: React.ReactNode;
  className?: string;
  imageUrl?: string;
  textureUrl?: string;
  opacity?: number;
  mode?: 'composite' | 'texture-only';
  mixBlendMode?: 'hard-light' | 'multiply';
  textureSize?: string;
}

const Pattern: React.FC<PatternProps> = ({ 
  children, 
  className = '', 
  imageUrl,
  textureUrl = 'https://assets.codepen.io/605876/figma-texture.png',
  opacity = 0.4,
  mode = 'texture-only',
  mixBlendMode = 'multiply',
  textureSize = '4cqi',
  ...props 
}) => {
  const { isActive } = useHologram();
  
  const style = {
    '--pattern-url': imageUrl ? `url(${imageUrl})` : `url(${textureUrl})`,
    '--pattern-opacity': opacity,
    '--pattern-mix-blend-mode': mixBlendMode,
    '--pattern-texture-size': textureSize,
  } as React.CSSProperties;

  return (
    <div
      className={`sticker-pattern ${className} ${isActive ? 'active' : ''}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default Pattern;