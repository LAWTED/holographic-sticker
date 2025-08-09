// Import styles
import './styles/hologram-sticker.css';

// Import components
import Root from './components/Root';
import Card from './components/Card';
import Background from './components/Background';
import Pattern from './components/Pattern';
import Refraction from './components/Refraction';
import Overlay from './components/Overlay';

// Export types
export type {
  RootProps,
  CardProps,
  BackgroundProps,
  PatternProps,
  RefractionProps,
  OverlayProps,
  PointerPosition,
  HologramContextType,
} from './types';

// Export context hook
export { useHologram } from './context';

// Main export - compound component
export const HologramSticker = {
  Root,
  Card,
  Background,
  Pattern,
  Refraction,
  Overlay,
};

// Default export
export default HologramSticker;