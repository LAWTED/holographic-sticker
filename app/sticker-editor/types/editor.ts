export interface LayerConfig {
  id: string;
  type: 'ImageLayer' | 'Pattern' | 'Watermark' | 'Content' | 'Spotlight' | 'Glare';
  name: string;
  visible: boolean;
  props: Record<string, unknown>;
  editableProps: string[];
}

export interface StickerConfig {
  id: string;
  name: string;
  description: string;
  layers: LayerConfig[];
}

export interface PropertyValue {
  type: 'text' | 'number' | 'image' | 'color' | 'select' | 'boolean';
  label: string;
  value: unknown;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: unknown; label: string }[];
}

export interface EditorState {
  selectedSticker: string;
  selectedLayer: string | null;
  stickerConfigs: Record<string, StickerConfig>;
  layerProperties: Record<string, Record<string, PropertyValue>>;
}