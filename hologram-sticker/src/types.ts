import { ReactNode, CSSProperties } from 'react';
import React from 'react';

export interface RootProps {
  children: ReactNode;
  className?: string;
  theme?: 'light' | 'dark' | 'system';
  style?: CSSProperties;
}

export interface SceneProps {
  children: ReactNode;
  className?: string;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
  width?: number;
  aspectRatio?: number;
}



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

export interface PatternProps {
  children?: ReactNode;
  className?: string;
  maskUrl?: string;
  maskSize?: 'contain' | 'cover' | string;
  textureUrl?: string;
  opacity?: number;
  mode?: 'composite' | 'texture-only';
  mixBlendMode?: 'hard-light' | 'multiply';
  textureSize?: string;
}

export interface WatermarkProps {
  children?: ReactNode;
  className?: string;
  imageUrl?: string;
  opacity?: number;
}

export interface RefractionProps {
  className?: string;
  intensity?: number;
  variant?: 'default' | 'debug';
  colors?: string[];
}

export interface ContentProps {
  children: ReactNode;
  className?: string;
}

export interface SpotlightProps {
  className?: string;
  intensity?: number;
}

export interface GlareProps {
  className?: string;
  animate?: boolean;
}

export interface MinimapProps {
  className?: string;
}

export interface ControlsProps {
  className?: string;
  showTheme?: boolean;
  showAnimate?: boolean;
}


export interface PointerPosition {
  x: string;
  y: string;
}

export interface HologramContextType {
  isActive: boolean;
  isExploded: boolean;
  setIsExploded: (exploded: boolean) => void;
  pointerPos: PointerPosition;
  showGlare: boolean;
  cardRef: React.RefObject<HTMLElement>;
  minimapRef: React.RefObject<HTMLDivElement>;
  sceneRef: React.RefObject<HTMLDivElement>;
  rootRef: React.RefObject<HTMLDivElement>;
  theme: 'light' | 'dark' | 'system';
}