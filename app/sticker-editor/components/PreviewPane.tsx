"use client";

import HolographicSticker from "holographic-sticker";
import { StickerConfig } from "../types/editor";

interface PreviewPaneProps {
  stickerConfig: StickerConfig;
  layerProperties: Record<string, Record<string, unknown>>;
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCount: number;
  showMinimap: boolean;
  showControls: boolean;
}

export default function PreviewPane({
  stickerConfig,
  layerProperties,
  onPrevious,
  onNext,
  currentIndex,
  totalCount,
  showMinimap,
  showControls,
}: PreviewPaneProps) {
  const renderSticker = () => {
    if (!stickerConfig) return null;

    if (stickerConfig.id === "lightning-sticker") {
      return (
        <LightningPreview 
          config={stickerConfig} 
          properties={layerProperties}
          showMinimap={showMinimap}
          showControls={showControls}
        />
      );
    }

    if (stickerConfig.id === "lawted-sticker") {
      return (
        <LawtedPreview 
          config={stickerConfig} 
          properties={layerProperties}
          showMinimap={showMinimap}
          showControls={showControls}
        />
      );
    }

    return null;
  };

  return (
    <div className="flex-1 bg-neutral-950 flex flex-col">
      {/* Header with Navigation */}
      <div className="border-b border-neutral-800 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onPrevious}
              className="w-8 h-8 bg-neutral-800 hover:bg-neutral-700 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentIndex === 0}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
                <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="text-center">
              <h2 className="text-xl font-bold text-white">
                {stickerConfig?.name}
              </h2>
              <div className="text-xs text-neutral-500 mt-1">
                {currentIndex + 1} of {totalCount}
              </div>
            </div>

            <button
              onClick={onNext}
              className="w-8 h-8 bg-neutral-800 hover:bg-neutral-700 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentIndex === totalCount - 1}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
                <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="text-sm text-neutral-500">Live Preview</div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div
          className="relative"
          style={{
            width: "600px",
            height: "450px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderSticker()}
        </div>
      </div>
    </div>
  );
}

interface PreviewProps {
  config: StickerConfig;
  properties: Record<string, Record<string, unknown>>;
  showMinimap: boolean;
  showControls: boolean;
}

function LightningPreview({ config, properties, showMinimap, showControls }: PreviewProps) {
  const getLayerProp = (
    layerId: string,
    propName: string,
    defaultValue: unknown
  ) => {
    return (
      properties[layerId]?.[propName] ??
      config.layers.find((l) => l.id === layerId)?.props[propName] ??
      defaultValue
    );
  };

  const isLayerVisible = (layerId: string) => {
    return config.layers.find((l) => l.id === layerId)?.visible ?? true;
  };

  return (
    <HolographicSticker.Root>
      {showControls && <HolographicSticker.Controls />}
      {showMinimap && <HolographicSticker.Minimap />}
      <HolographicSticker.Scene>
        <HolographicSticker.Card>
          {/* Background Image Layer */}
          {isLayerVisible("background-image") && (
            <HolographicSticker.ImageLayer
              src={getLayerProp("background-image", "src", "/light.png") as string}
              alt={getLayerProp("background-image", "alt", "Lightning") as string}
              objectFit={getLayerProp(
                "background-image",
                "objectFit",
                "contain"
              ) as any}
            />
          )}

          {/* Pattern Layer */}
          {isLayerVisible("pattern") && (
            <HolographicSticker.Pattern
              maskUrl={getLayerProp("pattern", "maskUrl", "/light.png") as string}
              maskSize={getLayerProp("pattern", "maskSize", "contain") as string}
              textureUrl={getLayerProp(
                "pattern",
                "texture",
                "https://assets.codepen.io/605876/figma-texture.png"
              ) as string}
              textureSize={getLayerProp("pattern", "textureSize", "6cqi") as string}
              mixBlendMode={getLayerProp(
                "pattern",
                "mixBlendMode",
                "hard-light"
              ) as any}
              opacity={getLayerProp("pattern", "opacity", 0.7) as number}
            >
              <HolographicSticker.Refraction
                intensity={getLayerProp("pattern", "intensity", 2) as number}
              />
            </HolographicSticker.Pattern>
          )}

          {/* Overlay Image Layer */}
          {isLayerVisible("overlay-image") && (
            <HolographicSticker.Content>
              <HolographicSticker.ImageLayer
                src={getLayerProp("overlay-image", "src", "/light.png") as string}
                alt={getLayerProp("overlay-image", "alt", "") as string}
                opacity={getLayerProp("overlay-image", "opacity", 0.2) as number}
                objectFit={getLayerProp(
                  "overlay-image",
                  "objectFit",
                  "contain"
                ) as any}
              />
            </HolographicSticker.Content>
          )}
        </HolographicSticker.Card>
      </HolographicSticker.Scene>
    </HolographicSticker.Root>
  );
}

function LawtedPreview({ config, properties, showMinimap, showControls }: PreviewProps) {
  const getLayerProp = (
    layerId: string,
    propName: string,
    defaultValue: unknown
  ) => {
    return (
      properties[layerId]?.[propName] ??
      config.layers.find((l) => l.id === layerId)?.props[propName] ??
      defaultValue
    );
  };

  const isLayerVisible = (layerId: string) => {
    return config.layers.find((l) => l.id === layerId)?.visible ?? true;
  };

  return (
    <HolographicSticker.Root>
      {showControls && <HolographicSticker.Controls />}
      {showMinimap && <HolographicSticker.Minimap />}
      <HolographicSticker.Scene>
        <HolographicSticker.Card>
          {/* Base Image Layer */}
          {isLayerVisible("base-image") && (
            <HolographicSticker.ImageLayer
              src={getLayerProp("base-image", "src", "/Smoke.jpeg") as string}
              alt={getLayerProp("base-image", "alt", "Smoke Background") as string}
              parallax={getLayerProp("base-image", "parallax", true) as boolean}
            />
          )}

          {/* Pattern Layer */}
          {isLayerVisible("pattern") && (
            <HolographicSticker.Pattern
              textureUrl={getLayerProp(
                "pattern",
                "texture",
                "https://assets.codepen.io/605876/figma-texture.png"
              ) as string}
              textureSize={getLayerProp("pattern", "textureSize", "4cqi") as string}
              opacity={getLayerProp("pattern", "opacity", 0.4) as number}
              mixBlendMode={getLayerProp("pattern", "mixBlendMode", "multiply") as any}
            >
              <HolographicSticker.Refraction
                intensity={getLayerProp("pattern", "intensity", 1) as number}
              />
            </HolographicSticker.Pattern>
          )}

          {/* Watermark Layer */}
          {isLayerVisible("watermark") && (
            <HolographicSticker.Watermark
              imageUrl={getLayerProp("watermark", "imageUrl", "/Stanford.svg") as string}
              opacity={getLayerProp("watermark", "opacity", 1) as number}
            >
              <HolographicSticker.Refraction
                intensity={getLayerProp("watermark", "intensity", 1) as number}
              />
            </HolographicSticker.Watermark>
          )}

          {/* Content Layer */}
          {isLayerVisible("content") && (
            <HolographicSticker.Content>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  borderRadius: "8cqi",
                  opacity: 1,
                  filter: "url(#hologram-lighting)",
                  clipPath: "inset(0 0 0 0 round 8cqi)",
                }}
              >
                {/* Emboss border */}
                <div
                  style={{
                    position: "absolute",
                    inset: "-1px",
                    border: "calc((8cqi * 0.5) + 1px) solid hsl(0 0% 25%)",
                    borderRadius: "8cqi",
                    zIndex: 99,
                  }}
                />

                {/* Copyright text */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    height: "calc(8cqi * 0.5)",
                    display: "flex",
                    alignItems: "center",
                    transform: "translateX(-50%)",
                    color: "#fff",
                    fontSize: "1.5cqi",
                    opacity: 0.8,
                    zIndex: 100,
                  }}
                >
                  {getLayerProp("content", "copyright", "Research © 2025") as string}
                </div>

                {/* Title and Subtitle */}
                <div
                  style={{
                    position: "absolute",
                    top: "8cqi",
                    right: "8cqi",
                    textAlign: "right",
                    letterSpacing: "-0.05em",
                    fontWeight: 1000,
                    lineHeight: 1,
                    zIndex: 100,
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      filter: "url(#hologram-sticker)",
                      fontSize: "10cqi",
                      display: "block",
                    }}
                  >
                    {getLayerProp("content", "title", "Lawted Wu") as string}
                  </span>
                  <span
                    style={{
                      filter: "url(#hologram-sticker)",
                      fontSize: "5cqi",
                      display: "block",
                    }}
                  >
                    {getLayerProp("content", "subtitle", "Research Assistant") as string}
                  </span>
                </div>

                {/* Stanford Logo */}
                <div
                  style={{
                    position: "absolute",
                    width: "calc(8cqi * 2.75)",
                    bottom: "calc(8cqi * 0.75)",
                    left: "calc(8cqi * 0.65)",
                    zIndex: 100,
                  }}
                >
                  <img
                    src={getLayerProp(
                      "content",
                      "stanfordLogo",
                      "/Stanford_Cardinal_logo.svg"
                    ) as string}
                    alt="Stanford University"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>

                {/* Lawted signature */}
                <div
                  style={{
                    position: "absolute",
                    zIndex: 100,
                    width: "38cqi",
                    bottom: "calc(8cqi * 1.1)",
                    right: "calc(8cqi * 0.6)",
                    rotate: "15deg",
                  }}
                >
                  <img
                    src={getLayerProp("content", "signature", "/lawted.svg") as string}
                    alt="Lawted Wu Signature"
                    style={{
                      width: "100%",
                      height: "auto",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </div>

                {/* Portrait image */}
                <HolographicSticker.ImageLayer
                  src={getLayerProp(
                    "content",
                    "portraitImage",
                    "/Smoke-transparent.png"
                  ) as string}
                  alt=""
                  parallax={true}
                />
              </div>
            </HolographicSticker.Content>
          )}

          {/* Spotlight Layer */}
          {isLayerVisible("spotlight") && (
            <HolographicSticker.Spotlight
              intensity={getLayerProp("spotlight", "intensity", 1) as number}
            />
          )}

          {/* Glare Layer */}
          {isLayerVisible("glare") && <HolographicSticker.Glare />}
        </HolographicSticker.Card>
      </HolographicSticker.Scene>

      {/* SVG Filters */}
      <svg className="sr-only" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="hologram-lighting">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feSpecularLighting
              result="lighting"
              in="blur"
              surfaceScale="8"
              specularConstant="12"
              specularExponent="120"
              lightingColor="hsl(0 0% 6%)"
            >
              <fePointLight x="50" y="50" z="300" />
            </feSpecularLighting>
            <feComposite
              in="lighting"
              in2="SourceAlpha"
              operator="in"
              result="composite"
            />
            <feComposite
              in="SourceGraphic"
              in2="composite"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="1"
              k4="0"
              result="litPaint"
            />
          </filter>
          <filter id="hologram-sticker">
            <feMorphology
              in="SourceAlpha"
              result="dilate"
              operator="dilate"
              radius="2"
            />
            <feFlood floodColor="hsl(0 0% 100%)" result="outlinecolor" />
            <feComposite
              in="outlinecolor"
              in2="dilate"
              operator="in"
              result="outlineflat"
            />
            <feMerge result="merged">
              <feMergeNode in="outlineflat" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </HolographicSticker.Root>
  );
}
