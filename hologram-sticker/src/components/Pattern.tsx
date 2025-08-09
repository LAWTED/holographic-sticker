import React from 'react';
import { useHologram } from './HologramContext';

export interface PatternProps {
  children?: React.ReactNode;
  className?: string;
  maskUrl?: string;
  maskSize?: 'contain' | 'cover' | string;
  textureUrl?: string;
  opacity?: number;
  mode?: 'composite' | 'texture-only';
  mixBlendMode?: 'hard-light' | 'multiply';
  textureSize?: string;
}

const Pattern: React.FC<PatternProps> = ({
  children,
  className = '',
  maskUrl,
  maskSize = 'contain',
  textureUrl = 'https://assets.codepen.io/605876/figma-texture.png',
  opacity = 0.4,
  mode = 'texture-only',
  mixBlendMode = 'multiply',
  textureSize = '4cqi',
  ...props
}) => {
  // 直接显示，无需等待active状态
  const style = {
    '--pattern-opacity': opacity,
    '--pattern-mix-blend-mode': mixBlendMode,
    '--pattern-texture-size': textureSize,
    '--pattern-url': `url(${textureUrl})`,
    // 如果使用 maskUrl，设置额外的 CSS 变量
    ...(maskUrl && {
      '--pattern-mask-url': `url(${maskUrl})`,
      '--pattern-mask-size': maskSize,
    }),
  } as React.CSSProperties;

  return (
    <div
      className={`sticker-pattern ${maskUrl ? 'sticker-pattern--mask' : ''} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default Pattern;