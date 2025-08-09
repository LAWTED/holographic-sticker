import React, { forwardRef } from 'react';
import { useHologram } from './HologramContext';

export interface SceneProps {
  children: React.ReactNode;
  className?: string;
}

const Scene = forwardRef<HTMLDivElement, SceneProps>(({ 
  children, 
  className = '', 
  ...props 
}, ref) => {
  const { sceneRef } = useHologram();

  return (
    <div
      ref={ref || sceneRef}
      className={`sticker-scene ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Scene.displayName = 'Scene';

export default Scene;