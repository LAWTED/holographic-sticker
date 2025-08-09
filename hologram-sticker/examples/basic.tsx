import React from 'react';
import { HologramSticker } from 'hologram-sticker';

// Basic Lightning Sticker Example
export function LightningExample() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <HologramSticker.Root>
        <HologramSticker.Card>
          <HologramSticker.Background 
            src="/light.png" 
            alt="Lightning" 
          />
          <HologramSticker.Pattern>
            <HologramSticker.Refraction />
          </HologramSticker.Pattern>
          <HologramSticker.Overlay 
            src="/light.png" 
            alt="Lightning" 
          />
        </HologramSticker.Card>
      </HologramSticker.Root>
    </div>
  );
}

// Custom Colors Example  
export function FireExample() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <HologramSticker.Root>
        <HologramSticker.Card width={256}>
          <HologramSticker.Background 
            src="/fire.png" 
            alt="Fire"
          />
          <HologramSticker.Pattern intensity={0.6}>
            <HologramSticker.Refraction 
              colors={['#ff4444', '#ff8844', '#ffaa44']}
            />
          </HologramSticker.Pattern>
          <HologramSticker.Overlay 
            src="/fire.png" 
            alt="Fire"
            opacity={0.3}
          />
        </HologramSticker.Card>
      </HologramSticker.Root>
    </div>
  );
}

// Multiple Cards Gallery
export function GalleryExample() {
  const cards = [
    { src: '/fire.png', alt: 'Fire', colors: ['#ff4444', '#ff8844', '#ffaa44'] },
    { src: '/water.png', alt: 'Water', colors: ['#4444ff', '#44aaff', '#88ddff'] },
    { src: '/earth.png', alt: 'Earth', colors: ['#44aa44', '#88cc44', '#aaff44'] },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-8">
      <div className="flex gap-8 flex-wrap justify-center">
        {cards.map((card, index) => (
          <HologramSticker.Root key={index}>
            <HologramSticker.Card className="border border-white/20 rounded-2xl">
              <HologramSticker.Background 
                src={card.src} 
                alt={card.alt}
              />
              <HologramSticker.Pattern>
                <HologramSticker.Refraction colors={card.colors} />
              </HologramSticker.Pattern>
              <HologramSticker.Overlay 
                src={card.src} 
                alt={card.alt}
              />
            </HologramSticker.Card>
          </HologramSticker.Root>
        ))}
      </div>
    </div>
  );
}