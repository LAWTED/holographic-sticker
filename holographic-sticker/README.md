# 🌟 Holographic Sticker

A React component library for creating stunning holographic sticker effects with 3D transformations and interactive animations.

## ✨ Features

- 🎯 **Easy to Use**: Simple compound component API
- 🎨 **Customizable**: Flexible styling and configuration options  
- 📱 **Responsive**: Works great on mobile and desktop
- ⚡ **Performance**: Optimized animations and GPU acceleration
- 🔧 **TypeScript**: Full TypeScript support with type definitions
- 🎭 **Accessible**: Built with accessibility in mind

## 🚀 Installation

```bash
npm install holographic-sticker
# or
yarn add holographic-sticker
# or
pnpm add holographic-sticker
```

## 📖 Quick Start

```tsx
import HolographicSticker from 'holographic-sticker';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <HolographicSticker.Root>
        <HolographicSticker.Controls />
        <HolographicSticker.Minimap />
        <HolographicSticker.Scene>
          <HolographicSticker.Card className="border border-white rounded-2xl">
            <HolographicSticker.ImageLayer
              src="/lightning.png"
              alt="Lightning"
              objectFit="contain"
            />
            <HolographicSticker.Pattern
              maskUrl="/lightning.png"
              maskSize="contain"
              textureUrl="https://assets.codepen.io/605876/figma-texture.png"
              mixBlendMode="hard-light"
              opacity={0.7}
            >
              <HolographicSticker.Refraction intensity={2} />
            </HolographicSticker.Pattern>
            <HolographicSticker.Content>
              <HolographicSticker.ImageLayer
                src="/lightning.png"
                alt=""
                opacity={0.2}
                objectFit="contain"
              />
            </HolographicSticker.Content>
          </HolographicSticker.Card>
        </HolographicSticker.Scene>
      </HolographicSticker.Root>
    </div>
  );
}
```

## 🏗️ Component Architecture

The library follows a structured component hierarchy:

1. **Root**: Mouse tracking context and global controls
2. **Scene**: 3D scene container
3. **Card**: Individual sticker container with layers
4. **ImageLayer**: Image display with various blend modes
5. **Pattern**: Holographic effects container
6. **Content**: Overlay content container

```tsx
<HolographicSticker.Root>              {/* Mouse tracking context */}
  <HolographicSticker.Controls />      {/* Interactive controls */}
  <HolographicSticker.Minimap />       {/* Navigation minimap */}
  <HolographicSticker.Scene>           {/* 3D scene container */}
    <HolographicSticker.Card>          {/* Individual sticker */}
      <HolographicSticker.ImageLayer /> {/* Base image layer */}
      <HolographicSticker.Pattern>     {/* Holographic effects */}
        <HolographicSticker.Refraction /> {/* Light refraction */}
      </HolographicSticker.Pattern>
      <HolographicSticker.Content>     {/* Overlay content */}
        <HolographicSticker.ImageLayer /> {/* Overlay images */}
      </HolographicSticker.Content>
    </HolographicSticker.Card>
  </HolographicSticker.Scene>
</HolographicSticker.Root>
```

## 📚 API Reference

### HolographicSticker.Root

The main container that provides mouse tracking context.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components |
| `className` | `string` | `''` | Additional CSS classes |

### HolographicSticker.Scene

The 3D scene container that manages the holographic environment.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components (Cards) |
| `className` | `string` | `''` | Additional CSS classes |

### HolographicSticker.Card

The individual sticker container that handles 3D transformations.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components |
| `className` | `string` | `''` | Additional CSS classes |

### HolographicSticker.ImageLayer

Displays images with various blend modes and effects.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image source URL |
| `alt` | `string` | `''` | Image alt text |
| `className` | `string` | `''` | Additional CSS classes |
| `opacity` | `number` | `1` | Layer opacity (0-1) |
| `objectFit` | `string` | `'cover'` | CSS object-fit property |

### HolographicSticker.Pattern

The holographic pattern layer container with mask and texture support.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components (usually Refraction) |
| `className` | `string` | `''` | Additional CSS classes |
| `maskUrl` | `string` | - | Mask image URL |
| `maskSize` | `string` | `'contain'` | Mask size property |
| `textureUrl` | `string` | Built-in texture | Custom texture URL |
| `textureSize` | `string` | - | Texture size |
| `mixBlendMode` | `string` | - | CSS mix-blend-mode |
| `opacity` | `number` | `1` | Pattern opacity (0-1) |

### HolographicSticker.Refraction

The rainbow refraction effect component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `intensity` | `number` | `1` | Refraction intensity |

### HolographicSticker.Content

Container for overlay content and additional image layers.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components |
| `className` | `string` | `''` | Additional CSS classes |

### HolographicSticker.Controls

Interactive controls for customizing the holographic effects.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |

### HolographicSticker.Minimap

Navigation minimap for the holographic scene.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |

## 🎨 Examples

### Basic Usage

```tsx
import HolographicSticker from 'holographic-sticker';

function BasicExample() {
  return (
    <HolographicSticker.Root>
      <HolographicSticker.Scene>
        <HolographicSticker.Card className="border border-white rounded-2xl">
          <HolographicSticker.ImageLayer 
            src="/image.jpg" 
            alt="Example"
            objectFit="contain"
          />
          <HolographicSticker.Pattern
            maskUrl="/image.jpg"
            maskSize="contain"
          >
            <HolographicSticker.Refraction />
          </HolographicSticker.Pattern>
          <HolographicSticker.Content>
            <HolographicSticker.ImageLayer 
              src="/image.jpg" 
              alt="" 
              opacity={0.2}
              objectFit="contain"
            />
          </HolographicSticker.Content>
        </HolographicSticker.Card>
      </HolographicSticker.Scene>
    </HolographicSticker.Root>
  );
}
```

### With Controls and Minimap

```tsx
function FullFeaturedExample() {
  return (
    <HolographicSticker.Root>
      <HolographicSticker.Controls />
      <HolographicSticker.Minimap />
      <HolographicSticker.Scene>
        <HolographicSticker.Card className="border-2 border-white/20 rounded-3xl">
          <HolographicSticker.ImageLayer 
            src="/fire.png" 
            alt="Fire"
            objectFit="contain"
            className="brightness-110"
          />
          <HolographicSticker.Pattern 
            maskUrl="/fire.png"
            maskSize="contain"
            textureUrl="https://assets.codepen.io/605876/figma-texture.png"
            mixBlendMode="hard-light"
            opacity={0.6}
          >
            <HolographicSticker.Refraction intensity={2} />
          </HolographicSticker.Pattern>
          <HolographicSticker.Content>
            <HolographicSticker.ImageLayer 
              src="/fire.png"
              alt=""
              opacity={0.3}
              objectFit="contain"
            />
          </HolographicSticker.Content>
        </HolographicSticker.Card>
      </HolographicSticker.Scene>
    </HolographicSticker.Root>
  );
}
```

### Multiple Cards Gallery

```tsx
function Gallery() {
  const cards = [
    { src: '/fire.png', alt: 'Fire' },
    { src: '/water.png', alt: 'Water' },
    { src: '/earth.png', alt: 'Earth' },
  ];

  return (
    <HolographicSticker.Root>
      <HolographicSticker.Controls />
      <HolographicSticker.Scene>
        <div className="flex gap-8 justify-center">
          {cards.map((card, index) => (
            <HolographicSticker.Card key={index} className="border border-white/20 rounded-2xl">
              <HolographicSticker.ImageLayer {...card} objectFit="contain" />
              <HolographicSticker.Pattern
                maskUrl={card.src}
                maskSize="contain"
              >
                <HolographicSticker.Refraction />
              </HolographicSticker.Pattern>
              <HolographicSticker.Content>
                <HolographicSticker.ImageLayer 
                  src={card.src} 
                  alt="" 
                  opacity={0.2}
                  objectFit="contain"
                />
              </HolographicSticker.Content>
            </HolographicSticker.Card>
          ))}
        </div>
      </HolographicSticker.Scene>
    </HolographicSticker.Root>
  );
}
```

## 🎯 CSS Custom Properties

You can customize the appearance using CSS custom properties:

```css
.holographic-sticker-card {
  --hologram-rotate-x: 30deg;  /* X-axis rotation intensity */
  --hologram-rotate-y: -25deg; /* Y-axis rotation intensity */
}

.holographic-sticker-pattern {
  --pattern-intensity: 0.6; /* Pattern opacity */
}

.holographic-sticker-overlay {
  --overlay-opacity: 0.3; /* Overlay opacity */
}
```

## 🌍 Browser Support

- Chrome 60+
- Firefox 55+ 
- Safari 12+
- Edge 79+

## 📄 License

MIT © [Lawted Wu](https://github.com/LAWTED)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

Found a bug? Please [create an issue](https://github.com/LAWTED/holographic-sticker/issues).