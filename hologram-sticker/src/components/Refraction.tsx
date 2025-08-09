import React from 'react';

export interface RefractionProps {
  className?: string;
  intensity?: number;
  variant?: 'default' | 'debug';
  colors?: string[];
}

const Refraction: React.FC<RefractionProps> = ({ 
  className = '', 
  intensity = 1,
  variant = 'default',
  colors,
  ...props 
}) => {
  const baseClass = variant === 'debug' ? 'sticker-refraction--debug' : 'sticker-refraction';
  
  return (
    <>
      <div
        className={`${baseClass} sticker-refraction-1 ${className}`}
        style={{ '--intensity': intensity } as React.CSSProperties}
        {...props}
      />
      <div
        className={`${baseClass} sticker-refraction-2 ${className}`}
        style={{ '--intensity': intensity } as React.CSSProperties}
        {...props}
      />
    </>
  );
};

export default Refraction;