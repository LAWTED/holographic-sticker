import React from 'react';
import { useHologram } from './HologramContext';
import Refraction from './Refraction';

export interface DebugLayerProps {
  variant?: 'default' | 'clipped';
  className?: string;
}

const DebugLayer: React.FC<DebugLayerProps> = ({ 
  variant = 'default', 
  className = '', 
  ...props 
}) => {
  const { isExploded } = useHologram();

  return (
    <div
      className={`sticker-debug ${
        variant === 'clipped' ? 'sticker-debug--clipped' : ''
      } ${className}`}
      data-visible={isExploded}
      {...props}
    >
      <Refraction variant="debug" />
      <Refraction variant="debug" />
    </div>
  );
};

export default DebugLayer;