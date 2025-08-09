"use client";
import HologramSticker from "hologram-sticker";

const LightningSticker = () => {
  return (
      <HologramSticker.Root>
      <HologramSticker.Controls />
      <HologramSticker.Minimap />
      <HologramSticker.Scene>
        <HologramSticker.Card className="border border-white rounded-2xl">
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
  );
};

export default LightningSticker;
