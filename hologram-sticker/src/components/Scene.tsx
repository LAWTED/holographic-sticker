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
      ref={(element) => {
        if (ref) {
          if (typeof ref === 'function') {
            ref(element);
          } else {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = element;
          }
        }
        if (sceneRef && 'current' in sceneRef) {
          (sceneRef as React.MutableRefObject<HTMLDivElement | null>).current = element;
        }
      }}
      className={`sticker-scene ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Scene.displayName = 'Scene';

export default Scene;