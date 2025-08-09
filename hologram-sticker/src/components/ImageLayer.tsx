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
  // 直接显示，无需等待active状态
  return (
    <div
      className={`sticker-img-layer ${className}`}
      {...props}
    >
      <img src={src} alt={alt} />
    </div>
  );
};

export default ImageLayer;