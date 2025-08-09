# 🌟 Hologram Sticker

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
npm install hologram-sticker
# or
yarn add hologram-sticker
# or
pnpm add hologram-sticker
```

## 📖 Quick Start

```tsx
import HologramSticker from 'hologram-sticker';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <HologramSticker.Root>
        <HologramSticker.Controls />
        <HologramSticker.Minimap />
        <HologramSticker.Scene>
          <HologramSticker.Card className="border border-white rounded-2xl">
            <HologramSticker.ImageLayer
              src="/lightning.png"
              alt="Lightning"
              objectFit="contain"
            />
            <HologramSticker.Pattern
              maskUrl="/lightning.png"
              maskSize="contain"
              textureUrl="https://assets.codepen.io/605876/figma-texture.png"
              mixBlendMode="hard-light"
              opacity={0.7}
            >
              <HologramSticker.Refraction intensity={2} />
            </HologramSticker.Pattern>
            <HologramSticker.Content>
              <HologramSticker.ImageLayer
                src="/lightning.png"
                alt=""
                opacity={0.2}
                objectFit="contain"
              />
            </HologramSticker.Content>
          </HologramSticker.Card>
        </HologramSticker.Scene>
      </HologramSticker.Root>
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
<HologramSticker.Root>              {/* Mouse tracking context */}
  <HologramSticker.Controls />      {/* Interactive controls */}
  <HologramSticker.Minimap />       {/* Navigation minimap */}
  <HologramSticker.Scene>           {/* 3D scene container */}
    <HologramSticker.Card>          {/* Individual sticker */}
      <HologramSticker.ImageLayer /> {/* Base image layer */}
      <HologramSticker.Pattern>     {/* Holographic effects */}
        <HologramSticker.Refraction /> {/* Light refraction */}
      </HologramSticker.Pattern>
      <HologramSticker.Content>     {/* Overlay content */}
        <HologramSticker.ImageLayer /> {/* Overlay images */}
      </HologramSticker.Content>
    </HologramSticker.Card>
  </HologramSticker.Scene>
</HologramSticker.Root>
```

## 📚 API Reference

### HologramSticker.Root

The main container that provides mouse tracking context.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components |
| `className` | `string` | `''` | Additional CSS classes |

### HologramSticker.Scene

The 3D scene container that manages the holographic environment.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components (Cards) |
| `className` | `string` | `''` | Additional CSS classes |

### HologramSticker.Card

The individual sticker container that handles 3D transformations.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components |
| `className` | `string` | `''` | Additional CSS classes |

### HologramSticker.ImageLayer

Displays images with various blend modes and effects.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image source URL |
| `alt` | `string` | `''` | Image alt text |
| `className` | `string` | `''` | Additional CSS classes |
| `opacity` | `number` | `1` | Layer opacity (0-1) |
| `objectFit` | `string` | `'cover'` | CSS object-fit property |

### HologramSticker.Pattern

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

### HologramSticker.Refraction

The rainbow refraction effect component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `intensity` | `number` | `1` | Refraction intensity |

### HologramSticker.Content

Container for overlay content and additional image layers.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components |
| `className` | `string` | `''` | Additional CSS classes |

### HologramSticker.Controls

Interactive controls for customizing the holographic effects.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |

### HologramSticker.Minimap

Navigation minimap for the holographic scene.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |

## 🎨 Examples

### Basic Usage

```tsx
import HologramSticker from 'hologram-sticker';

function BasicExample() {
  return (
    <HologramSticker.Root>
      <HologramSticker.Scene>
        <HologramSticker.Card className="border border-white rounded-2xl">
          <HologramSticker.ImageLayer 
            src="/image.jpg" 
            alt="Example"
            objectFit="contain"
          />
          <HologramSticker.Pattern
            maskUrl="/image.jpg"
            maskSize="contain"
          >
            <HologramSticker.Refraction />
          </HologramSticker.Pattern>
          <HologramSticker.Content>
            <HologramSticker.ImageLayer 
              src="/image.jpg" 
              alt="" 
              opacity={0.2}
              objectFit="contain"
            />
          </HologramSticker.Content>
        </HologramSticker.Card>
      </HologramSticker.Scene>
    </HologramSticker.Root>
  );
}
```

### With Controls and Minimap

```tsx
function FullFeaturedExample() {
  return (
    <HologramSticker.Root>
      <HologramSticker.Controls />
      <HologramSticker.Minimap />
      <HologramSticker.Scene>
        <HologramSticker.Card className="border-2 border-white/20 rounded-3xl">
          <HologramSticker.ImageLayer 
            src="/fire.png" 
            alt="Fire"
            objectFit="contain"
            className="brightness-110"
          />
          <HologramSticker.Pattern 
            maskUrl="/fire.png"
            maskSize="contain"
            textureUrl="https://assets.codepen.io/605876/figma-texture.png"
            mixBlendMode="hard-light"
            opacity={0.6}
          >
            <HologramSticker.Refraction intensity={2} />
          </HologramSticker.Pattern>
          <HologramSticker.Content>
            <HologramSticker.ImageLayer 
              src="/fire.png"
              alt=""
              opacity={0.3}
              objectFit="contain"
            />
          </HologramSticker.Content>
        </HologramSticker.Card>
      </HologramSticker.Scene>
    </HologramSticker.Root>
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
    <HologramSticker.Root>
      <HologramSticker.Controls />
      <HologramSticker.Scene>
        <div className="flex gap-8 justify-center">
          {cards.map((card, index) => (
            <HologramSticker.Card key={index} className="border border-white/20 rounded-2xl">
              <HologramSticker.ImageLayer {...card} objectFit="contain" />
              <HologramSticker.Pattern
                maskUrl={card.src}
                maskSize="contain"
              >
                <HologramSticker.Refraction />
              </HologramSticker.Pattern>
              <HologramSticker.Content>
                <HologramSticker.ImageLayer 
                  src={card.src} 
                  alt="" 
                  opacity={0.2}
                  objectFit="contain"
                />
              </HologramSticker.Content>
            </HologramSticker.Card>
          ))}
        </div>
      </HologramSticker.Scene>
    </HologramSticker.Root>
  );
}
```

## 🎯 CSS Custom Properties

You can customize the appearance using CSS custom properties:

```css
.hologram-sticker-card {
  --hologram-rotate-x: 30deg;  /* X-axis rotation intensity */
  --hologram-rotate-y: -25deg; /* Y-axis rotation intensity */
}

.hologram-sticker-pattern {
  --pattern-intensity: 0.6; /* Pattern opacity */
}

.hologram-sticker-overlay {
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

Found a bug? Please [create an issue](https://github.com/LAWTED/hologram-sticker/issues).