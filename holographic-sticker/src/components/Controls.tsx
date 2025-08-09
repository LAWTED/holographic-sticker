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
        className="rounded-xl border border-white/50 px-4 py-2"
        type="button"
      >
        {isExploded ? '📦 Collapse' : '💥 Explode'}
      </button>
    </div>
  );
};

export default Controls;