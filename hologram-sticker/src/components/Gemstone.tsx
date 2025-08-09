import React from 'react';

export interface GemstoneProps {
  src: string;
  alt?: string;
  className?: string;
}

const Gemstone: React.FC<GemstoneProps> = ({ 
  src, 
  alt = '', 
  className = '', 
  ...props 
}) => {
  return (
    <img
      className={`sticker-gemstone ${className}`}
      src={src}
      alt={alt}
      {...props}
    />
  );
};

export default Gemstone;