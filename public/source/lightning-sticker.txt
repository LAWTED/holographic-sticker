"use client";
import HolographicSticker from "holographic-sticker";

const LightningSticker = () => {
  return (
      <HolographicSticker.Root>
      <HolographicSticker.Controls />
      <HolographicSticker.Minimap />
      <HolographicSticker.Scene>
        <HolographicSticker.Card className="border border-white rounded-2xl">
          {/* Background image layer */}
          <HolographicSticker.ImageLayer
            src="/light.png"
            alt="Lightning"
            objectFit="contain"
          />

          {/* Pattern holographic effect */}
          <HolographicSticker.Pattern
            maskUrl="/light.png"
            maskSize="contain"
            textureUrl="https://assets.codepen.io/605876/figma-texture.png"
            textureSize="6cqi"
            mixBlendMode="hard-light"
            opacity={0.7}
          >
            <HolographicSticker.Refraction intensity={2} />
          </HolographicSticker.Pattern>

          <HolographicSticker.Content>
            {/* Overlay image */}
            <HolographicSticker.ImageLayer
              src="/light.png"
              alt=""
              opacity={0.2}
              objectFit="contain"
            />
          </HolographicSticker.Content>
        </HolographicSticker.Card>
      </HolographicSticker.Scene>
    </HolographicSticker.Root>
  );
};

export default LightningSticker;
