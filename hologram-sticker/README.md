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
import { HologramSticker } from 'hologram-sticker';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <HologramSticker.Root>
        <HologramSticker.Card>
          <HologramSticker.Background 
            src="/lightning.png" 
            alt="Lightning" 
          />
          <HologramSticker.Pattern>
            <HologramSticker.Refraction />
          </HologramSticker.Pattern>
          <HologramSticker.Overlay 
            src="/lightning.png" 
            alt="Lightning" 
          />
        </HologramSticker.Card>
      </HologramSticker.Root>
    </div>
  );
}
```

## 🏗️ Component Architecture

The library follows a three-layer structure:

1. **Background Layer**: Base image display
2. **Pattern Layer**: Holographic effects with refraction
3. **Overlay Layer**: Top image with transparency

```tsx
<HologramSticker.Root>          {/* Mouse tracking context */}
  <HologramSticker.Card>        {/* 3D transform container */}
    <HologramSticker.Background /> {/* Layer 1: Background image */}
    <HologramSticker.Pattern>     {/* Layer 2: Holographic pattern */}
      <HologramSticker.Refraction /> {/* Rainbow light effects */}
    </HologramSticker.Pattern>
    <HologramSticker.Overlay />   {/* Layer 3: Overlay image */}
  </HologramSticker.Card>
</HologramSticker.Root>
```

## 📚 API Reference

### HologramSticker.Root

The main container that provides mouse tracking context.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | - | Inline styles |

### HologramSticker.Card

The card container that handles 3D transformations.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components |
| `className` | `string` | `''` | Additional CSS classes |
| `width` | `number` | `208` | Card width in pixels |
| `aspectRatio` | `number` | `3/4` | Card aspect ratio |

### HologramSticker.Background

The background image layer.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image source URL |
| `alt` | `string` | `''` | Image alt text |
| `className` | `string` | `''` | Additional CSS classes |

### HologramSticker.Pattern

The holographic pattern layer container.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components (usually Refraction) |
| `className` | `string` | `''` | Additional CSS classes |
| `intensity` | `number` | `0.4` | Pattern intensity (0-1) |
| `textureUrl` | `string` | Built-in texture | Custom texture URL |

### HologramSticker.Refraction

The rainbow refraction effect component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `colors` | `string[]` | Rainbow colors | Custom refraction colors |
| `count` | `1 \| 2` | `2` | Number of refraction points |

### HologramSticker.Overlay

The top overlay image layer.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image source URL |
| `alt` | `string` | `''` | Image alt text |
| `className` | `string` | `''` | Additional CSS classes |
| `opacity` | `number` | `0.2` | Overlay opacity (0-1) |

## 🎨 Examples

### Basic Usage

```tsx
import { HologramSticker } from 'hologram-sticker';

function BasicExample() {
  return (
    <HologramSticker.Root>
      <HologramSticker.Card>
        <HologramSticker.Background src="/image.jpg" alt="Example" />
        <HologramSticker.Pattern>
          <HologramSticker.Refraction />
        </HologramSticker.Pattern>
        <HologramSticker.Overlay src="/image.jpg" alt="Example" />
      </HologramSticker.Card>
    </HologramSticker.Root>
  );
}
```

### Custom Styling

```tsx
function StyledExample() {
  return (
    <HologramSticker.Root>
      <HologramSticker.Card 
        width={256}
        className="border-2 border-white/20 rounded-3xl"
      >
        <HologramSticker.Background 
          src="/fire.png" 
          className="brightness-110"
        />
        <HologramSticker.Pattern 
          intensity={0.6}
          className="mix-blend-hard-light"
        >
          <HologramSticker.Refraction 
            colors={['#ff4444', '#ff8844', '#ffaa44']}
          />
        </HologramSticker.Pattern>
        <HologramSticker.Overlay 
          src="/fire.png"
          opacity={0.3}
        />
      </HologramSticker.Card>
    </HologramSticker.Root>
  );
}
```

### Multiple Cards

```tsx
function Gallery() {
  const cards = [
    { src: '/fire.png', alt: 'Fire' },
    { src: '/water.png', alt: 'Water' },
    { src: '/earth.png', alt: 'Earth' },
  ];

  return (
    <div className="flex gap-8 justify-center">
      {cards.map((card, index) => (
        <HologramSticker.Root key={index}>
          <HologramSticker.Card>
            <HologramSticker.Background {...card} />
            <HologramSticker.Pattern>
              <HologramSticker.Refraction />
            </HologramSticker.Pattern>
            <HologramSticker.Overlay {...card} />
          </HologramSticker.Card>
        </HologramSticker.Root>
      ))}
    </div>
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

MIT © [Lawted Wu](https://github.com/lawtedwu)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

Found a bug? Please [create an issue](https://github.com/lawtedwu/hologram-sticker/issues).