import React from 'react';
import { useHologram } from './HologramContext';

export interface FrameProps {
  children: React.ReactNode;
  className?: string;
  emboss?: boolean;
}

const Frame: React.FC<FrameProps> = ({ 
  children, 
  className = '', 
  emboss = true, 
  ...props 
}) => {
  const { isActive } = useHologram();

  return (
    <div
      className={`sticker-frame ${
        emboss ? 'sticker-emboss' : ''
      } ${className} ${isActive ? 'active' : ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Frame;