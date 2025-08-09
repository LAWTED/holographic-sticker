import React from 'react';
import { useHologram } from './HologramContext';

export interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

const Content: React.FC<ContentProps> = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <div
      className={`sticker-content ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Content;