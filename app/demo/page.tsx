"use client";
import React from "react";
import Image from "next/image";

// 使用 npm 包 - 就像真正的用户一样
import HologramSticker from "hologram-sticker";

export default function HologramStickerDemo() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-8">
      <div className="text-4xl text-white">Hello</div>
      <div className="flex gap-8">
        <div className="bg-amber-200 p-4 rounded-lg">
          <HologramSticker.Root>
            <HologramSticker.Card className="border border-white">
              <HologramSticker.Background>
                <Image src="/light.png" alt="Lightning" fill />
              </HologramSticker.Background>
              <HologramSticker.Pattern imageUrl="/light.png">
                <HologramSticker.Refraction />
              </HologramSticker.Pattern>
              <HologramSticker.Overlay>
                <Image src="/light.png" alt="Lightning" fill />
              </HologramSticker.Overlay>
            </HologramSticker.Card>
          </HologramSticker.Root>
        </div>
        <HologramSticker.Root>
          <HologramSticker.Card className="border border-white">
            <HologramSticker.Background>
              <Image src="/tom&jerry.png" alt="cartoon" fill />
            </HologramSticker.Background>
            <HologramSticker.Pattern imageUrl="/tom&jerry.png">
              <HologramSticker.Refraction />
            </HologramSticker.Pattern>
            <HologramSticker.Overlay>
              <Image src="/tom&jerry.png" alt="cartoon" fill />
            </HologramSticker.Overlay>
          </HologramSticker.Card>
        </HologramSticker.Root>
      </div>
    </div>
  );
}
