'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface HolographicStickerProps {
  imageSrc: string;
  imageAlt?: string;
  className?: string;
}

const HolographicSticker: React.FC<HolographicStickerProps> = ({
  imageSrc,
  imageAlt = "Holographic sticker",
  className = ""
}) => {
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
    ${stickerStyles}

    .sticker-card {
      --sticker-pointer-x: ${stickerPointer.x};
      --sticker-pointer-y: ${stickerPointer.y};
    }

    .sticker-pattern {
      filter: saturate(0.8) contrast(1) brightness(1);
      mask:
        url(${imageSrc}) 50% 50% / contain no-repeat,
        url(https://assets.codepen.io/605876/figma-texture.png) 50% 50% / 6cqi 6cqi;
      mask-composite: intersect;
      opacity: 0.4;
      mix-blend-mode: hard-light;
    }
  `;

  return (
    <>
      <style>{dynamicStyles}</style>
      <article ref={stickerRef} className={`sticker-card ${className} border border-white`}>
        <div className="sticker-content">
          {/* Image background */}
          <div className="sticker-background">
            <Image src={imageSrc} alt={imageAlt} fill className="sticker-image" />
          </div>

          {/* Pattern holographic effect */}
          <div className="sticker-pattern">
            <div className="refraction"></div>
            <div className="refraction"></div>
          </div>

          {/* Overlay image layer - 20% opacity */}
          <div className="sticker-overlay">
            <Image src={imageSrc} alt={imageAlt} fill className="sticker-overlay-image" />
          </div>
        </div>
      </article>
    </>
  );
};

const stickerStyles = `
/* New Sticker Card */
.sticker-card {
  --border: 8cqi;
  aspect-ratio: 3 / 4;
  width: calc(var(--card-width) * 0.8);
  container-type: inline-size;
  touch-action: none;
  background: transparent;
  perspective: 1600px;
  position: relative;
  display: block;
  transition: transform 0.2s;
}

.sticker-card:hover {
  transition: transform 0s;
  transform: rotateX(calc(var(--sticker-pointer-y) * var(--rotate-x)))
            rotateY(calc(var(--sticker-pointer-x) * var(--rotate-y)));
  animation: set backwards 0.2s;
}

.sticker-card:hover .sticker-image {
  opacity: 1 !important;
}

@keyframes set {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
}

.sticker-card:hover .refraction {
  opacity: 1;
}

.sticker-card:hover .sticker-pattern {
  opacity: 1 !important;
}

/* Sticker Content */
.sticker-content {
  position: absolute;
  inset: 0;
}

/* Sticker Background */
.sticker-background {
  position: absolute;
  inset: 0;
}

/* Sticker Pattern */
.sticker-pattern {
  position: absolute;
  inset: 0;
}

/* Sticker Overlay */
.sticker-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.sticker-image {
  object-fit: contain !important;
  filter: brightness(1.0) drop-shadow(0 0 15px rgba(255, 255, 255, 0.2));
}

.sticker-overlay-image {
  object-fit: contain !important;
  opacity: 0.2;
  filter: brightness(1.2) drop-shadow(0 0 10px rgba(255, 255, 255, 0.1));
}


.sticker-pattern::before {
  content: '';
  position: absolute;
  inset: 0;
  background: hsl(0 0% 80%);
}

/* Sticker Pattern Refraction - same as left card */
.sticker-pattern .refraction {
  position: absolute;
  width: 500%;
  aspect-ratio: 1 / 1;
  bottom: 0;
  left: 0;
  filter: saturate(2);
  will-change: translate, scale, filter;
  background: radial-gradient(
    circle at 0 100%,
    transparent 10%,
    hsl(5 100% 80%),
    hsl(150 100% 60%),
    hsl(220 90% 70%),
    transparent 60%
  );
  transform-origin: 0 100%;
  scale: min(1, calc(0.15 + var(--sticker-pointer-x) * 0.25));
  translate: clamp(-10%, calc(-10% + var(--sticker-pointer-x) * 10%), 10%)
            calc(max(0%, var(--sticker-pointer-y) * -1 * 10%));
  opacity: 0;
  transition: opacity 0.2s ease-out;
}

.sticker-pattern .refraction:nth-of-type(2) {
  bottom: unset;
  top: 0;
  left: unset;
  right: 0;
  scale: min(1, calc(0.15 + var(--sticker-pointer-x) * -0.65));
  translate: clamp(-10%, calc(10% - var(--sticker-pointer-x) * -10%), 10%)
            calc(min(0%, var(--sticker-pointer-y) * -10%));
  transform-origin: 100% 0;
  background: radial-gradient(
    circle at 100% 0,
    transparent 10%,
    hsl(5 100% 80%),
    hsl(150 100% 60%),
    hsl(220 90% 70%),
    transparent 60%
  );
}

.sticker-card:hover .sticker-pattern .refraction {
  opacity: 1;
}

/* Initial animations for sticker */
.sticker-image,
.sticker-pattern,
.sticker-overlay {
  opacity: 0;
}

.sticker-image {
  animation: fadeIn 0.5s 1.4s forwards;
}

.sticker-pattern {
  animation: fadeIn 0.5s 1.6s forwards;
}

.sticker-overlay {
  animation: fadeIn 0.5s 1.8s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
`;

export default HolographicSticker;