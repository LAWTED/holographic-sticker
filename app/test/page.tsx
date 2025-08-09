"use client";
import HologramSticker from "hologram-sticker";

export default function Test() {
  return (
    <HologramSticker.Root>
      <HologramSticker.Card className="border border-white rounded-2xl">
        <HologramSticker.ImageLayer
          src="/light.png"
          alt="Lightning"
          objectFit="contain"
        />
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
          <HologramSticker.ImageLayer
            src="/light.png"
            alt=""
            opacity={0.2}
            objectFit="contain"
          />
        </HologramSticker.Content>
      </HologramSticker.Card>
    </HologramSticker.Root>
  );
}
