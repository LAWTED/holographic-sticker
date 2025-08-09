import { ReactNode, CSSProperties } from 'react';

export interface RootProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
  width?: number; // 可选，如果不提供则使用 CSS 默认值
  aspectRatio?: number; // 可选，如果不提供则使用 CSS 默认值
}

export interface BackgroundProps {
  src?: string;
  alt?: string;
  className?: string;
  children?: ReactNode;
}

export interface PatternProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  textureUrl?: string;
  imageUrl?: string; // 用于 mask 的主图片 URL
}

export interface RefractionProps {
  className?: string;
  colors?: string[];
  count?: 1 | 2;
}

export interface OverlayProps {
  src?: string;
  alt?: string;
  className?: string;
  opacity?: number;
  children?: ReactNode;
}

export interface PointerPosition {
  x: number;
  y: number;
}

export interface HologramContextType {
  pointerPosition: PointerPosition;
}