import React from 'react';
import { BackgroundProps } from '../types';

const Background: React.FC<BackgroundProps> = ({ src, alt = '', className = '', children }) => {
  return (
    <div className={`sticker-background ${className}`}>
      {children ? (
        // 自动给 children 添加 sticker-image 类名
        React.cloneElement(children as React.ReactElement, {
          className: `sticker-image ${(children as React.ReactElement).props?.className || ''}`.trim()
        })
      ) : (
        <img 
          src={src} 
          alt={alt} 
          className="sticker-image"
        />
      )}
    </div>
  );
};

export default Background;