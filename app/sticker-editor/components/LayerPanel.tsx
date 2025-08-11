"use client";

import { LayerConfig, StickerConfig, PropertyValue } from "../types/editor";

interface LayerPanelProps {
  currentSticker: StickerConfig;
  selectedLayer: string | null;
  onLayerSelect: (layerId: string | null) => void;
  onLayerToggle: (layerId: string) => void;
  onPropertyChange: (layerId: string, prop: string, value: unknown) => void;
  layerProperties: Record<string, Record<string, PropertyValue>>;
  showMinimap: boolean;
  showControls: boolean;
  onToggleMinimap: () => void;
  onToggleControls: () => void;
}

export default function LayerPanel({
  currentSticker,
  selectedLayer,
  onLayerSelect,
  onLayerToggle,
  onPropertyChange,
  layerProperties,
  showMinimap,
  showControls,
  onToggleMinimap,
  onToggleControls,
}: LayerPanelProps) {
  return (
    <div className="w-2/5 bg-neutral-900 border-r border-neutral-800 h-screen overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            {currentSticker.name}
          </h1>
          <p className="text-neutral-400 text-sm">Edit layers and properties</p>
        </div>

        {/* UI Controls */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-white mb-3">UI Controls</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-300">Show Controls</span>
              <button
                onClick={onToggleControls}
                className={`w-10 h-6 rounded-full transition-colors relative ${
                  showControls ? "bg-white" : "bg-neutral-600"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-neutral-900 rounded-full absolute top-1 transition-transform ${
                    showControls ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-300">Show Minimap</span>
              <button
                onClick={onToggleMinimap}
                className={`w-10 h-6 rounded-full transition-colors relative ${
                  showMinimap ? "bg-white" : "bg-neutral-600"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-neutral-900 rounded-full absolute top-1 transition-transform ${
                    showMinimap ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
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
                onSelect={() =>
                  onLayerSelect(layer.id === selectedLayer ? null : layer.id)
                }
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
  properties,
}: LayerItemProps) {
  return (
    <div className="border border-neutral-700 rounded-lg overflow-hidden">
      {/* Layer Header */}
      <div
        className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
          isSelected ? "bg-neutral-700" : "bg-neutral-800 hover:bg-neutral-750"
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
              layer.visible ? "bg-white border-white" : "border-neutral-500"
            }`}
          >
            {layer.visible && (
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-black"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
            isSelected ? "rotate-180" : ""
          }`}
        >
          <path
            d="M6 9l6 6 6-6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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
  onChange,
}: PropertyEditorProps) {
  const handleChange = (value: unknown) => {
    onChange(layerId, propName, value);
  };

  const getPropertyType = (
    propName: string,
    value: unknown
  ): "text" | "number" | "image" | "boolean" | "select" | "texture" => {
    if (propName === "texture") return "texture";
    if (propName === "opacity" || propName === "intensity") return "number";
    if (typeof value === "boolean") return "boolean";
    if (propName === "mixBlendMode" || propName === "objectFit")
      return "select";
    if (propName === "textureSize") return "text";
    if (
      propName.includes("src") ||
      propName.includes("Url") ||
      propName.includes("Image") ||
      propName === "maskUrl"
    )
      return "image";
    return "text";
  };

  const getSelectOptions = (propName: string) => {
    if (propName === "mixBlendMode") {
      return [
        { value: "normal", label: "Normal" },
        { value: "multiply", label: "Multiply" },
        { value: "screen", label: "Screen" },
        { value: "overlay", label: "Overlay" },
        { value: "hard-light", label: "Hard Light" },
        { value: "soft-light", label: "Soft Light" },
        { value: "difference", label: "Difference" },
      ];
    }
    if (propName === "objectFit") {
      return [
        { value: "contain", label: "Contain" },
        { value: "cover", label: "Cover" },
        { value: "fill", label: "Fill" },
        { value: "none", label: "None" },
        { value: "scale-down", label: "Scale Down" },
      ];
    }
    return [];
  };

  const texturePresets = [
    {
      url: "https://assets.codepen.io/605876/figma-texture.png",
      name: "Default",
    },
    {
      url: "/texutre/cross.svg",
      name: "Cross",
    },

    {
      url: "/texutre/diamond.svg",
      name: "Diamond",
    },
    {
      url: "/texutre/dot.svg",
      name: "Dot",
    },
    {
      url: "/texutre/noise.svg",
      name: "Lines",
    },
    {
      url: "/texutre/ring.svg",
      name: "Ring",
    },
    {
      url: "/texutre/triangle.svg",
      name: "Triangle",
    },
    {
      url: "/texutre/wave.svg",
      name: "Wave",
    },
  ];

  const propertyType = getPropertyType(propName, propValue);

  return (
    <div>
      <label className="block text-xs font-medium text-neutral-300 mb-1 capitalize">
        {propName.replace(/([A-Z])/g, " $1").trim()}
      </label>

      {propertyType === "text" && (
        <input
          type="text"
          value={propValue || ""}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full bg-neutral-700 border border-neutral-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-30"
        />
      )}

      {propertyType === "number" && (
        <input
          type="number"
          value={propValue || 0}
          min={propName === "opacity" ? 0 : undefined}
          max={propName === "opacity" ? 1 : undefined}
          step={propName === "opacity" ? 0.1 : 1}
          onChange={(e) => handleChange(parseFloat(e.target.value))}
          className="w-full bg-neutral-700 border border-neutral-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-30"
        />
      )}

      {propertyType === "boolean" && (
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

      {propertyType === "select" && (
        <select
          value={propValue || ""}
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

      {propertyType === "texture" && (
        <div className="space-y-3">
          {/* 纹理预设 */}
          <div className="flex flex-wrap gap-4">
            {texturePresets.map((preset, index) => (
              <div key={index} className="flex flex-col items-center space-y-1">
                <button
                  onClick={() => handleChange(preset.url)}
                  className={`w-12 h-12 rounded-lg border-2 overflow-hidden transition-colors hover:border-neutral-400 ${
                    propValue === preset.url
                      ? "border-white"
                      : "border-neutral-600"
                  }`}
                  title={preset.name}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${preset.url}), linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
                      backgroundSize:
                        "16px 16px, 6px 6px, 6px 6px, 6px 6px, 6px 6px",
                      backgroundPosition:
                        "center, 0 0, 0 3px, 3px -3px, -3px 0px",
                      backgroundColor: "#fff",
                    }}
                  />
                </button>
                <span className="text-xs text-neutral-400 text-center">
                  {preset.name}
                </span>
              </div>
            ))}

            {/* Show uploaded custom texture if it exists and is not a preset */}
            {propValue &&
              !texturePresets.some((preset) => preset.url === propValue) && (
                <div className="flex flex-col items-center space-y-1">
                  <button
                    onClick={() => handleChange(propValue)}
                    className={`w-12 h-12 rounded-lg border-2 overflow-hidden transition-colors hover:border-neutral-400 border-white`}
                    title="Custom Texture"
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url(${propValue}), linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
                        backgroundSize:
                          "16px 16px, 6px 6px, 6px 6px, 6px 6px, 6px 6px",
                        backgroundPosition:
                          "center, 0 0, 0 3px, 3px -3px, -3px 0px",
                        backgroundColor: "#ddd",
                      }}
                    />
                  </button>
                  <span className="text-xs text-neutral-400 text-center">
                    Custom
                  </span>
                </div>
              )}

            {/* Custom Upload Button */}
            <div className="flex flex-col items-center space-y-1">
              <input
                type="file"
                accept="image/*"
                id={`custom-texture-${layerId}-${propName}`}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => handleChange(e.target?.result);
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
              <label
                htmlFor={`custom-texture-${layerId}-${propName}`}
                className="w-12 h-12 rounded-lg border-2 border-dashed border-neutral-500 hover:border-neutral-400 cursor-pointer transition-colors flex items-center justify-center"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-neutral-400"
                >
                  <path
                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="7,10 12,15 17,10"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="12"
                    y1="15"
                    x2="12"
                    y2="3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
              <span className="text-xs text-neutral-400 text-center">
                Upload
              </span>
            </div>
          </div>

          {/* Custom URL Input */}
          <span className="text-xs text-neutral-400 mb-2 block">
            Texture URL
          </span>
          <input
            type="text"
            value={propValue || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Enter texture URL..."
            className="w-full bg-neutral-700 border border-neutral-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20 focus:border-neutral-500"
          />
        </div>
      )}

      {propertyType === "image" && (
        <div className="space-y-3">
          {/* Image preview and upload */}
          <div className="flex flex-wrap gap-4">
            {/* Show current image if it exists */}
            {propValue && (
              <div className="flex flex-col items-center space-y-1">
                <button
                  onClick={() => handleChange(propValue)}
                  className={`w-12 h-12 rounded-lg border-2 overflow-hidden transition-colors hover:border-neutral-400 border-white`}
                  title="Current Image"
                >
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${propValue}), linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
                      backgroundSize: "contain, 6px 6px, 6px 6px, 6px 6px, 6px 6px",
                      backgroundPosition: "center, 0 0, 0 3px, 3px -3px, -3px 0px",
                      backgroundRepeat: "no-repeat, repeat, repeat, repeat, repeat",
                      backgroundColor: "#ddd",
                    }}
                  />
                </button>
                <span className="text-xs text-neutral-400 text-center">Current</span>
              </div>
            )}
            
            {/* Custom Upload Button */}
            <div className="flex flex-col items-center space-y-1">
              <input
                type="file"
                accept="image/*"
                id={`custom-image-${layerId}-${propName}`}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => handleChange(e.target?.result);
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
              <label
                htmlFor={`custom-image-${layerId}-${propName}`}
                className="w-12 h-12 rounded-lg border-2 border-dashed border-neutral-500 hover:border-neutral-400 cursor-pointer transition-colors flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-neutral-400">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="7,10 12,15 17,10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </label>
              <span className="text-xs text-neutral-400 text-center">Upload</span>
            </div>
          </div>
          
          {/* Image URL Input */}
          <div>
            <span className="text-xs text-neutral-400 mb-2 block">Image URL</span>
            <input
              type="text"
              value={propValue || ""}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Enter image URL..."
              className="w-full bg-neutral-700 border border-neutral-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20 focus:border-neutral-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
