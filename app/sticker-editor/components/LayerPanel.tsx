"use client";

import { LayerConfig, StickerConfig, PropertyValue } from '../types/editor';

interface LayerPanelProps {
  currentSticker: StickerConfig;
  selectedLayer: string | null;
  onLayerSelect: (layerId: string | null) => void;
  onLayerToggle: (layerId: string) => void;
  onPropertyChange: (layerId: string, prop: string, value: unknown) => void;
  layerProperties: Record<string, Record<string, PropertyValue>>;
}

export default function LayerPanel({
  currentSticker,
  selectedLayer,
  onLayerSelect,
  onLayerToggle,
  onPropertyChange,
  layerProperties
}: LayerPanelProps) {

  return (
    <div className="w-2/5 bg-neutral-900 border-r border-neutral-800 h-screen overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">{currentSticker.name}</h1>
          <p className="text-neutral-400 text-sm">
            Edit layers and properties
          </p>
        </div>

        {/* Layers */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-white mb-3">Layers</h3>
          <div className="space-y-2">
            {currentSticker?.layers.map((layer) => (
              <LayerItem
                key={layer.id}
                layer={layer}
                isSelected={selectedLayer === layer.id}
                onSelect={() => onLayerSelect(layer.id === selectedLayer ? null : layer.id)}
                onToggle={() => onLayerToggle(layer.id)}
                onPropertyChange={onPropertyChange}
                properties={layerProperties[layer.id] || {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface LayerItemProps {
  layer: LayerConfig;
  isSelected: boolean;
  onSelect: () => void;
  onToggle: () => void;
  onPropertyChange: (layerId: string, prop: string, value: unknown) => void;
  properties: Record<string, PropertyValue>;
}

function LayerItem({ 
  layer, 
  isSelected, 
  onSelect, 
  onToggle, 
  onPropertyChange,
  properties
}: LayerItemProps) {
  return (
    <div className="border border-neutral-700 rounded-lg overflow-hidden">
      {/* Layer Header */}
      <div
        className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
          isSelected
            ? 'bg-neutral-700'
            : 'bg-neutral-800 hover:bg-neutral-750'
        }`}
        onClick={onSelect}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
              layer.visible
                ? 'bg-white border-white'
                : 'border-neutral-500'
            }`}
          >
            {layer.visible && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-black">
                <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          <div>
            <div className="font-medium text-white text-sm">{layer.name}</div>
            <div className="text-xs text-neutral-400">{layer.type}</div>
          </div>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={`text-neutral-400 transition-transform ${
            isSelected ? 'rotate-180' : ''
          }`}
        >
          <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Layer Properties */}
      {isSelected && (
        <div className="p-3 bg-neutral-850 border-t border-neutral-700 space-y-3">
          {layer.editableProps.map((propName) => (
            <PropertyEditor
              key={propName}
              layerId={layer.id}
              propName={propName}
              propValue={layer.props[propName]}
              property={properties[propName]}
              onChange={onPropertyChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface PropertyEditorProps {
  layerId: string;
  propName: string;
  propValue: any;
  property?: PropertyValue;
  onChange: (layerId: string, prop: string, value: any) => void;
}

function PropertyEditor({ 
  layerId, 
  propName, 
  propValue, 
  property,
  onChange 
}: PropertyEditorProps) {
  const handleChange = (value: unknown) => {
    onChange(layerId, propName, value);
  };

  const getPropertyType = (propName: string, value: unknown): 'text' | 'number' | 'image' | 'boolean' | 'select' => {
    if (propName.includes('src') || propName.includes('Url') || propName.includes('Image')) return 'image';
    if (propName === 'opacity' || propName === 'intensity') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (propName === 'mixBlendMode' || propName === 'objectFit') return 'select';
    return 'text';
  };

  const getSelectOptions = (propName: string) => {
    if (propName === 'mixBlendMode') {
      return [
        { value: 'normal', label: 'Normal' },
        { value: 'multiply', label: 'Multiply' },
        { value: 'screen', label: 'Screen' },
        { value: 'overlay', label: 'Overlay' },
        { value: 'hard-light', label: 'Hard Light' },
        { value: 'soft-light', label: 'Soft Light' },
        { value: 'difference', label: 'Difference' },
      ];
    }
    if (propName === 'objectFit') {
      return [
        { value: 'contain', label: 'Contain' },
        { value: 'cover', label: 'Cover' },
        { value: 'fill', label: 'Fill' },
        { value: 'none', label: 'None' },
        { value: 'scale-down', label: 'Scale Down' },
      ];
    }
    return [];
  };

  const propertyType = property?.type || getPropertyType(propName, propValue);
  
  return (
    <div>
      <label className="block text-xs font-medium text-neutral-300 mb-1 capitalize">
        {propName.replace(/([A-Z])/g, ' $1').trim()}
      </label>
      
      {propertyType === 'text' && (
        <input
          type="text"
          value={propValue || ''}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full bg-neutral-700 border border-neutral-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-30"
        />
      )}

      {propertyType === 'number' && (
        <input
          type="number"
          value={propValue || 0}
          min={propName === 'opacity' ? 0 : undefined}
          max={propName === 'opacity' ? 1 : undefined}
          step={propName === 'opacity' ? 0.1 : 1}
          onChange={(e) => handleChange(parseFloat(e.target.value))}
          className="w-full bg-neutral-700 border border-neutral-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-30"
        />
      )}

      {propertyType === 'boolean' && (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={propValue || false}
            onChange={(e) => handleChange(e.target.checked)}
            className="w-4 h-4 text-white bg-neutral-700 border-neutral-600 rounded focus:ring-white focus:ring-opacity-30"
          />
          <span className="text-sm text-neutral-300">Enable</span>
        </label>
      )}

      {propertyType === 'select' && (
        <select
          value={propValue || ''}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full bg-neutral-700 border border-neutral-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-30"
        >
          {getSelectOptions(propName).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {propertyType === 'image' && (
        <div className="space-y-2">
          <input
            type="text"
            value={propValue || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Enter image URL or upload..."
            className="w-full bg-neutral-700 border border-neutral-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-30"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => handleChange(e.target?.result);
                reader.readAsDataURL(file);
              }
            }}
            className="w-full text-xs text-neutral-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-neutral-600 file:text-white hover:file:bg-neutral-500"
          />
        </div>
      )}
    </div>
  );
}