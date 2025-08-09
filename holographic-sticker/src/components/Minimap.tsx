import React from 'react';
import { useHologram } from './HologramContext';

export interface MinimapProps {
  className?: string;
}

const Minimap: React.FC<MinimapProps> = ({ className = '', ...props }) => {
  const { minimapRef, pointerPos, isExploded } = useHologram();

  return (
    <div
      ref={minimapRef as React.RefObject<HTMLDivElement>}
      className={`sticker-minimap ${className} ${isExploded ? 'visible' : ''}`}
      {...props}
    >
      <div className="sticker-minimap__stats">
        <span>x: {pointerPos.x}</span>
        <span>y: {pointerPos.y}</span>
      </div>
    </div>
  );
};

export default Minimap;