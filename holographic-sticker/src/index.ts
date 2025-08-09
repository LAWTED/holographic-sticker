// Components
import Root from './components/Root';
import Scene from './components/Scene';
import Card from './components/Card';
import ImageLayer from './components/ImageLayer';
import Pattern from './components/Pattern';
import Watermark from './components/Watermark';
import Refraction from './components/Refraction';
import Content from './components/Content';
import Spotlight from './components/Spotlight';
import Glare from './components/Glare';
import Minimap from './components/Minimap';
import Controls from './components/Controls';

// Context and Hook
import { useHologram } from './components/HologramContext';

// Styles
import './styles/hologram-sticker.css';

// Compound Component
const HologramSticker = {
  Root,
  Scene,
  Card,
  ImageLayer,
  Pattern,
  Watermark,
  Refraction,
  Content,
  Spotlight,
  Glare,
  Minimap,
  Controls,
};

// Export types
export type {
  RootProps,
  SceneProps,
  CardProps,
  ImageLayerProps,
  PatternProps,
  WatermarkProps,
  RefractionProps,
  ContentProps,
  SpotlightProps,
  GlareProps,
  MinimapProps,
  ControlsProps,
  PointerPosition,
  HologramContextType,
} from './types';

// Export hook
export { useHologram };

// Export default
export { HologramSticker as default };
export { HologramSticker };