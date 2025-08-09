import React, { forwardRef } from 'react';
import { useHologram } from './HologramContext';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  width?: number;
  aspectRatio?: number;
  onFlip?: (flipped: boolean) => void;
}

const Card = forwardRef<HTMLElement, CardProps>(({ 
  children, 
  className = '', 
  width,
  aspectRatio,
  onFlip,
  ...props 
}, ref) => {
  const { 
    isActive, 
    isFlipped, 
    setIsFlipped, 
    isExploded, 
    cardRef 
  } = useHologram();

  const handleFlip = () => {
    if (!isActive || isExploded) return;
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    onFlip?.(newFlipped);
  };

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
      data-flipped={isFlipped}
      {...props}
    >
      <button
        className="sticker-flip-button"
        aria-label="Flip card"
        aria-pressed={isFlipped}
        onClick={handleFlip}
        type="button"
      />
      <div className={`sticker-content ${isFlipped ? 'flipped' : ''}`}>
        {children}
      </div>
    </article>
  );
});

Card.displayName = 'Card';

export default Card;