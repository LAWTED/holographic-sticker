import React from 'react';

export interface BackgroundProps {
  children?: React.ReactNode;
  src?: string;
  alt?: string;
  className?: string;
}

const Background: React.FC<BackgroundProps> = ({ 
  children, 
  src, 
  alt = '', 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`sticker-background ${className}`} {...props}>
      {src && <img src={src} alt={alt} />}
      {children}
    </div>
  );
};

export default Background;