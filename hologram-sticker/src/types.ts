import { ReactNode, CSSProperties } from 'react';

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
  onFlip?: (flipped: boolean) => void;
}

export interface FrontProps {
  children: ReactNode;
  className?: string;
}

export interface BackProps {
  children: ReactNode;
  className?: string;
  emboss?: boolean;
}

export interface BackgroundProps {
  children?: ReactNode;
  src?: string;
  alt?: string;
  className?: string;
}

export interface ImageLayerProps {
  src: string;
  alt?: string;
  className?: string;
}

export interface DebugLayerProps {
  variant?: 'default' | 'clipped';
  className?: string;
}

export interface PatternProps {
  children?: ReactNode;
  className?: string;
  imageUrl?: string;
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

export interface FrameProps {
  children: ReactNode;
  className?: string;
  emboss?: boolean;
}

export interface SpotlightProps {
  className?: string;
  intensity?: number;
}

export interface GlareProps {
  className?: string;
  animate?: boolean;
}

export interface ArrowProps {
  className?: string;
}

export interface MinimapProps {
  className?: string;
}

export interface ControlsProps {
  className?: string;
  showTheme?: boolean;
  showAnimate?: boolean;
}

export interface WordmarkProps {
  src: string;
  alt?: string;
  position?: 'top' | 'bottom';
  className?: string;
}

export interface GemstoneProps {
  src: string;
  alt?: string;
  className?: string;
}

export interface OverlayProps {
  children?: ReactNode;
  src?: string;
  alt?: string;
  className?: string;
  opacity?: number;
}

export interface PointerPosition {
  x: number;
  y: number;
}

export interface HologramContextType {
  pointerPosition: PointerPosition;
}