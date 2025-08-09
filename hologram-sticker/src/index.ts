// Components
import Root from './components/Root';
import Scene from './components/Scene';
import Card from './components/Card';
import Background from './components/Background';
import ImageLayer from './components/ImageLayer';
import DebugLayer from './components/DebugLayer';
import Pattern from './components/Pattern';
import Watermark from './components/Watermark';
import Refraction from './components/Refraction';
import Frame from './components/Frame';
import Spotlight from './components/Spotlight';
import Glare from './components/Glare';
import Arrow from './components/Arrow';
import Minimap from './components/Minimap';
import Controls from './components/Controls';
import Wordmark from './components/Wordmark';
import Gemstone from './components/Gemstone';
import Overlay from './components/Overlay';
import Filters from './components/Filters';

// Context and Hook
import { useHologram } from './components/HologramContext';

// Styles
import './styles/hologram-sticker.css';

// Compound Component
const HologramSticker = {
  Root,
  Scene,
  Card,
  Background,
  ImageLayer,
  DebugLayer,
  Pattern,
  Watermark,
  Refraction,
  Frame,
  Spotlight,
  Glare,
  Arrow,
  Minimap,
  Controls,
  Wordmark,
  Gemstone,
  Overlay,
  Filters,
};

// Export types
export type {
  RootProps,
  SceneProps,
  CardProps,
  BackgroundProps,
  ImageLayerProps,
  DebugLayerProps,
  PatternProps,
  WatermarkProps,
  RefractionProps,
  FrameProps,
  SpotlightProps,
  GlareProps,
  ArrowProps,
  MinimapProps,
  ControlsProps,
  WordmarkProps,
  GemstoneProps,
  OverlayProps,
  PointerPosition,
  HologramContextType,
} from './types';

// Export hook
export { useHologram };

// Export default
export { HologramSticker as default };
export { HologramSticker };