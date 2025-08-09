import React from 'react';
import { useHologram } from './HologramContext';

export interface WatermarkProps {
  children?: React.ReactNode;
  className?: string;
  imageUrl?: string;
  opacity?: number;
}

const Watermark: React.FC<WatermarkProps> = ({ 
  children, 
  className = '', 
  imageUrl = 'https://assets.codepen.io/605876/shopify-pattern.svg',
  opacity = 1,
  ...props 
}) => {
  const { isActive } = useHologram();
  
  const style = {
    '--watermark-url': `url(${imageUrl})`,
    '--watermark-opacity': opacity,
  } as React.CSSProperties;

  return (
    <div
      className={`sticker-watermark ${className} ${isActive ? 'active' : ''}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default Watermark;