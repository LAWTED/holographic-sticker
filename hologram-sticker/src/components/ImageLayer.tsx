import React from 'react';
import { useHologram } from './HologramContext';

export interface ImageLayerProps {
  src: string;
  alt?: string;
  className?: string;
}

const ImageLayer: React.FC<ImageLayerProps> = ({ 
  src, 
  alt = '', 
  className = '', 
  ...props 
}) => {
  const { isActive } = useHologram();

  return (
    <div
      className={`sticker-img-layer ${className} ${isActive ? 'active' : ''}`}
      {...props}
    >
      <img src={src} alt={alt} />
    </div>
  );
};

export default ImageLayer;