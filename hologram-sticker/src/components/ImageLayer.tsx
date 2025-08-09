import React from 'react';
import { useHologram } from './HologramContext';

export interface ImageLayerProps {
  src: string;
  alt?: string;
  className?: string;
  opacity?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  scale?: number | string;
  parallax?: boolean;
  style?: React.CSSProperties;
}

const ImageLayer: React.FC<ImageLayerProps> = ({ 
  src, 
  alt = '', 
  className = '', 
  opacity,
  objectFit,
  scale,
  parallax = false,
  style,
  ...props 
}) => {
  // 直接显示，无需等待active状态
  const combinedStyle = {
    ...style,
    ...(opacity !== undefined && { opacity })
  };

  const imgStyle = {
    ...(objectFit && { objectFit }),
    ...(scale !== undefined && { scale })
  };

  return (
    <div
      className={`sticker-img-layer ${parallax ? 'sticker-img-layer--parallax' : 'sticker-img-layer--static'} ${className}`}
      style={combinedStyle}
      {...props}
    >
      <img src={src} alt={alt} style={imgStyle} />
    </div>
  );
};

export default ImageLayer;