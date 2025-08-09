import React from 'react';
import { HologramProvider, useHologram } from './HologramContext';

export interface RootProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'light' | 'dark' | 'system';
  style?: React.CSSProperties;
}

// Internal wrapper component that has access to the context
const RootContent: React.FC<Omit<RootProps, 'theme'>> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  const { rootRef } = useHologram();

  return (
    <div
      ref={rootRef}
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
  theme = 'dark', 
  style,
  ...props 
}) => {
  return (
    <HologramProvider theme={theme}>
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