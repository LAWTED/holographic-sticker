import React from 'react';
import { PatternProps } from '../types';

const Pattern: React.FC<PatternProps> = ({ 
  children, 
  className = '', 
  intensity = 0.4,
  textureUrl = 'https://assets.codepen.io/605876/figma-texture.png',
  imageUrl = '/light.png'
}) => {
  // 动态设置 mask 样式
  const patternStyle = {
    '--pattern-image-url': `url(${imageUrl})`,
    '--pattern-texture-url': `url(${textureUrl})`,
  } as React.CSSProperties;

  return (
    <div className={`sticker-pattern ${className}`} style={patternStyle}>
      {children}
    </div>
  );
};

export default Pattern;