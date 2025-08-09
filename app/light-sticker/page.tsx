"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import "./light-sticker.css";

const LightStickerPage = () => {
  const stickerRef = useRef<HTMLElement>(null);
  const [stickerPointer, setStickerPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!stickerRef.current) return;
      
      const bounds = stickerRef.current.getBoundingClientRect();
      const posX = e.clientX - bounds.x;
      const posY = e.clientY - bounds.y;
      const ratioX = posX / bounds.width - 0.5;
      const ratioY = posY / bounds.height - 0.5;
      const pointerX = Math.max(-1, Math.min(1, ratioX * 2));
      const pointerY = Math.max(-1, Math.min(1, ratioY * 2));

      setStickerPointer({ x: pointerX, y: pointerY });
    };

    document.addEventListener("pointermove", handlePointerMove);
    return () => document.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const dynamicStyles = `
    .sticker-card {
      --sticker-pointer-x: ${stickerPointer.x};
      --sticker-pointer-y: ${stickerPointer.y};
    }

    .sticker-pattern {
      filter: saturate(0.8) contrast(1) brightness(1);
      mask:
        url(/light.png) 50% 50% / contain no-repeat,
        url(https://assets.codepen.io/605876/figma-texture.png) 50% 50% / 6cqi 6cqi;
      mask-composite: intersect;
      opacity: 0.4;
      mix-blend-mode: hard-light;
    }
  `;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <style>{dynamicStyles}</style>
      
      <div className="scene">
        <article ref={stickerRef} className="sticker-card border border-white">
          <div className="sticker-content">
            {/* Image background */}
            <div className="sticker-background">
              <Image src="/light.png" alt="Lightning" fill className="sticker-image" />
            </div>

            {/* Pattern holographic effect */}
            <div className="sticker-pattern">
              <div className="refraction"></div>
              <div className="refraction"></div>
            </div>

            {/* Overlay image layer - 20% opacity */}
            <div className="sticker-overlay">
              <Image src="/light.png" alt="Lightning" fill className="sticker-overlay-image" />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default LightStickerPage;