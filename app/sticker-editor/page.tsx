"use client";

import { useState, useEffect } from 'react';
import LayerPanel from './components/LayerPanel';
import PreviewPane from './components/PreviewPane';
import { stickerConfigs } from './config/stickers';
import { EditorState, PropertyValue } from './types/editor';

const getPropertyType = (propName: string, value: unknown): PropertyValue['type'] => {
  if (propName.includes('src') || propName.includes('Url') || propName.includes('Image')) return 'image';
  if (propName === 'opacity' || propName === 'intensity') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  if (propName === 'mixBlendMode' || propName === 'objectFit') return 'select';
  return 'text';
};

export default function StickerEditor() {
  const stickerIds = Object.keys(stickerConfigs);
  const [currentStickerIndex, setCurrentStickerIndex] = useState(0);
  const [state, setState] = useState<EditorState>({
    selectedSticker: stickerIds[0],
    selectedLayer: null,
    stickerConfigs: stickerConfigs,
    layerProperties: {}
  });

  useEffect(() => {
    const properties: Record<string, Record<string, PropertyValue>> = {};
    
    // Only initialize properties for layers that have unique combinations of sticker + layer
    Object.entries(stickerConfigs).forEach(([stickerId, config]) => {
      config.layers.forEach(layer => {
        // Use unique key combining sticker ID and layer ID
        const uniqueLayerId = `${stickerId}-${layer.id}`;
        
        if (!properties[uniqueLayerId]) {
          properties[uniqueLayerId] = {};
        }
        
        layer.editableProps.forEach(propName => {
          const propValue = layer.props[propName];
          properties[uniqueLayerId][propName] = {
            type: getPropertyType(propName, propValue),
            label: propName.replace(/([A-Z])/g, ' $1').trim(),
            value: propValue
          };
        });
      });
    });

    setState(prev => ({ ...prev, layerProperties: properties }));
  }, []);

  const handlePrevious = () => {
    if (currentStickerIndex > 0) {
      const newIndex = currentStickerIndex - 1;
      setCurrentStickerIndex(newIndex);
      setState(prev => ({
        ...prev,
        selectedSticker: stickerIds[newIndex],
        selectedLayer: null
      }));
    }
  };

  const handleNext = () => {
    if (currentStickerIndex < stickerIds.length - 1) {
      const newIndex = currentStickerIndex + 1;
      setCurrentStickerIndex(newIndex);
      setState(prev => ({
        ...prev,
        selectedSticker: stickerIds[newIndex],
        selectedLayer: null
      }));
    }
  };

  const handleLayerSelect = (layerId: string | null) => {
    setState(prev => ({ ...prev, selectedLayer: layerId }));
  };

  const handleLayerToggle = (layerId: string) => {
    setState(prev => ({
      ...prev,
      stickerConfigs: {
        ...prev.stickerConfigs,
        [prev.selectedSticker]: {
          ...prev.stickerConfigs[prev.selectedSticker],
          layers: prev.stickerConfigs[prev.selectedSticker].layers.map(layer =>
            layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
          )
        }
      }
    }));
  };

  const handlePropertyChange = (layerId: string, propName: string, value: unknown) => {
    const uniqueLayerId = `${state.selectedSticker}-${layerId}`;
    
    setState(prev => ({
      ...prev,
      layerProperties: {
        ...prev.layerProperties,
        [uniqueLayerId]: {
          ...prev.layerProperties[uniqueLayerId],
          [propName]: {
            ...prev.layerProperties[uniqueLayerId]?.[propName],
            value: value
          }
        }
      },
      stickerConfigs: {
        ...prev.stickerConfigs,
        [prev.selectedSticker]: {
          ...prev.stickerConfigs[prev.selectedSticker],
          layers: prev.stickerConfigs[prev.selectedSticker].layers.map(layer =>
            layer.id === layerId 
              ? { ...layer, props: { ...layer.props, [propName]: value } }
              : layer
          )
        }
      }
    }));
  };

  const currentStickerConfig = state.stickerConfigs[state.selectedSticker];
  
  const layerPropertiesForPreview = Object.keys(state.layerProperties)
    .filter(layerId => layerId.startsWith(`${state.selectedSticker}-`))
    .reduce((acc, uniqueLayerId) => {
      // Extract the actual layer ID from the unique key
      const layerId = uniqueLayerId.replace(`${state.selectedSticker}-`, '');
      acc[layerId] = Object.keys(state.layerProperties[uniqueLayerId]).reduce((props, propName) => {
        props[propName] = state.layerProperties[uniqueLayerId][propName].value;
        return props;
      }, {} as Record<string, unknown>);
      return acc;
    }, {} as Record<string, Record<string, unknown>>);

  return (
    <div className="flex h-screen bg-neutral-950">
      <LayerPanel
        currentSticker={currentStickerConfig}
        selectedLayer={state.selectedLayer}
        onLayerSelect={handleLayerSelect}
        onLayerToggle={handleLayerToggle}
        onPropertyChange={handlePropertyChange}
        layerProperties={Object.keys(state.layerProperties)
          .filter(layerId => layerId.startsWith(`${state.selectedSticker}-`))
          .reduce((acc, uniqueLayerId) => {
            const layerId = uniqueLayerId.replace(`${state.selectedSticker}-`, '');
            acc[layerId] = state.layerProperties[uniqueLayerId];
            return acc;
          }, {} as Record<string, Record<string, PropertyValue>>)}
      />
      <PreviewPane
        stickerConfig={currentStickerConfig}
        layerProperties={layerPropertiesForPreview}
        onPrevious={handlePrevious}
        onNext={handleNext}
        currentIndex={currentStickerIndex}
        totalCount={stickerIds.length}
      />
    </div>
  );
}