# Holographic Sticker

A React component library for creating stunning holographic sticker effects. Interactive, customizable, and performant.

## Installation

```bash
npm install holographic-sticker
```

## Features

- 🌈 **Holographic Effects** - Create stunning holographic sticker animations
- 🎮 **Interactive Controls** - Built-in controls for customizing effects
- 🗺️ **Minimap** - Visual minimap for navigation
- 🎨 **Customizable Patterns** - Support for custom textures and masks
- ⚡ **Performance Optimized** - Smooth animations with efficient rendering
- 📱 **Responsive** - Works across all device sizes

## Quick Start

```tsx
import HolographicSticker from "holographic-sticker";

export default function MySticker() {
  return (
    <HolographicSticker.Root>
      <HolographicSticker.Controls />
      <HolographicSticker.Minimap />
      <HolographicSticker.Scene>
        <HolographicSticker.Card className="border border-white rounded-2xl">
          <HolographicSticker.ImageLayer
            src="/your-image.png"
            alt="Sticker"
            objectFit="contain"
          />
          <HolographicSticker.Pattern
            maskUrl="/your-mask.png"
            maskSize="contain"
            textureUrl="https://assets.codepen.io/605876/figma-texture.png"
            textureSize="6cqi"
            mixBlendMode="hard-light"
            opacity={0.7}
          >
            <HolographicSticker.Refraction intensity={2} />
          </HolographicSticker.Pattern>
        </HolographicSticker.Card>
      </HolographicSticker.Scene>
    </HolographicSticker.Root>
  );
}
```

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the examples and documentation.

## Examples

The project includes several example implementations:

- **Lightning Sticker** - Lightning holographic effect with mask patterns and refraction
- **OG Sticker** - Inspired by @jh3yy's original holographic card design
- **Lawted Sticker** - Custom sticker implementation

## Credits

This project is inspired by [@jh3yy](https://x.com/jh3yy)'s incredible [holographic card design](https://codepen.io/jh3y/pen/EaVNNxa). All inspiration and foundation code comes from this original work.

## Built With

- React 19
- Next.js 15
- TypeScript
- Tailwind CSS
- CSS Animations

## Links

- [GitHub Repository](https://github.com/LAWTED/holographic-sticker)
- [npm Package](https://www.npmjs.com/package/holographic-sticker)
