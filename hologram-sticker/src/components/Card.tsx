import React, { forwardRef } from 'react';
import { useHologram } from './HologramContext';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** 
   * Card width in pixels. Defaults to 260px (via CSS variable --sticker-card-width)
   */
  width?: number;
  /** 
   * Card aspect ratio (width/height). Defaults to 5/7 (0.714) - classic card proportions
   */
  aspectRatio?: number;
}

/**
 * Holographic sticker card component with default dimensions (260px × 364px, 5:7 ratio).
 * Provides a container for holographic layers and effects.
 */
const Card = forwardRef<HTMLElement, CardProps>(({ 
  children, 
  className = '', 
  width,
  aspectRatio,
  ...props 
}: CardProps, ref) => {
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
      ref={(element) => {
        if (ref) {
          if (typeof ref === 'function') {
            ref(element);
          } else {
            (ref as React.MutableRefObject<HTMLElement | null>).current = element;
          }
        }
        if (cardRef && 'current' in cardRef) {
          (cardRef as React.MutableRefObject<HTMLElement | null>).current = element;
        }
      }}
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