"use client";
import React from "react";
import HologramSticker from "hologram-sticker";

const NpmLightSticker = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        fontFamily:
          "'SF Pro Text', 'SF Pro Icons', 'AOS Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif, system-ui",
      }}
    >
      <HologramSticker.Root theme="dark">
        <HologramSticker.Controls />
        <HologramSticker.Minimap />
        <HologramSticker.Scene>
          <HologramSticker.Card className="border border-white">
            {/* Background image layer */}
            <HologramSticker.ImageLayer
              src="/light.png"
              alt="Lightning"
              objectFit="contain"
            />

            {/* Pattern holographic effect */}
            <HologramSticker.Pattern
              maskUrl="/light.png"
              maskSize="contain"
              textureUrl="https://assets.codepen.io/605876/figma-texture.png"
              textureSize="6cqi"
              mixBlendMode="hard-light"
              opacity={0.7}
            >
              <HologramSticker.Refraction intensity={2} />
            </HologramSticker.Pattern>

            <HologramSticker.Content>
              {/* Overlay image */}
              <HologramSticker.ImageLayer
                src="/light.png"
                alt=""
                opacity={0.2}
                objectFit="contain"
              />
            </HologramSticker.Content>
          </HologramSticker.Card>
        </HologramSticker.Scene>
      </HologramSticker.Root>
    </div>
  );
};

export default NpmLightSticker;
