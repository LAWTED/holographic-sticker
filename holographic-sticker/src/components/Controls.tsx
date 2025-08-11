import React from 'react';
import { useHologram } from './HologramContext';

export interface ControlsProps {
  className?: string;
}

const Controls: React.FC<ControlsProps> = ({
  className = '',
  ...props
}) => {
  const { isExploded, setIsExploded } = useHologram();

  return (
    <div className={`sticker-controls ${className}`} {...props}>
      <button
        onClick={() => setIsExploded(!isExploded)}
        className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-white hover:text-neutral-300 transition-colors"
        type="button"
      >
        {isExploded ? '📦 Collapse' : '💥 Explode'}
      </button>
    </div>
  );
};

export default Controls;