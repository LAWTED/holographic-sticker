import React from 'react';
import { HologramProvider, useHologram } from './HologramContext';

export interface RootProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Internal wrapper component that has access to the context
const RootContent: React.FC<RootProps> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  const { rootRef } = useHologram();

  return (
    <div
      ref={rootRef as React.RefObject<HTMLDivElement>}
      className={`sticker-root ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

const Root: React.FC<RootProps> = ({ 
  children, 
  className = '', 
  style,
  ...props 
}) => {
  return (
    <HologramProvider>
      <RootContent
        className={className}
        style={style}
        {...props}
      >
        {children}
      </RootContent>
    </HologramProvider>
  );
};

export default Root;