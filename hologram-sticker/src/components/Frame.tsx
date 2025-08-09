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
  // 直接显示，无需等待active状态
  return (
    <div
      className={`sticker-frame ${
        emboss ? 'sticker-emboss' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Frame;