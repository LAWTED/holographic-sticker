import React from 'react';
import { OverlayProps } from '../types';

const Overlay: React.FC<OverlayProps> = ({ 
  src, 
  alt = '', 
  className = '', 
  opacity = 0.2,
  children
}) => {
  const overlayStyle = {
    '--overlay-opacity': opacity,
  } as React.CSSProperties;

  return (
    <div 
      className={`sticker-overlay ${className}`}
      style={overlayStyle}
    >
      {children ? (
        // 自动给 children 添加 sticker-overlay-image 类名
        React.cloneElement(children as React.ReactElement, {
          className: `sticker-overlay-image ${(children as React.ReactElement).props?.className || ''}`.trim()
        })
      ) : (
        <img 
          src={src} 
          alt={alt} 
          className="sticker-overlay-image"
        />
      )}
    </div>
  );
};

export default Overlay;