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
          <HologramSticker.Card
            width={208} // 260 * 0.8
            aspectRatio={0.75} // 3/4
            className="border border-white"
          >
            {/* Background image layer */}
            <HologramSticker.ImageLayer
              src="/light.png"
              alt="Lightning"
              objectFit="contain"
              scale={1}
              style={{
                filter:
                  "brightness(1.0) drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))",
              }}
            />

            {/* Pattern holographic effect */}
            <HologramSticker.Pattern
              maskUrl="/light.png"
              maskSize="contain"
              textureUrl="https://assets.codepen.io/605876/figma-texture.png"
              textureSize="6cqi"
              opacity={0.4}
              mixBlendMode="hard-light"
            >
              <HologramSticker.Refraction intensity={1} />
            </HologramSticker.Pattern>

            <HologramSticker.Content>
              {/* Overlay image */}
              <HologramSticker.ImageLayer
                src="/light.png"
                alt=""
                opacity={0.2}
                objectFit="contain"
                scale={1}
                style={{
                  filter:
                    "brightness(1.2) drop-shadow(0 0 10px rgba(255, 255, 255, 0.1))",
                }}
              />
            </HologramSticker.Content>
          </HologramSticker.Card>
        </HologramSticker.Scene>
      </HologramSticker.Root>
    </div>
  );
};

export default NpmLightSticker;
