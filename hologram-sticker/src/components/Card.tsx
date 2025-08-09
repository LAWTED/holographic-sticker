import React, { forwardRef } from 'react';
import { useHologram } from './HologramContext';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  width?: number;
  aspectRatio?: number;
}

const Card = forwardRef<HTMLElement, CardProps>(({ 
  children, 
  className = '', 
  width,
  aspectRatio,
  ...props 
}, ref) => {
  const { 
    isActive, 
    isExploded, 
    cardRef 
  } = useHologram();

  const cardStyle = {
    ...(width && { width: `${width}px` }),
    ...(aspectRatio && { aspectRatio: aspectRatio.toString() }),
  } as React.CSSProperties;

  return (
    <article
      ref={ref || cardRef}
      className={`sticker-card ${className} ${isActive ? 'active' : ''} ${
        isExploded ? 'exploded' : ''
      }`}
      style={cardStyle}
      data-active={isActive}
      {...props}
    >
      <div className="sticker-content">
        {children}
      </div>
    </article>
  );
});

Card.displayName = 'Card';

export default Card;