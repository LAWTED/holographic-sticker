import React from 'react';

export interface OverlayProps {
  children?: React.ReactNode;
  src?: string;
  alt?: string;
  className?: string;
  opacity?: number;
}

const Overlay: React.FC<OverlayProps> = ({ 
  children, 
  src, 
  alt = '', 
  className = '', 
  opacity = 1,
  ...props 
}) => {
  const style = {
    '--overlay-opacity': opacity,
  } as React.CSSProperties;

  return (
    <div 
      className={`sticker-overlay ${className}`} 
      style={style}
      {...props}
    >
      {src && <img src={src} alt={alt} />}
      {children}
    </div>
  );
};

export default Overlay;